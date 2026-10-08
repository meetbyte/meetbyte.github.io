/**
 * @file Matching seasonal sky plates and lightweight decorative weather.
 * @author meetbyte
 */
import type { CSSProperties } from "react";
import { CelestialBody } from "./celestial-body";

/**
 * Generates deterministic decorative rain, snow or leaf particles with staggered CSS timing and per-particle motion variables.
 * @author meetbyte
 */
function Weather({ kind, count }: { kind: "rain" | "snow" | "leaves"; count: number }) {
  return <div className={`season-weather weather-${kind}`}>
    {Array.from({ length: count }, (_, i) => {
      const duration = kind === "rain" ? 1.05 + i % 5 * .19 : kind === "snow" ? 12 + i % 7 * 2 : 14 + i % 5 * 3;
      return <span className="weather-particle" key={i} style={{
        left: `${(i * 47 + 3) % 100}%`, animationDuration: `${duration}s`, animationDelay: `${-duration * ((i * 13 + 5) % 31) / 31}s`,
        "--drift": `${(i % 2 ? 1 : -1) * (30 + i % 5 * 16)}px`, "--flake-size": `${2 + i % 4}px`, "--leaf-turn": `${(i % 2 ? 1 : -1) * 220}deg`,
        "--flutter-duration": `${2.8 + i % 4 * .8}s`, "--flutter-delay": `${-i % 7}s`, "--drop-width": `${i % 3 === 0 ? 1.5 : 1}px`, "--drop-length": `${16 + i % 4 * 6}px`,
      } as CSSProperties}><i /></span>;
    })}
  </div>;
}

/**
 * Composes decorative sky plates, foliage, clouds, seasonal weather and the sky celestial layer behind opaque reading cards.
 * @author meetbyte
 */
export function SiteScenery() {
  return <div id="site-scenery" className="site-scenery" aria-hidden="true">
    <div className="scenery-sky scenery-sky-day" />
    <div className="scenery-sky scenery-sky-night" />
    <div className="scenery-sunset" />
    <div className="scenery-twilight" />
    <div className="scenery-light" />
    <div className="scenery-foliage" />
    <div className="scenery-dapple" />
    <div className="scenery-clouds" />
    <div className="scenery-clouds scenery-clouds-far" />
    <Weather kind="rain" count={72} />
    <Weather kind="snow" count={36} />
    <Weather kind="leaves" count={18} />
    <CelestialBody layer="sky" />
  </div>;
}
