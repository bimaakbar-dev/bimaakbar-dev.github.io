// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import starlight from '@astrojs/starlight';

import { sidebarConfig } from './src/config/sidebar';
import { expressiveCode } from './src/config/expressive-code';
import { 
    Overrides 
} from './src/components/overwrite';

import { satteri } from '@astrojs/markdown-satteri';
import { satteriExternalLink } from './src/lib/plugins/satteri/external-link';
import { satteriTable } from './src/lib/plugins/satteri/table';

import tailwindcss from '@tailwindcss/vite';

const site = 'https://bimaakbar-dev.github.io/';

// https://astro.build/config
export default defineConfig({
    site,
    fonts: [
    	{
            provider: fontProviders.local(),
            name: 'Montserrat',
            cssVariable: '--font-montserrat',
            options: {
                variants: [
                    {
                        weight: '100 900',
                        style: 'normal',
                        src: ['./src/assets/fonts/Montserrat.woff2'],
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
                        weight: '100 900',
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
            title: 'stradocs',
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
                light: './src/assets/images/author/bimaakbar.svg',
                dark: './src/assets/images/author/bimaakbar.svg',
                replacesTitle: false,
            },
            favicon: '/images/favicon.svg',
            customCss: [ './src/styles/global.css' ],
            expressiveCode: expressiveCode,
            components: Overrides,
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/bimaakbar-dev' },
{ icon: 'discord', label: 'Discord', href: 'https://discord.com/users/bimaakbardev' },
            ],
            editLink: {
				baseUrl: 'https://github.com/bimaakbar-dev/bimaakbar-dev.github.io/edit/main/docs/',
			},
            credits: true,
            sidebar: sidebarConfig,
            routeMiddleware: './src/routeData.ts',
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
    },
});
