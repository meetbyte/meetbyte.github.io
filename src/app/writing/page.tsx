/**
 * @file Reserved editorial writing route; remains unavailable until content publication is authorized.
 * @author meetbyte
 */
import { requirePageEnabled } from "@/lib/require-page-enabled";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Writing", "Verified writing content.", "/writing/");
/** Preserve the unpublished boundary while the content milestone prepares the real index. @author meetbyte */
export default function Writing() {
  requirePageEnabled("writing");
  return null;
}
