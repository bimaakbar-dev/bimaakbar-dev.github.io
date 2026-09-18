export const commentsConfig = {
  provider: 'giscus' as 'giscus' | 'waline' | 'none',

  giscus: {
    repo: 'bimaakbar-dev/bimaakbar-dev.github.io',
    repoId: 'R_kgDOxxxxxxx',
    category: 'Comments',
    categoryId: 'DIC_kwDOxxxxxxxx',
    mapping: 'pathname' as const,
    reactionsEnabled: '1' as const,
    emitMetadata: '0' as const,
    inputPosition: 'top' as const,
    lang: 'id' as const,
  },

  waline: {
    serverURL: '',
    lang: 'id',
    login: 'enable',
    meta: ['nick', 'mail', 'link'],
    requiredMeta: ['nick'],
    reaction: false,
    pageview: false,
    comment: true,
    dark: 'html[data-theme="dark"]',
  },
};