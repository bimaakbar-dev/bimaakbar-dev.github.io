//@ts-ignore
import type { ImageMetadata } from 'astro';

export interface HeroImageData {
  src: string;
  width?: number;
  height?: number;
}

export function getHeroImage(
  input: ImageMetadata | string | undefined
): HeroImageData | undefined {
  if (!input) return undefined;

  if (typeof input === 'string') {
    return { src: input };
  }

  return {
    src: input.src,
    width: input.width,
    height: input.height,
  };
}