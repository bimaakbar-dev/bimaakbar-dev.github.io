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
        { autogenerate: { directory: 'docs/writting' } },
        { label: 'Markdown', slug: 'docs/writting/markdown' },
        { label: 'Using MDX', slug: 'docs/writting/using-mdx' }
      ],
  },
  {
    label: 'Components',
    items: [{ autogenerate: { directory: 'components' } }],
  },
];