/**
 * @file Shared layout for every portfolio route.
 * @author meetbyte
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { ProfileCard } from "@/components/profile-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteContent } from "@/constants/content";
import { routes } from "@/constants/routes";
import { createThemeBootstrapScript } from "@/lib/theme";
import "@/styles/colors.css";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: siteContent.common.metadata.title,
  description: siteContent.common.metadata.description,
};

/**
 * Renders the persistent header, profile card, content area, and footer.
 * @param children - The current route's page content.
 * @returns The shared document layout.
 * @author meetbyte
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { common } = siteContent;

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* Apply the saved palette before rendering the body to avoid a flash. */}
      <head><script dangerouslySetInnerHTML={{ __html: createThemeBootstrapScript() }} /></head>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main-content">{common.skipLink}</a>
        <div className="site-shell">
          <header className="site-header">
            <Link className="site-brand" href={routes.home} aria-label={common.brand.homeLabel}>
              <span className="brand-symbol">
                {common.brand.symbol}<span>{common.brand.punctuation}</span>
              </span>
              <span className="brand-name">
                {common.brand.lines[0]}<br />{common.brand.lines[1]}
              </span>
            </Link>
            <Navigation />
            <div className="header-tools">
              <span className="header-status">
                <span className="status-dot" /> {common.headerStatus}
              </span>
              <ThemeToggle />
            </div>
          </header>

          {/* The profile persists while the main content changes by route. */}
          <div className="site-grid">
            <ProfileCard />
            <main id="main-content" className="content-panel">{children}</main>
          </div>

          <footer className="site-footer">
            <span>
              {common.footer.identity} <span className="footer-divider">/</span> {common.footer.siteType}
            </span>
            <span>{common.footer.message}</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
