// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import starlight from "@astrojs/starlight";

import { sidebarConfig } from "./src/config/sidebar";
import { expressiveCode } from "./src/config/expressive-code";
import { Overrides } from "./src/components/overrides";
import { satteri } from "@astrojs/markdown-satteri";
import { hastExternalLink } from "./src/lib/plugins/satteri/hast/hast-external-link";
import { hastTable } from "./src/lib/plugins/satteri/hast/hast-table";

import tailwindcss from "@tailwindcss/vite";

const site = "https://bimaakbar-dev.github.io/";
const siteName = "c0desk1";
const siteDesc = "Custom Starlight theme featuring a modern design";
const siteLocale = {
  root: {
    label: "English",
    lang: "en",
  },
  id: {
    label: "Indonesia",
    lang: "id",
  }
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
      mdastPlugins: [],
      hastPlugins: [
        hastExternalLink,
        hastTable,
      ],
      features: {
        headingAttributes: true,
        directive: true,
        superscript: true,
        subscript: true,
        wikilinks: true,
        definitionList: true,
        smartPunctuation: true
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
        dark: "./src/assets/images/author/bimaakbar.svg",
        replacesTitle: false,
      },
      favicon: "/images/favicon.svg",
      customCss: ["./src/styles/global.css"],
      defaultLocale: "root",
      locales: siteLocale,
      expressiveCode: expressiveCode,
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
  vite: {
    plugins: [tailwindcss()],
  },
});