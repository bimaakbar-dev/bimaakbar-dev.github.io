// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://bimaakbar.pages.dev',
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Geist',
			cssVariable: '--font-geist',
			options: {
				variants: [
					{
						weight: "100 900",
						style: 'normal',
						src: ['./src/assets/fonts/Geist.woff2'],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'GeistMono',
			cssVariable: '--font-geist-mono',
			options: {
				variants: [
					{
						weight: 'normal',
						style: 'normal',
						src: ['./src/assets/fonts/GeistMono.woff2'],
					},
				],
			},
		},
	],
	integrations: [
		starlight({
			title: 'stargazers',
			logo: {
				light: './src/assets/images/light-logo.svg',
				dark: './src/assets/images/dark-logo.svg',
			},
			favicon: '/images/favicon.svg',
			customCss: [
     		   './src/styles/reset.css',
				'./src/styles/global.css',
				'./src/styles/markdown.css',
				'./src/styles/asides.css',
			],
			components: {
     Banner: './src/components/Banner.astro',
				Head: './src/components/Head.astro',
				DraftContentNotice: './src/components/FallbackContentNotice.astro',
				FallbackContentNotice: './src/components/FallbackContentNotice.astro',
				
			},
			expressiveCode: {
				styleOverrides: { 
					borderColor: 'var(--sl-color-hairline)',
					borderRadius: '0.5rem',
					borderWidth: '1px',

					codeBackground: 'var(--sl-color-gray-6)',
					codeFontFamily: 'var(--font-geist-mono)',
					codeFontSize: 'var(--sl-text-code-sm)',

					focusBorder: 'var(--sl-color-accent)',

					uiFontFamily: 'var(--font-geist)',

					frames: {
						copyIcon: 'var(--copy-icon)',

						frameBoxShadowCssValue: 'none',
						shadowColor: 'transparent',

						editorActiveTabBackground: 'var(--sl-color-gray-6)',
						editorActiveTabBorderColor: 'var(--sl-color-hairline)',
						editorActiveTabIndicatorTopColor: 'none',
						editorActiveTabForeground: 'var(--sl-color-text-accent)',
						editorActiveTabIndicatorBottomColor: 'var(--sl-color-accent)',

						editorBackground: 'var(--sl-color-gray-6)',
						editorTabBarBackground: 'var(--sl-color-gray-6)',
						editorTabBarBorderBottomColor: 'var(--sl-color-hairline)',
						editorTabBarBorderColor: 'var(--sl-color-hairline)',
						editorTabBorderRadius: '0.5rem',
						
						inlineButtonBackground: 'color-mix(in srgb, var(--sl-color-bg) 60%, transparent)',
						inlineButtonBorder: 'var(--sl-color-hairline)',
						inlineButtonForeground: 'var(--sl-color-white)',

						terminalBackground: 'var(--sl-color-gray-6)',
						terminalTitlebarBackground: 'var(--sl-color-gray-6)',
						terminalTitlebarBorderBottomColor: 'var(--sl-color-hairline)',
						terminalTitlebarDotsForeground: 'var(--sl-color-gray-2)',
						terminalTitlebarDotsOpacity: '0.2',

						tooltipSuccessBackground: 'var(--sl-color-green)',
						tooltipSuccessForeground: 'var(--sl-color-text-invert)'
					},
				},
				themes: [ 'vitesse-black', 'vitesse-light' ],
				shiki: {
					langAlias: {
						markdoc: 'mdx',
					},
				},
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
				id: {
					label: 'Indonesia',
					lang: 'id',
				},
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/bimaakbar-dev/bimaakbar' }
			],
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ autogenerate: { directory: 'reference' } }
					],
				},
				{
					label: 'Writing',
					items: [
						{ label: 'Markdown', slug: 'writing/markdown' },
					],
				},
				{
					label: 'Components',
					items: [
						{ label: 'Using Components', slug: 'components/using-components' },
						{ label: 'Cards', slug: 'components/cards' },
						{ label: 'Link Cards', slug: 'components/link-cards' },
						{ label: 'Card Grids', slug: 'components/card-grids' },
       				 { label: 'Asides', slug: 'components/asides' },
            			{ label: 'Badges', slug: 'components/badges' },
            			{ label: 'Code', slug: 'components/code' },
            			{ label: 'File Tree', slug: 'components/file-tree' },
            			{ label: 'Icons', slug: 'components/icons' },
						{ label: 'Link Buttons', slug: 'components/link-buttons' },
						{ label: 'Steps', slug: 'components/steps' },
						{ label: 'Tabs', slug: 'components/tabs' },
					],
				},
			],
			credits: true,
		}),
	],
});