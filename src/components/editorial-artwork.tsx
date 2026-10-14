"use client";
/** @file Stable Home artwork and changing, motionless inner-page ink compositions. @author meetbyte */
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

/** Eight restrained compositions vary position, silhouette and ink grain without moving while reading. @author meetbyte */
function InnerInk({ pathname }: { pathname: string }) {
  const [visit, setVisit] = useState(0);
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let next = 1;
      try {
        const key = "meetbyte-ink-visit";
        next = (Number(sessionStorage.getItem(key)) || 0) + 1;
        sessionStorage.setItem(key, String(next));
      } catch { next = crypto.getRandomValues(new Uint32Array(1))[0] % 8 + 1; }
      setVisit(next);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const routeSeed = [...pathname].reduce((sum, letter) => sum + letter.charCodeAt(0), 0);
  const variant = (visit + routeSeed) % 8;
  return <div className="ink-layer inner-ink" data-composition={variant}><InkComposition variant={variant} id={id} /></div>;
}
/** Shared organic stains and scattered droplets retain the approved paper texture on both sides. @author meetbyte */
function InkComposition({ variant, id }: { variant: number; id: string }) {
  const transforms = ["translate(720 170) rotate(16)", "translate(160 390) rotate(-28)", "translate(770 600) rotate(66)", "translate(110 90) rotate(108)", "translate(830 730) rotate(-72)", "translate(210 650) rotate(155)", "translate(900 400) rotate(40)", "translate(400 70) rotate(-10)"];
  return <>
    <svg className="ink-composition" viewBox="0 0 1000 1000" preserveAspectRatio="none" focusable="false">
      <defs>
        <filter id={`grain-${id}`} x="-60%" y="-60%" width="220%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency=".015 .024" numOctaves="3" seed={variant + 3} result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="55" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation=".8" />
        </filter>
        <pattern id={`paper-${id}`} patternUnits="userSpaceOnUse" x="-300" y="-375" width="600" height="750">
          <image className="ink-paper-light" href="/images/editorial/hero-light-600.webp" x="-300" y="-375" width="600" height="750" />
          <image className="ink-paper-dark" href="/images/editorial/hero-dark-600.webp" x="-300" y="-375" width="600" height="750" />
        </pattern>
        <radialGradient id={`fade-${id}`}><stop offset="0" stopColor="white" /><stop offset=".6" stopColor="white" stopOpacity=".7" /><stop offset="1" stopColor="white" stopOpacity="0" /></radialGradient>
        <mask id={`edge-${id}`}><ellipse cx="0" cy="0" rx={220 + variant * 8} ry={300 - variant * 13} fill={`url(#fade-${id})`} /></mask>
        <radialGradient id={`wash-${id}`}><stop offset="0" stopColor="var(--ink-color)" stopOpacity=".65" /><stop offset=".55" stopColor="var(--ink-color)" stopOpacity=".35" /><stop offset="1" stopColor="var(--ink-color)" stopOpacity="0" /></radialGradient>
      <g id={`stain-${id}`} filter={`url(#grain-${id})`}>
        <ellipse cx="0" cy="0" rx={220 + variant * 8} ry={300 - variant * 13} fill={`url(#wash-${id})`} />
        <ellipse cx="0" cy="0" rx={220 + variant * 8} ry={300 - variant * 13} fill={`url(#paper-${id})`} mask={`url(#edge-${id})`} opacity=".85" />
        <path d="M-95-180 C-260-120-70 45-180 130 C-210 260 50 290 170 170 C270 70 40-30 130-150 C190-320-40-290-95-180Z" fill="var(--ink-color)" opacity=".16" />
        <ellipse cx={variant % 2 ? -290 : 180} cy="260" rx="120" ry="180" fill={`url(#wash-${id})`} />
      </g>
      </defs>
      <use className="ink-primary-stain" href={`#stain-${id}`} transform={transforms[variant]} />
      <use className="ink-secondary-stain" href={`#stain-${id}`} transform={`translate(${variant % 2 ? 850 : 85} ${180 + variant * 70}) rotate(${variant * 23 - 45}) scale(.48 .62)`} opacity=".48" />
      <g className="ink-spray" fill="var(--ink-color)" opacity=".20" filter={`url(#grain-${id})`} transform={`translate(${variant % 2 ? 760 : 135} ${480 - variant * 35}) rotate(${variant * 17})`}>
        <path d="M0 0C-12-17-32-14-28 8C-21 27 11 22 0 0Z M54 37C42 23 26 31 33 45C42 59 66 50 54 37Z M-30 95C-44 84-62 104-46 114C-31 124-16 106-30 95Z M85 145C73 134 64 150 78 159C88 166 97 151 85 145Z" />
        <ellipse cx="22" cy="170" rx="5" ry="9" /><ellipse cx="-72" cy="48" rx="4" ry="6" />
      </g>
    </svg>
    <svg className="ink-composition ink-echo" viewBox="0 0 1000 1000" preserveAspectRatio="none" focusable="false"><use href={`#stain-${id}`} transform={transforms[(variant + 3) % 8]} /></svg>
  </>;
}
/** Home keeps its approved composition; navigation and refresh select a fresh inner-page wash. @author meetbyte */
export function PageAtmosphere() {
  const pathname = usePathname();
  const homeId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const section = pathname.split("/")[1] || "home";
  const reading = /\/(experience|writing)\/[^/]+/.test(pathname);
  return <div className={`page-atmosphere atmosphere-${section}${reading ? " atmosphere-reading" : ""}`} aria-hidden="true">
    {section === "home" ? <><div className="ink-layer" /><div className="home-spill"><InkComposition variant={3} id={`home${homeId}`} /></div></> : <InnerInk key={pathname} pathname={pathname} />}
  </div>;
}
