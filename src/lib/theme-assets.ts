/** @file Decode the visible appearance assets before changing the page palette. @author meetbyte */
import { editorialPortrait } from "@/data/profile";
import { inkConfig } from "@/constants/artwork";
import type { Theme } from "./theme";

const decoded = new Map<string, Promise<boolean>>();

/** Select only assets used by this route and viewport; avoid downloading every artwork size. @author meetbyte */
export function themeAssetUrls(theme: Theme, pathname: string, portrait: boolean): string[] {
  const home = pathname === "/";
  const artwork = home
    ? `home-${theme}-${portrait ? "portrait" : "landscape"}.webp`
    : `hero-${theme}-600.webp`;
  return [inkConfig.assetDirectory + artwork, ...(pathname === "/about/" || pathname === "/about" ? [editorialPortrait[theme]] : [])];
}

/** Keep the existing appearance while a cold image downloads; failed requests may be retried. @author meetbyte */
function decodeAsset(url: string): Promise<boolean> {
  const cached = decoded.get(url);
  if (cached) return cached;
  const task = new Promise<boolean>((resolve) => {
    const image = new Image();
    let settled = false;
    const finish = (success: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      image.onload = image.onerror = null;
      if (!success) decoded.delete(url);
      resolve(success);
    };
    const timer = setTimeout(() => finish(false), inkConfig.themeAssetTimeoutMs);
    image.onload = () => image.decode().then(() => finish(true), () => finish(false));
    image.onerror = () => finish(false);
    image.src = url;
  });
  decoded.set(url, task);
  return task;
}

/** Warm the alternate theme and gate cold switches without clearing the current artwork. @author meetbyte */
export async function prepareThemeAssets(theme: Theme): Promise<boolean> {
  const urls = themeAssetUrls(theme, window.location.pathname, window.matchMedia(inkConfig.portraitQuery).matches);
  return (await Promise.all(urls.map(decodeAsset))).every(Boolean);
}
