/**
 * @file Shared line icons used by navigation and calls to action.
 * @author meetbyte
 */
type IconName = "arrow" | "external" | "menu" | "close" | "sun" | "moon" | "download";

/**
 * Renders a decorative icon at the requested size.
 * @param name - The icon to draw.
 * @param size - Width and height in pixels; defaults to 18.
 * @returns An SVG that inherits the surrounding text color.
 * @author meetbyte
 */
export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M4 12h16" /><path d="m13 5 7 7-7 7" /></>,
    external: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="M5 5 19 19" /><path d="M19 5 5 19" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <path d="M20.1 15.1A8.5 8.5 0 0 1 8.9 3.9 8.5 8.5 0 1 0 20.1 15.1Z" />,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M4 17v3h16v-3" /></>,
  };

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}
