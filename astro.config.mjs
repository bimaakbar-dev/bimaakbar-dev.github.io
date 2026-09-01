// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import starlight from '@astrojs/starlight';

import { fontsConfig } from './src/config/fonts';
import { sidebarConfig } from './src/config/sidebar';
import { expressiveCodeConfig } from './src/config/expressive-code';

import { satteri } from '@astrojs/markdown-satteri';
import { satteriExternalLink } from './src/lib/plugins/satteri/external-link';
import { satteriTable } from './src/lib/plugins/satteri/table';

// https://astro.build/config
export default defineConfig({
	site: 'https://bimaakbar-dev.github.io',
	fonts: fontsConfig,
	markdown: {
    	processor: satteri({
			hastPlugins: [
				satteriExternalLink,
				satteriTable
			],
    	}),
	},
	integrations: [
		starlight({
			title: 'stargazers',
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
			expressiveCode: expressiveCodeConfig,
			components: {
				Banner: './src/components/Banner.astro',
				DraftContentNotice: './src/components/FallbackContentNotice.astro',
				FallbackContentNotice: './src/components/FallbackContentNotice.astro',
				Head: './src/components/Head.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/bimaakbar-dev/bimaakbar' }
			],
			sidebar: sidebarConfig,
			credits: true,
		}),
	],
});
