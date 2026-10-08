"use client";

/** Coordinates both native scroll containers without intercepting wheel/touch. @author meetbyte */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/constants/config";

export function ShellMotion() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".content-panel");
    const profile = document.querySelector<HTMLElement>(".profile-card");
    const portrait = document.querySelector<HTMLElement>(".profile-art");
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!main || !profile || !portrait || !header) return;
    const reduced = window.matchMedia(siteConfig.prefersReducedMotionQuery);
    const desktop = window.matchMedia("(min-width: 1051px) and (min-height: 620px)");
    let frame = 0;
    let reveals: IntersectionObserver | undefined;
    let portraitObserver: IntersectionObserver | undefined;
    const targets = [...main.querySelectorAll<HTMLElement>(".detail-section, .skill-category, .project-card, .post-card, .feature-card")];

    // Routed content owns its scroll position; the profile keeps its own state.
    if (previousPath.current !== pathname) {
      main.scrollTop = 0;
      main.focus({ preventScroll: true });
      previousPath.current = pathname;
    }

    const paint = () => {
      frame = 0;
      const internal = desktop.matches;
      header.dataset.scrolled = String(!internal && window.scrollY > 8);
      const scroll = internal ? main.scrollTop : window.scrollY;
      const extent = internal ? main.scrollHeight - main.clientHeight : document.documentElement.scrollHeight - window.innerHeight;
      main.style.setProperty("--reading-progress", String(extent > 0 ? Math.min(1, scroll / extent) : 0));
      // Match the 110px height reduction in CSS; the reserved space keeps scroll geometry stable.
      const shrink = reduced.matches ? 1 : Math.min(1, Math.max(0, profile.scrollTop / 110));
      profile.style.setProperty("--portrait-progress", String(shrink));
      main.style.setProperty("--depth-offset", reduced.matches ? "0px" : `${Math.min(scroll * 0.045, 16)}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };

    const configure = () => {
      reveals?.disconnect();
      portraitObserver?.disconnect();
      targets.forEach((target) => target.classList.remove("motion-target", "is-revealed"));
      if (!reduced.matches && "IntersectionObserver" in window) {
        const root = desktop.matches ? main : null;
        const bounds = root?.getBoundingClientRect();
        reveals = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            reveals?.unobserve(entry.target);
          });
        }, { root, threshold: 0.06 });
        targets.forEach((target, index) => {
          // Already visible content stays visible; enhancements never hide it on load.
          if (target.getBoundingClientRect().top >= (bounds?.bottom ?? window.innerHeight)) {
            target.classList.add("motion-target");
            target.style.setProperty("--reveal-delay", `${(index % 3) * 45}ms`);
            reveals!.observe(target);
          }
        });
      }
      if ("IntersectionObserver" in window) {
        portraitObserver = new IntersectionObserver(([entry]) => {
          header.dataset.portraitDocked = String(!entry.isIntersecting && !desktop.matches);
        }, { rootMargin: "-94px 0px 0px 0px" });
        portraitObserver.observe(portrait);
      }
      schedule();
    };
    configure();
    // Passive listeners only schedule one paint per frame. No React scroll renders.
    main.addEventListener("scroll", schedule, { passive: true });
    profile.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", configure);
    reduced.addEventListener("change", configure);
    desktop.addEventListener("change", configure);
    const resize = new ResizeObserver(schedule);
    resize.observe(main);
    return () => {
      cancelAnimationFrame(frame);
      reveals?.disconnect(); portraitObserver?.disconnect(); resize.disconnect();
      main.removeEventListener("scroll", schedule); profile.removeEventListener("scroll", schedule);
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", configure);
      reduced.removeEventListener("change", configure); desktop.removeEventListener("change", configure);
      targets.forEach((target) => target.classList.remove("motion-target", "is-revealed"));
    };
  }, [pathname]);
  return null;
}
