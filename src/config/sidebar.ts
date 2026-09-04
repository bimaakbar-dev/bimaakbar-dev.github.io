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
      items: [{ autogenerate: { directory: 'docs/writting' } }],
  },
  {
    label: 'Components',
    items: [{ autogenerate: { directory: 'components' } }],
  },
];