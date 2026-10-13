/**
 * @file Shared layout for every portfolio route.
 * @author meetbyte
 */
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ConnectionProvider } from "@/components/connection-provider";
import { createConnectionBootstrapScript } from "@/lib/connection";
import { SiteLink as Link } from "@/components/site-link";
import { profile } from "@/data/profile";
import { siteUrl, socialImage, pageMetadata } from "@/lib/metadata";
import { Navigation } from "@/components/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteContent } from "@/constants/content";
import { routes } from "@/constants/routes";
import { createThemeBootstrapScript } from "@/lib/theme";
import "@/styles/colors.css";
import "@/styles/globals.css";
import "@/styles/polish.css";
import "@/styles/editorial.css";
import "@/styles/editorial-pages.css";
import "@/styles/editorial-home.css";
import "@/styles/editorial-writing.css";
import "@/styles/editorial-artwork.css";
import { RouteFocus } from "@/components/route-focus";
import { cvConfig } from "@/data/cv";
import { contactContent } from "@/data/contact";

// Local variable fonts keep builds and visitor requests independent of font CDNs.
const inter = localFont({ src: "../assets/fonts/inter-latin-variable.woff2", weight: "100 900", variable: "--font-body", display: "swap", fallback: ["Arial", "sans-serif"] });
const newsreader = localFont({ src: "../assets/fonts/newsreader-latin-variable.woff2", weight: "200 800", variable: "--font-heading", display: "swap", fallback: ["Georgia", "serif"] });

export const metadata: Metadata = {
  ...pageMetadata("Home", siteContent.common.metadata.description, "/"),
  metadataBase: new URL(siteUrl),
  title: { default: siteContent.common.metadata.title, template: `%s | ${profile.name}` },
  openGraph: { ...pageMetadata("Home", siteContent.common.metadata.description, "/").openGraph, images: [socialImage] },
  icons: { icon: "/icons/mark.svg", apple: "/icons/apple-touch-icon.png" },
};

/**
 * Renders the editorial header, reading region and verified footer links.
 * @param children - The current route's page content.
 * @returns The shared document layout.
 * @author meetbyte
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { common } = siteContent;

  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* Resolve persistent theme or OS preference before the first paint. */}
      <head><script dangerouslySetInnerHTML={{ __html: createThemeBootstrapScript() + createConnectionBootstrapScript() }} /></head>
      <body suppressHydrationWarning>
        <ConnectionProvider>
        <a className="skip-link" href="#main-content">{common.skipLink}</a>
        <div className="site-shell">
          <header className="site-header">
            <Link className="site-brand" href={routes.home} aria-label={`${common.brand.symbol}${common.brand.punctuation} ${common.brand.homeLabel}`}>
              <span className="brand-name">{profile.name}</span>
            </Link>
            <Navigation />
            <div className="header-tools">
              <ThemeToggle />
            </div>
          </header>

          {/* Native page scrolling and one shared reading region. */}
          <div className="site-grid">
            <main id="main-content" className="content-panel" tabIndex={0}>{children}</main>
          </div>

          <footer className="site-footer">
            <span>{profile.name}</span>
            <nav aria-label="Footer">
              <a href={`mailto:${contactContent.email}`}>Email</a>
              {profile.socials.filter((social) => social.label !== "X").map((social) => <a key={social.label} href={social.href}>{social.label}</a>)}
              {cvConfig.available && <a href={cvConfig.href} download={cvConfig.filename}>CV</a>}
            </nav>
          </footer>
        </div>
        <RouteFocus />
        </ConnectionProvider>
      </body>
    </html>
  );
}
