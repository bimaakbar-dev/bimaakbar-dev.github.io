// src/config/sidebar.ts
export const sidebarConfig = [
  { label: 'Whats a c0desk1?', 
    translations: {
      id: "Apa itu Stradocs?",
    }, 
    slug: "docs"},
  {
    label: "Guides",
    translations: {
      id: "Panduan",
    },
    items: [{ autogenerate: { directory: "docs/guides" } }],
  },
  {
    label: "Writing",
    translations: {
      id: "Menulis",
    },
    items: [{ autogenerate: { directory: "docs/writing" } }],
  },
  {
    label: "Components",
    translations: {
      id: "Komponen",
    },
    items: [{ autogenerate: { directory: "docs/components" } }],
  },
  {
    label: "Reference",
    translations: {
      id: "Referensi",
    },
    items: [{ autogenerate: { directory: "docs/reference" } }],
  },
];
