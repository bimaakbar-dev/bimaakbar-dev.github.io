// src/config/sidebar.ts
export const sidebarConfig = [
  {
    label: 'Getting Started',
      items: [
      { label: 'introduction', slug: 'getting-started/introduction' }
    ],
  },
  {
    label: 'Writing',
    items: [
     { autogenerate: { directory: 'docs/writing' } },
     { label: 'Markdown', slug: 'docs/writing/markdown' },
     { label: 'Using Mdx, slug: 'docs/writing/using-mdx' }
    ],
  },
  {
    label: 'Components',
    items: [{ autogenerate: { directory: 'components' } }],
  },
];