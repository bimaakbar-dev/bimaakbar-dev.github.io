// src/config/expressive-code.ts
import type { StarlightExpressiveCodeOptions } from "@astrojs/starlight/expressive-code";

export const expressiveCode: StarlightExpressiveCodeOptions = {
  styleOverrides: {
    borderColor: "var(--sl-color-hairline-light)",
    borderRadius: "0.5rem",
    borderWidth: "1px",
    
    codeBackground: "var(--sl-color-bg-inline-code)",
    codeFontFamily: "var(--font-firaCode)",
    codeFontSize: "var(--sl-text-code-sm)",
    
    focusBorder: "var(--sl-color-accent)",
    uiFontFamily: "var(--font-inter)",
    frames: {
      copyIcon: "var(--copy-icon)",
      frameBoxShadowCssValue: "none",
      shadowColor: "transparent",
      
      editorActiveTabBackground: "var(--sl-color-bg-inline-code)",
      editorActiveTabBorderColor: "var(--sl-color-hairline)",
      editorActiveTabIndicatorTopColor: "none",
      editorActiveTabForeground: "var(--sl-color-white)",
      editorActiveTabIndicatorBottomColor: "var(--sl-color-accent-high)",
      
      editorBackground: "var(--sl-color-bg-inline-code)",
      editorTabBarBackground: "var(--sl-color-bg)",
      editorTabBarBorderBottomColor: "var(--sl-color-hairline)",
      editorTabBarBorderColor: "var(--sl-color-hairline-light)",
      editorTabBorderRadius: "0.5rem",
      
      inlineButtonBackground: "transparent",
      inlineButtonBorder: "transparent",
      inlineButtonForeground: "var(--sl-color-white)",
      
      terminalBackground: "var(--sl-color-bg-inline-code)",
      terminalTitlebarBackground: "var(--sl-color-bg)",
      terminalTitlebarBorderBottomColor: "var(--sl-color-hairline)",
      terminalTitlebarDotsForeground: "var(--sl-color-gray-3)",
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