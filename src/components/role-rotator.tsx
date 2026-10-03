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
      if (media.matches) {
        setIndex(0);
      } else {
        timer = window.setInterval(() => setIndex((value) => (value + 1) % roles.length), siteConfig.roleRotationMs);
      }
    };
    syncMotion();
    media.addEventListener("change", syncMotion);
    // Remove the listener and timer when this component unmounts.
    return () => { window.clearInterval(timer); media.removeEventListener("change", syncMotion); };
  }, [roles]);

  return <span className="role-rotator" aria-label={roles[0]}><span key={index} className="role-rotator-text" aria-hidden="true">{roles[index]}</span></span>;
}
