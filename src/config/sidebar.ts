// src/config/sidebar.ts
export const sidebarConfig = [
  { label: 'Apa itu c0desk1?', 
    translations: {
      en: "Whats a c0desk1?",
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
//  {
//    label: "Komponen",
//    translations: {
//      en: "Components",
//    },
//    items: [{ autogenerate: { directory: "docs/components" } }],
//  },
  {
    label: "Referensi",
    translations: {
      en: "Reference",
    },
    items: [{ autogenerate: { directory: "docs/reference" } }],
  },
];
