/**
 * @file Route template that replays the entry transition after navigation.
 * @author meetbyte
 */
import { RouteMotion } from "@/components/route-motion";
/**
 * Wraps each route in the page transition styling.
 * @param children - The current route's content.
 * @returns A transition wrapper for the page.
 * @author meetbyte
 */
export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteMotion>{children}</RouteMotion>;
}
