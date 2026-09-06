// src/config/expressive-code.ts
import type { StarlightExpressiveCodeOptions } from "@astrojs/starlight/expressive-code";

export const expressiveCode: StarlightExpressiveCodeOptions = {
  styleOverrides: {
    borderColor: "var(--sl-color-hairline-light)",
    borderRadius: "0.5rem",
    borderWidth: "1px",

    codeBackground: "var(--sl-color-bg)",
    codeFontFamily: "var(--font-firaCode)",
    codeFontSize: "var(--sl-text-code-sm)",

    focusBorder: "var(--sl-color-accent-low)",
    uiFontFamily: "var(--font-inter)",
    frames: {
      copyIcon: "var(--copy-icon)",
      frameBoxShadowCssValue: "none",
      shadowColor: "transparent",

      editorBackground: "var(--sl-color-bg)",

      editorTabBarBackground: "var(--sl-color-bg)",
      editorTabBarBorderBottomColor: "var(--sl-color-hairline-light)",
      editorTabBarBorderColor: "var(--sl-color-hairline-light)",
      // editorTabBorderRadius: "0.5rem",

      editorActiveTabBackground: "none",
      editorActiveTabBorderColor: "none",
      editorActiveTabIndicatorTopColor: "none",
      editorActiveTabForeground: "var(--sl-color-white)",
      editorActiveTabIndicatorBottomColor: "var(--sl-color-accent-high)",

      inlineButtonBackground: "none",
      inlineButtonBorder: "none",
      inlineButtonForeground: "var(--sl-color-white)",

      terminalBackground: "var(--sl-color-bg)",
      terminalTitlebarBackground: "none",
      terminalTitlebarBorderBottomColor: "var(--sl-color-hairline-light)",
      terminalTitlebarDotsForeground: "var(--sl-color-gray-4)",
      terminalTitlebarDotsOpacity: "0.3",

      tooltipSuccessBackground: "var(--sl-color-green)",
      tooltipSuccessForeground: "var(--sl-color-text-invert)",
    },
  },
  themes: ["vitesse-black", "vitesse-light"],
  shiki: {
    langAlias: {
      markdoc: "mdx",
    },
  },
};
