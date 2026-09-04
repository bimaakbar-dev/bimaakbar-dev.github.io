// src/config/sidebar.ts
export const sidebarConfig = [
  {
    label: 'Getting Started',
      items: [
      { label: 'introduction', slug: 'getting-started/introduction' }
    ],
  },
  {
    label: 'Guides',
    items: [
      { label: 'Example Guide', slug: 'guides/example' }
    ],
  },
  {
    label: 'Reference',
    items: [
      { autogenerate: 
        { directory: 'reference' } 
      }
    ],
  },
  {
    label: 'Writing',
    items: [
     { autogenerate:
       { directory: 'docs/writing' }
     }
    ],
  },
  {
    label: 'Writing',
    items: [
      { label: 'Markdown', slug: 'writing/markdown' }
    ],
  },
  {
    label: 'Components',
    items: [
      { autogenerate: 
        { directory: 'components' } 
      }
    ],
  },
];