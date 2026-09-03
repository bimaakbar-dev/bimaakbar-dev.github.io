// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import starlight from '@astrojs/starlight';

import { sidebarConfig } from './src/config/sidebar';
import { expressiveCodeConfig } from './src/config/expressive-code';

import { satteri } from '@astrojs/markdown-satteri';
import { satteriExternalLink } from './src/lib/plugins/satteri/external-link';
import { satteriTable } from './src/lib/plugins/satteri/table';

import tailwindcss from '@tailwindcss/vite';

const PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;

const site = PREVIEW_SITE || 'https://bimaakbar-dev.github.io/';

// https://astro.build/config
export default defineConfig({
    site,
    fonts: [
    	{
            provider: fontProviders.local(),
            name: 'Monsterrat',
            cssVariable: '--font-monsterrat',
            options: {
                variants: [
                    {
                        weight: '100 900',
                        style: 'normal',
                        src: ['./src/assets/fonts/Monsterrat.woff2'],
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: 'Inter',
            cssVariable: '--font-inter',
            options: {
                variants: [
                    {
                        weight: 'normal',
                        style: 'normal',
                        src: ['./src/assets/fonts/Inter.woff2'],
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: 'FiraCode',
            cssVariable: '--font-firaCode',
            options: {
                variants: [
                    {
                        weight: 'normal',
                        style: 'normal',
                        src: ['./src/assets/fonts/FiraCode.woff2'],
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: 'Geist',
            cssVariable: '--font-geist',
            options: {
                variants: [
                    {
                        weight: '100 900',
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
                light: './src/assets/logo-light.svg',
                dark: './src/assets/logo-dark.svg',
                replacesTitle: true,
            },
            favicon: '/images/favicon.svg',
            customCss: [
                './src/styles/global.css',
            ],
            // @ts-ignore
            expressiveCode: expressiveCodeConfig,
            components: {
                Banner: './src/components/Banner.astro',
                DraftContentNotice: './src/components/FallbackContentNotice.astro',
                FallbackContentNotice: './src/components/FallbackContentNotice.astro',
                Footer: './src/components/Footer.astro',
                Head: './src/components/Head.astro',
                Header: './src/components/Header.astro',
                Hero: './src/components/Hero.astro',
                MarkdownContent: './src/components/MarkdownContent.astro',
                MobileMenuToggle: './src/components/MobileMenuToggle.astro',
                PageTitle: './src/components/PageTitle.astro',
                SkipLink: './src/components/SkipLink.astro'
                
            },
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/bimaakbar-dev' }
            ],
            editLink: {
				baseUrl: 'https://github.com/bimaakbar-dev/starlight/edit/main/docs/',
			},
            credits: true,
            sidebar: sidebarConfig,
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
    },
});