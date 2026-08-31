/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    blogMeta?: {
      heroImage?: import('astro').ImageMetadata;
      pubDate?: Date;
      author?: {
        name: string;
        avatar: string;
      };
    };
  }
}