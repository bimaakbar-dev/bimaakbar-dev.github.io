// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import starlight from "@astrojs/starlight";

import { sidebarConfig } from "./src/config/sidebar";
import markdocGrammar from './grammars/markdoc.tmLanguage.json'
import { Overrides } from "./src/components/overrides";
import { satteri } from "@astrojs/markdown-satteri";
import { hastExternalLink } from "./src/lib/plugins/satteri/hast/hast-external-link";
import { hastTable } from "./src/lib/plugins/satteri/hast/hast-table";
import { hastAbbr } from "./src/lib/plugins/satteri/hast/hast-abbr";
import { mdastStradocsAside } from './src/lib/plugins/satteri/mdast/mdast-stradocs-aside'

const site = "https://bimaakbar-dev.github.io/";
const siteName = "Stradocs";
const siteDesc = "Custom Starlight theme featuring a modern design";
const siteLocale = {
  root: {
    label: "English",
    lang: "en",
  },
  id: {
    label: "Indonesia",
    lang: "id",
  },
};

// https://astro.build/config
export default defineConfig({
  site,
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Montserrat",
      cssVariable: "--font-montserrat",
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/Montserrat.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/Inter.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "FiraCode",
      cssVariable: "--font-firaCode",
      options: {
        variants: [
          {
            weight: "normal",
            style: "normal",
            src: ["./src/assets/fonts/FiraCode.woff2"],
          },
        ],
      },
    },
  ],
  markdown: {
    processor: satteri({
      hastPlugins: [
        hastAbbr,
        hastExternalLink,
        hastTable,
      ],
      mdastPlugins: [
        mdastStradocsAside,
      ],
      features: {
        frontmatter: true,
        headingAttributes: true,
        directive: true,
        superscript: true,
        subscript: true,
        wikilinks: true,
        definitionList: true,
        smartPunctuation: true,
        rawHtml: true
      },
    }),
  },
  integrations: [
    starlight({
      title: siteName,
      titleDelimiter: '|',
      description: siteDesc,
      logo: {
        light: "./src/assets/images/author/bimaakbar.svg",
        dark: "./src/assets/images/logo/logo.svg",
        replacesTitle: false,
      },
      favicon: "/images/favicon.svg",
      customCss: ["./src/styles/global.css"],
      defaultLocale: "root",
      locales: siteLocale,
      expressiveCode: { 
        themes: ["github-dark", "vitesse-light"],
        shiki: {
          langs: [markdocGrammar] 
        }
      },
      components: Overrides,
      social: [
        {
          icon: "github",
          label: "Github",
          href: "https://github.com/bimaakbar-dev",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.com/users/bimaakbardev",
        },
      ],
      lastUpdated: true,
      editLink: {
        baseUrl:
          "https://github.com/bimaakbar-dev/bimaakbar-dev.github.io/edit/main/docs/docs/",
      },
      routeMiddleware: "./src/routeData.ts",
      credits: true,
      sidebar: sidebarConfig,
    }),
  ],
});