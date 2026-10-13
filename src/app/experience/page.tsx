/**
 * @file Reserved editorial experience route; remains unavailable until content publication is authorized.
 * @author meetbyte
 */
import { requirePageEnabled } from "@/lib/require-page-enabled";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Experience", "Verified experience content.", "/experience/");
/** Preserve the unpublished boundary while the content milestone prepares the real index. @author meetbyte */
export default function Experience() {
  requirePageEnabled("experience");
  return null;
}
