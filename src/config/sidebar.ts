// src/config/sidebar.ts
export const sidebarConfig = [
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
		{ label: 'Markdown', slug: 'writing/markdown' }
	],
  },
  {
    label: 'Components',
    items: [
      { label: 'Using Components', slug: 'components/using-components' },
      { label: 'Cards', slug: 'components/cards' },
      { label: 'Link Cards', slug: 'components/link-cards' },
      { label: 'Card Grids', slug: 'components/card-grids' },
      { label: 'Asides', slug: 'components/asides' },
      { label: 'Badges', slug: 'components/badges' },
      { label: 'Code', slug: 'components/code' },
      { label: 'File Tree', slug: 'components/file-tree' },
      { label: 'Icons', slug: 'components/icons' },
      { label: 'Link Buttons', slug: 'components/link-buttons' },
      { label: 'Steps', slug: 'components/steps' },
      { label: 'Tabs', slug: 'components/tabs' },
    ],
  },
];