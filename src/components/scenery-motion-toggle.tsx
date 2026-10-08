"use client";

/** Pause decorative motion without changing the chosen day/night theme. @author meetbyte */
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/constants/config";
import { resolveSceneryMotion, sceneryMotionStorageKey } from "@/lib/scenery-motion";
import { Icon } from "./icons";

export function SceneryMotionToggle() {
  const preference = useRef(false);
  const [state, setState] = useState({ paused: false, reduced: false, ready: false });

  useEffect(() => {
    const media = window.matchMedia(siteConfig.prefersReducedMotionQuery);
    try { preference.current = localStorage.getItem(sceneryMotionStorageKey) === "paused"; } catch {}
    const synchronize = () => {
      document.documentElement.dataset.sceneryMotion = resolveSceneryMotion(preference.current ? "paused" : null, media.matches);
      setState({ paused: preference.current, reduced: media.matches, ready: true });
    };
    synchronize();
    media.addEventListener("change", synchronize);
    return () => media.removeEventListener("change", synchronize);
  }, []);

  function toggle() {
    preference.current = !preference.current;
    const saved = preference.current ? "paused" : "playing";
    document.documentElement.dataset.sceneryMotion = resolveSceneryMotion(saved, state.reduced);
    setState({ ...state, paused: preference.current });
    try { localStorage.setItem(sceneryMotionStorageKey, saved); } catch {}
  }

  const paused = state.paused || state.reduced;
  const label = state.reduced ? "Reduced motion" : paused ? "Resume motion" : "Pause motion";
  return (
    <button type="button" className="scenery-motion-toggle" onClick={toggle} disabled={state.reduced || !state.ready} aria-controls="site-scenery profile-roles" title={state.reduced ? "Movement follows your reduced motion preference" : label}>
      <Icon name={paused ? "play" : "pause"} size={12} />
      <span>{label}</span>
    </button>
  );
}
