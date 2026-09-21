// src/config/sidebar.ts
export const sidebarConfig = [
  { label: 'Apa itu Stradocs?', 
    translations: {
      en: "Whats a Stradocs?",
    }, 
    slug: "docs"},
//  {
//    label: "Panduan",
//    translations: {
//      en: "Guides",
//    },
//    items: [{ autogenerate: { directory: "docs/guides" } }],
//  },
  {
    label: "Menulis",
    translations: {
      en: "Writing",
    },
    items: [{ autogenerate: { directory: "docs/writing" } }],
  },
  {
    label: "Komponen",
    translations: {
      en: "Components",
    },
    badge: { 
      text: {
        id: 'Segera', 
        en: 'Soon'
      }, variant: 'default' 
    },
    items: [{ autogenerate: { directory: "docs/components" } }]
  },
  {
    label: "Referensi",
    translations: {
      en: "Reference",
    },
    items: [{ autogenerate: { directory: "docs/reference" } }],
  },
];
