import { PAGE_TITLE_ID } from '~/constants';

export class StarlightTOC extends HTMLElement {
	private _current: HTMLAnchorElement | null = this.querySelector('a[aria-current="true"]');
	private minH = parseInt(this.dataset.minH || '2', 10);
	private maxH = parseInt(this.dataset.maxH || '3', 10);

	/**
	 * CSS selector string that matches only headings that can appear in the table of contents.
	 * Generates a selector like `h1#_top,:where(h2,h3)[id]`.
	 */
	private tocHeadingSelector = `h1#${PAGE_TITLE_ID},:where(${[
		...Array.from({ length: 1 + this.maxH - this.minH }).map((_, index) => `h${this.minH + index}`),
	].join()})[id]`;

	protected set current(link: HTMLAnchorElement) {
		if (link === this._current) return;
		if (this._current) this._current.removeAttribute('aria-current');
		link.setAttribute('aria-current', 'true');
		this._current = link;
	}

	private onIdle = (cb: () => void) =>
		(window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1)))(cb);

	constructor() {
		super();
		this.onIdle(() => this.init());
	}

	private init = () => {
		/** All the links in the table of contents. */
		const links = [...this.querySelectorAll('a')] as HTMLAnchorElement[];

		/** Test if an element is a table-of-contents heading. */
		const isHeading = (el: Element): boolean => el.matches(this.tocHeadingSelector);

		/** Walk up the DOM to find the nearest heading. */
		const getElementHeading = (el: Element | null): Element | null => {
			if (!el) return null;
			const origin = el;
			let current: Element | null = el;
			while (current) {
				if (current.matches('.sl-markdown-content, main > *')) {
					return document.getElementById(PAGE_TITLE_ID);
				}
				if (isHeading(current)) return current;
				const childHeading = current.querySelector(this.tocHeadingSelector);
				if (childHeading) return childHeading;
				let prev: Element | null = current.previousElementSibling;
				while (prev?.lastElementChild) prev = prev.lastElementChild;
				const h = getElementHeading(prev);
				if (h) return h;
				current = prev;
			}
			return getElementHeading(origin.parentElement);
		};

		/** Handle intersections and set the current link to the heading for the current intersection. */
		const setCurrent = (entries: IntersectionObserverEntry[]) => {
			for (const { isIntersecting, target } of entries) {
				if (!isIntersecting) continue;
				const heading = getElementHeading(target);
				if (!heading) continue;
				const link = links.find((link) => link.hash === '#' + encodeURIComponent(heading.id));
				if (link) {
					this.current = link;
					break;
				}
			}
		};

		const toObserve = document.querySelectorAll(
			[
				`main :where(${this.tocHeadingSelector})`,
				`main :where(${this.tocHeadingSelector}, .sl-heading-wrapper) ~ *:not(:has(${this.tocHeadingSelector}))`,
				`main .sl-markdown-content > *:not(:has(${this.tocHeadingSelector}))`,
				`main > *:not(:has(${this.tocHeadingSelector}))`,
			].join()
		);

		let observer: IntersectionObserver | undefined;
		const observe = () => {
			if (observer) return;
			observer = new IntersectionObserver(setCurrent, { rootMargin: this.getRootMargin() });
			toObserve.forEach((h) => observer!.observe(h));
		};
		observe();

		let timeout: ReturnType<typeof setTimeout>;
		window.addEventListener('resize', () => {
			if (observer) {
				observer.disconnect();
				observer = undefined;
			}
			clearTimeout(timeout);
			timeout = setTimeout(() => this.onIdle(observe), 200);
		});
	};

	private getRootMargin(): string {
		/** Start intersections at nav height + 2rem padding. */
		const top =
			(document.querySelector('header')?.getBoundingClientRect().height || 0) +
			(this.querySelector('summary')?.getBoundingClientRect().height || 0) +
			32;
		return `-${top}px 0% ${top + 53 - document.documentElement.clientHeight}px`;
	}
}