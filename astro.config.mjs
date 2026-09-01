// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import starlight from '@astrojs/starlight';

import { sidebarConfig } from './src/config/sidebar';
import { expressiveCodeConfig } from './src/config/expressive-code';

import { satteri } from '@astrojs/markdown-satteri';
import { satteriExternalLink } from './src/lib/plugins/satteri/external-link';
import { satteriTable } from './src/lib/plugins/satteri/table';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://bimaakbar-dev.github.io',
    fonts: [
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
        }
    ],

    markdown: {
        processor: satteri({
            hastPlugins: [
                satteriExternalLink,
                // @ts-ignore
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
            // @ts-ignore
            expressiveCode: expressiveCodeConfig,
            components: {
                Banner: './src/components/Banner.astro',
                DraftContentNotice: './src/components/FallbackContentNotice.astro',
                FallbackContentNotice: './src/components/FallbackContentNotice.astro',
                Head: './src/components/Head.astro',
                
            },
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/bimaakbar-dev/bimaakbar' }
            ],
            sidebar: sidebarConfig,
            credits: true,
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
    },
});
