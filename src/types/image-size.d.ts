/** Build-only parser supplied by our pinned Next.js dependency. */
declare module "next/dist/compiled/image-size" {
  export function imageSize(data: Uint8Array): { width?: number; height?: number };
}
