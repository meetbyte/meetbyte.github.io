"use client";

/**
 * @file Animated profile role text with reduced-motion support.
 * @author meetbyte
 */
import { useEffect, useState } from "react";
import { siteConfig } from "@/constants/config";

/**
 * Cycles through profile roles unless the visitor prefers reduced motion.
 * @param roles - Non-empty list of role labels to display.
 * @returns The current visual role and a stable accessible label.
 * @author meetbyte
 */
export function RoleRotator({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length === 0) return;
    const media = window.matchMedia(siteConfig.prefersReducedMotionQuery);
    let timer: number | undefined;
    /**
     * Starts or stops the timer when the motion preference changes.
     * @author meetbyte
     */
    const syncMotion = () => {
      window.clearInterval(timer);
      const paused = media.matches || document.hidden || document.documentElement.dataset.sceneryMotion !== "playing" || document.documentElement.dataset.connection === "limited";
      if (!paused) {
        timer = window.setInterval(() => setIndex((value) => (value + 1) % roles.length), siteConfig.roleRotationMs);
      }
    };
    syncMotion();
    media.addEventListener("change", syncMotion);
    const observer = new MutationObserver(syncMotion);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-scenery-motion", "data-connection"] });
    document.addEventListener("visibilitychange", syncMotion);
    // Remove the listener and timer when this component unmounts.
    return () => { window.clearInterval(timer); observer.disconnect(); media.removeEventListener("change", syncMotion); document.removeEventListener("visibilitychange", syncMotion); };
  }, [roles]);

  return <span id="profile-roles" className="role-rotator"><span className="sr-only">{roles.join(" · ")}</span><span key={index} className="role-rotator-text" aria-hidden="true">{roles[index]}</span></span>;
}
