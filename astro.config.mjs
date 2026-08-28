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
				'./src/styles/global.css',
			],
			components: {
				Head: './src/components/Head.astro',
			},
			expressiveCode: {
				styleOverrides: { 
					borderRadius: '0.5rem',
					borderWidth: '1px',
					frames: {
						shadowColor: 'transparent',
					},
				},
				themes: ['vitesse-black', 'vitesse-light'],
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
					items: [{ autogenerate: { directory: 'reference' } }],
				},
				{
					label: 'Components',
					items: [
						{ label: 'Using Components', slug: 'components/using-components' },
						{ label: 'Cards', slug: 'components/cards' },
					],
				},
			],
			credits: true,
		}),
	],
});
