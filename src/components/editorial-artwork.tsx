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
  const transforms = ["translate(680 130) rotate(16)", "translate(850 340) rotate(-28)", "translate(710 590) rotate(66)", "translate(960 90) rotate(108)", "translate(800 740) rotate(-72)", "translate(660 380) rotate(155)", "translate(950 540) rotate(40)", "translate(760 20) rotate(-10)"];
  return <div className="ink-layer inner-ink" data-composition={variant}>
    <svg className="ink-composition" viewBox="0 0 1000 1000" preserveAspectRatio="none" focusable="false">
      <defs>
        <filter id={`grain-${id}`} x="-60%" y="-60%" width="220%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency=".015 .024" numOctaves="3" seed={variant + 3} result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="55" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <pattern id={`paper-${id}`} patternUnits="userSpaceOnUse" x="-300" y="-375" width="600" height="750">
          <image className="ink-paper-light" href="/images/editorial/hero-light-600.webp" x="-300" y="-375" width="600" height="750" />
          <image className="ink-paper-dark" href="/images/editorial/hero-dark-600.webp" x="-300" y="-375" width="600" height="750" />
        </pattern>
        <radialGradient id={`fade-${id}`}><stop offset="0" stopColor="white" /><stop offset=".6" stopColor="white" stopOpacity=".7" /><stop offset="1" stopColor="white" stopOpacity="0" /></radialGradient>
        <mask id={`edge-${id}`}><ellipse cx="0" cy="0" rx={220 + variant * 8} ry={300 - variant * 13} fill={`url(#fade-${id})`} /></mask>
        <radialGradient id={`wash-${id}`}><stop offset="0" stopColor="var(--ink-color)" stopOpacity=".65" /><stop offset=".55" stopColor="var(--ink-color)" stopOpacity=".35" /><stop offset="1" stopColor="var(--ink-color)" stopOpacity="0" /></radialGradient>
      </defs>
      <g id={`stain-${id}`} transform={transforms[variant]} filter={`url(#grain-${id})`}>
        <ellipse cx="0" cy="0" rx={220 + variant * 8} ry={300 - variant * 13} fill={`url(#wash-${id})`} />
        <ellipse cx="0" cy="0" rx={220 + variant * 8} ry={300 - variant * 13} fill={`url(#paper-${id})`} mask={`url(#edge-${id})`} opacity=".85" />
        <path d="M-95-180 C-260-120-70 45-180 130 C-210 260 50 290 170 170 C270 70 40-30 130-150 C190-320-40-290-95-180Z" fill="var(--ink-color)" opacity=".16" />
        <ellipse cx={variant % 2 ? -290 : 180} cy="260" rx="120" ry="180" fill={`url(#wash-${id})`} />
      </g>
    </svg>
    <svg className="ink-composition ink-echo" viewBox="0 0 1000 1000" preserveAspectRatio="none" focusable="false"><use href={`#stain-${id}`} /></svg>
  </div>;
}
/** Home keeps its approved composition; navigation and refresh select a fresh inner-page wash. @author meetbyte */
export function PageAtmosphere() {
  const pathname = usePathname();
  const section = pathname.split("/")[1] || "home";
  const reading = /\/(experience|writing)\/[^/]+/.test(pathname);
  return <div className={`page-atmosphere atmosphere-${section}${reading ? " atmosphere-reading" : ""}`} aria-hidden="true">
    {section === "home" ? <div className="ink-layer" /> : <InnerInk key={pathname} pathname={pathname} />}
  </div>;
}
