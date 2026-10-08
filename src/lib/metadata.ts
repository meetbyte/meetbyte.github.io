/** Shared canonical and social metadata for the static site. @author meetbyte */
import type { Metadata } from "next";
import { profile } from "@/data/profile";
export const siteUrl = "https://meetbyte.github.io";
export const socialImage = { url: "/images/social-preview.png", width: 1200, height: 630, alt: `${profile.name} — Software Engineer` };

export function pageMetadata(title: string, description: string, pathname: string, options: { sample?: boolean; article?: boolean; date?: string; tags?: readonly string[] } = {}): Metadata {
  return {
    title, description, alternates: { canonical: pathname },
    robots: options.sample ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: `${title} | ${profile.name}`, description, url: pathname, siteName: profile.name,
      locale: "en_US", images: [socialImage],
      ...(options.article ? { type: "article" as const, publishedTime: options.date, authors: [profile.name], tags: options.tags ? [...options.tags] : undefined } : { type: "website" as const }),
    },
    twitter: { card: "summary_large_image", title: `${title} | ${profile.name}`, description, images: [socialImage.url] },
  };
}
