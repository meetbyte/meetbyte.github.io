"use client";

/**
 * @file A visit-scoped preview; Auto returns immediately to India's visual calendar.
 * @author meetbyte
 */
import { useEffect, useRef, useState } from "react";
import { parseSeasonChoice, readVisitSeason, resolveSeason, saveVisitSeason, seasonChoiceEvent, type SeasonChoice } from "@/lib/season";

/** Preview control reused by the optional header disclosure. @author meetbyte */
export function SeasonPicker() {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<SeasonChoice>("auto");
  useEffect(() => { setChoice(readVisitSeason()); setReady(true); }, []);

  function choose(value: string) {
    const next = parseSeasonChoice(value);
    setChoice(next);
    saveVisitSeason(next);
    const root = document.documentElement;
    root.dataset.seasonChoice = next;
    root.dataset.season = next === "auto" ? resolveSeason() : next;
    window.dispatchEvent(new Event(seasonChoiceEvent));
  }

  return <label className="season-picker">
    <span>Season</span>
    <select disabled={!ready} value={choice} onChange={(event) => choose(event.target.value)} aria-controls="site-scenery" title="Preview a season, or follow the calendar with Auto">
      <option value="auto">Auto</option>
      <option value="summer">Summer</option>
      <option value="monsoon">Monsoon</option>
      <option value="autumn">Autumn</option>
      <option value="winter">Winter</option>
    </select>
  </label>;
}

/** A compact optional preview; opening it never changes the header height. @author meetbyte */
export function SeasonPreview() {
  const disclosure = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !disclosure.current?.open) return;
      disclosure.current.open = false;
      disclosure.current.querySelector("summary")?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (disclosure.current?.open && event.target instanceof Node && !disclosure.current.contains(event.target)) {
        disclosure.current.open = false;
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, []);

  return (
    <details ref={disclosure} className="season-preview" suppressHydrationWarning>
      <summary className="season-preview-toggle" aria-label="Preview season">Season</summary>
      <div className="season-preview-panel"><SeasonPicker /></div>
    </details>
  );
}
