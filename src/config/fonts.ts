// src/config/fonts.ts
import { fontProviders } from 'astro/config';

export const fontsConfig = [
  {
    provider: fontProviders.local(),
    name: 'Geist',
    cssVariable: '--font-geist',
    options: {
      variants: [
        {
          weight: '100 900',
          style: 'normal',
          src: ['./src/assets/fonts/Geist.woff2'],
        },
      ],
    },
  },
  {
    provider: fontProviders.local(),
    name: 'GeistMono',
    cssVariable: '--font-geist-mono',
    options: {
      variants: [
        {
          weight: 'normal',
          style: 'normal',
          src: ['./src/assets/fonts/GeistMono.woff2'],
        },
      ],
    },
  },
];