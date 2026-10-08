/** Validate local media and reserve its intrinsic dimensions at build time. @author meetbyte */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
// Reuse the image parser in the pinned Next.js build dependency.
import { imageSize } from "next/dist/compiled/image-size";

export function localImageDimensions(src: string): { width: number; height: number } {
  if (!/^\/images\/[\w./-]+$/.test(src) || src.includes("..")) throw new Error("image must use a local path under /images/.");
  const file = path.join(process.cwd(), "public", src);
  if (!existsSync(file)) throw new Error(`image does not exist: ${src}`);
  const dimensions = imageSize(readFileSync(file));
  if (!dimensions.width || !dimensions.height) throw new Error(`image has no valid dimensions: ${src}`);
  return { width: dimensions.width, height: dimensions.height };
}

export function validateImage(image: { src: string; alt: string; width: number; height: number }): void {
  if (!image.alt?.trim()) throw new Error("image needs descriptive alt text.");
  if (![image.width, image.height].every((value) => Number.isFinite(value) && value > 0)) throw new Error("image dimensions must be positive numbers.");
  const size = localImageDimensions(image.src);
  if (Math.abs(image.width / image.height - size.width / size.height) > .02) throw new Error(`image dimensions do not match its aspect ratio: ${image.src}`);
}
