/**
 * @file Shared layout for every portfolio route.
 * @author meetbyte
 */
import type { Metadata } from "next";
import localFont from "next/font/local";
import { CelestialBody } from "@/components/celestial-body";
import { SiteScenery } from "@/components/site-scenery";
import { SeasonPreview } from "@/components/season-picker";
import { ConnectionProvider } from "@/components/connection-provider";
import { createConnectionBootstrapScript } from "@/lib/connection";
import { createSceneryBootstrapScript } from "@/lib/scenery-motion";
import { SiteLink as Link } from "@/components/site-link";
import { SiteImage as Image } from "@/components/site-image";
import { ShellMotion } from "@/components/shell-motion";
import { profile } from "@/data/profile";
import { siteUrl, socialImage, pageMetadata } from "@/lib/metadata";
import { Navigation } from "@/components/navigation";
import { ProfileCard } from "@/components/profile-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/constants/config";
import { siteContent } from "@/constants/content";
import { routes } from "@/constants/routes";
import { createSeasonBootstrapScript } from "@/lib/season";
import { createThemeBootstrapScript } from "@/lib/theme";
import "@/styles/colors.css";
import "@/styles/globals.css";
import "@/styles/scenery.css";
import "@/styles/seasons.css";
import "@/styles/polish.css";

// Local variable fonts keep builds and visitor requests independent of font CDNs.
const manrope = localFont({ src: "../assets/fonts/manrope-latin-variable.woff2", weight: "200 800", variable: "--font-body", display: "swap", fallback: ["Segoe UI", "Arial"] });
const bricolage = localFont({ src: "../assets/fonts/bricolage-grotesque-latin-variable.woff2", weight: "200 800", variable: "--font-heading", display: "swap", fallback: ["Segoe UI", "Arial"] });

export const metadata: Metadata = {
  ...pageMetadata("Home", siteContent.common.metadata.description, "/"),
  metadataBase: new URL(siteUrl),
  title: { default: siteContent.common.metadata.title, template: `%s | ${profile.name}` },
  openGraph: { ...pageMetadata("Home", siteContent.common.metadata.description, "/").openGraph, images: [socialImage] },
  icons: { icon: "/icons/mark.svg", apple: "/icons/apple-touch-icon.png" },
};

/**
 * Renders the persistent header, profile card, content area.
 * @param children - The current route's page content.
 * @returns The shared document layout.
 * @author meetbyte
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { common } = siteContent;

  return (
    <html lang="en" className={`${manrope.variable} ${bricolage.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* Apply local time, season and motion preferences before the first paint. */}
      <head><script dangerouslySetInnerHTML={{ __html: createThemeBootstrapScript() + createSeasonBootstrapScript() + createSceneryBootstrapScript() + createConnectionBootstrapScript() }} /></head>
      <body suppressHydrationWarning>
        <ConnectionProvider>
        <SiteScenery />
        <a className="skip-link" href="#main-content">{common.skipLink}</a>
        <div className="site-shell">
          <header className="site-header">
            <CelestialBody />
            <Link className="site-brand" href={routes.home} aria-label={`${common.brand.symbol}${common.brand.punctuation} ${common.brand.homeLabel}`}>
              <span className="brand-symbol" aria-hidden="true">
                {common.brand.symbol}<span>{common.brand.punctuation}</span>
              </span>
              <Image className="header-portrait" src={profile.portrait.src} alt="" width={38} height={38} aria-hidden="true" />
              <span className="brand-name">
                {common.brand.lines[0]}{" "}<br />{common.brand.lines[1]}
              </span>
            </Link>
            <Navigation />
            <div className="header-tools">
              {siteConfig.showSeasonPicker && <SeasonPreview />}
              <ThemeToggle />
            </div>
          </header>

          {/* The profile persists while the main content changes by route. */}
          <div className="site-grid">
            <ProfileCard />
            <main id="main-content" className="content-panel" tabIndex={0}><div className="reading-progress" aria-hidden="true"><span /></div>{children}</main>
          </div>

        </div>
        <ShellMotion />
        </ConnectionProvider>
      </body>
    </html>
  );
}
