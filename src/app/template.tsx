/**
 * @file Shared route wrapper; current editorial CSS disables legacy entry animation.
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
