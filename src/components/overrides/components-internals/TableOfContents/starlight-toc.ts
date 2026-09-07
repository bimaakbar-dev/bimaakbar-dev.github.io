// src/components/overrides/components-internal/TableOfContents/starlight-toc.ts

import { PAGE_TITLE_ID } from '~/constants';

export class StarlightTOC extends HTMLElement {
    private _current: HTMLAnchorElement | null = this.querySelector('a[aria-current="true"]');
    private minH = parseInt(this.dataset.minH || '2', 10);
    private maxH = parseInt(this.dataset.maxH || '3', 10);
    private mask: HTMLElement | null = this.querySelector('.toc-thumb-mask');
    private trackBg: HTMLElement | null = this.querySelector('.toc-track-bg');
    private fill: HTMLElement | null = this.querySelector('.toc-thumb-fill');

    private dotDirection: 'top' | 'bottom' = 'bottom';
    private lastY = typeof window !== 'undefined' ? window.scrollY : 0;

    private segments = new Map<HTMLAnchorElement, { top: number; bottom: number; x: number }>();

    private tocHeadingSelector = `h1#${PAGE_TITLE_ID},:where(${[
        ...Array.from({ length: 1 + this.maxH - this.minH }).map((_, index) => `h${this.minH + index}`),
    ].join()})[id]`;

    protected set current(link: HTMLAnchorElement) {
        if (link === this._current) return;
        if (this._current) this._current.removeAttribute('aria-current');
        link.setAttribute('aria-current', 'true');
        this._current = link;
        this.moveThumb(link);
    }

    private laneOffset = (depth: number) => (depth >= 1 ? 12 : 0);

    private buildTrack = () => {
        if (!this.mask) return;
        const links = [...this.querySelectorAll('a[data-depth]')] as HTMLAnchorElement[];
        if (links.length === 0) return;

        const rail = this.querySelector('.toc-rail') as HTMLElement;
        if (!rail) return;
        const railRect = rail.getBoundingClientRect();

        this.segments.clear();

        const strokeWidth = 1;
        let width = 0;
        let height = 0;
        const path: string[] = [];

        let prevX = -1;
        let prevRailBottom = 0;

        links.forEach((link, i) => {
            const depth = Number(link.dataset.depth ?? 0);
            const x = this.laneOffset(depth) + 1;
            
            const styles = getComputedStyle(link);
            const linkRect = link.getBoundingClientRect();
            
            const fontSize = parseFloat(styles.fontSize);
            const lineHeight = parseFloat(styles.lineHeight) || fontSize * 1.35;
            const linkCenter = (linkRect.top - railRect.top) + (linkRect.height / 2);
            
            // =========================================================================
            // KUNCI PERBAIKAN: Acuan tunggal yang sinkron antara Thumb, Track, dan Dot
            // =========================================================================
            const top = linkCenter - (lineHeight / 2);
            const bottom = linkCenter + (lineHeight / 2);

            this.segments.set(link, { top, bottom, x });
            width = Math.max(width, x);
            height = Math.max(height, bottom);
            
            if (i === 0) {
                path.push(`M${x} ${top}`, `L${x} ${bottom}`);
            } else {
                if (prevX !== x) {
                    // Control point kurva disesuaikan persis dengan tinggi top/bottom segmen
                    const midY = (prevRailBottom + top) / 2;
                    path.push(`C${prevX} ${midY}, ${x} ${midY}, ${x} ${top}`, `L${x} ${bottom}`);
                } else {
                    path.push(`L${x} ${bottom}`);
                }
            }
            
            prevX = x;
            prevRailBottom = bottom;
        });

        if (prevX !== -1) {
            path.push(`L${prevX} ${height}`);
        }

        const padding = Math.ceil(strokeWidth / 2) + 1;
        const viewWidth = width + padding;
        const pathString = path.join(' ');

        // Dot diposisikan tepat di batas absolut thumb tanpa ada selisih pixel
        let dotSvg = '';
        if (this._current) {
            const currentSeg = this.segments.get(this._current);
            if (currentSeg) {
                const dotY = this.dotDirection === 'top' ? currentSeg.top : currentSeg.bottom;
                dotSvg = `<circle cx="${currentSeg.x}" cy="${dotY}" r="3" fill="var(--sl-color-text-accent)" style="shape-rendering: geometricPrecision;" />`;
            }
        }

        if (this.trackBg) {
            this.trackBg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewWidth} ${height}" style="width: ${viewWidth}px; height: ${height}px; overflow: visible;"><path d="${pathString}" stroke="var(--sl-color-hairline-light)" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" fill="none" style="shape-rendering: geometricPrecision;" />${dotSvg}</svg>`;
        }

        const svgMask = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewWidth} ${height}"><path d="${pathString}" stroke="black" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" fill="none" /></svg>`;
        const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

        this.mask.style.width = `${viewWidth}px`;
        this.mask.style.height = `${height}px`;
        this.mask.style.maskImage = maskUrl;
        (this.mask.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = maskUrl;
    };

    private moveThumb = (link: HTMLAnchorElement) => {
        if (!this.fill) return;
        const seg = this.segments.get(link);
        if (!seg) return;
        
        // Tinggi dan posisi thumb diikat murni ke variabel `top` dan `bottom` segmen
        this.fill.style.transform = `translateY(${seg.top}px)`;
        this.fill.style.height = `${seg.bottom - seg.top}px`;
        this.fill.style.opacity = '1';
        
        this.buildTrack();
    };

    private onIdle = (cb: () => void) =>
        (window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1)))(cb);

    constructor() {
        super();
        this.onIdle(() => this.init());
    }

    private init = () => {
        const links = [...this.querySelectorAll('a')] as HTMLAnchorElement[];

        this.buildTrack();
        if (this._current) this.moveThumb(this._current);

        const isHeading = (el: Element): boolean => el.matches(this.tocHeadingSelector);

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

        const setCurrent = (entries: IntersectionObserverEntry[]) => {
            const currentScrollY = window.scrollY;
            this.dotDirection = currentScrollY > this.lastY ? 'bottom' : 'top';
            this.lastY = currentScrollY;

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

        const trackResizeObserver = new ResizeObserver(() => {
            this.buildTrack();
            if (this._current) this.moveThumb(this._current);
        });
        trackResizeObserver.observe(this);

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
        const top =
            (document.querySelector('header')?.getBoundingClientRect().height || 0) +
            (this.querySelector('summary')?.getBoundingClientRect().height || 0) +
            32;
        return `-${top}px 0% ${top + 53 - document.documentElement.clientHeight}px`;
    }
}

customElements.define('starlight-toc', StarlightTOC);
