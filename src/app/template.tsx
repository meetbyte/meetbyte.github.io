/**
 * @file Route template that replays the entry transition after navigation.
 * @author meetbyte
 */
/**
 * Wraps each route in the page transition styling.
 * @param children - The current route's content.
 * @returns A transition wrapper for the page.
 * @author meetbyte
 */
export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="page-transition">{children}</div>;
}
