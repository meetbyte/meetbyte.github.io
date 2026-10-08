/**
 * @file Sun/moon travel and accessible sunset palettes.
 * @author meetbyte
 */
import type { Theme } from "./theme";

type RGB = [number, number, number];
/**
 * Interpolates one numeric value between two endpoints for the current journey progress.
 * @author meetbyte
 */
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
/**
 * Converts a six-digit hexadecimal colour into its red, green and blue channel values.
 * @author meetbyte
 */
const rgb = (hex: string): RGB => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as RGB;
/**
 * Encodes rounded RGB channels as a six-digit hexadecimal colour.
 * @author meetbyte
 */
const hex = (color: RGB) => "#" + color.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
/**
 * Interpolates two hexadecimal colours channel by channel for intermediate journey palettes.
 * @author meetbyte
 */
const blend = (a: string, b: string, t: number) => hex(rgb(a).map((v, i) => mix(v, rgb(b)[i], t)) as RGB);

/**
 * Computes sRGB relative luminance for foreground/background contrast evaluation.
 * @author meetbyte
 */
export function luminance(color: string): number {
  const values = rgb(color).map((v) => { const n = v / 255; return n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4; });
  return .2126 * values[0] + .7152 * values[1] + .0722 * values[2];
}
/**
 * Returns the relative-luminance contrast ratio between two hexadecimal colours.
 * @author meetbyte
 */
export function contrast(a: string, b: string): number {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}
/**
 * Keeps the desired foreground when readable on every supplied surface, otherwise selects the stronger black/white alternative.
 * @author meetbyte
 */
function readable(desired: string, backgrounds: string[]): string {
  const score = (color: string) => Math.min(...backgrounds.map((bg) => contrast(color, bg)));
  if (score(desired) >= 4.5) return desired;
  return score("#000000") >= score("#ffffff") ? "#000000" : "#ffffff";
}

const stops = [
  { at: 0, colors: ["#f8f5ee", "#fcfaf6", "#f3f0e9", "#e9e5dd", "#263340", "#52616a", "#596872", "#496a86", "#365571", "#a55f4d", "#ffffff", "#dcddd9", "#fffdf4", "#cdd6dc", "#d5dcdd", "#fff4d9", "#ffe5a0"] },
  { at: .3, colors: ["#edc697", "#fff2df", "#f6e2cd", "#f1d6bc", "#3b2730", "#60404a", "#634650", "#784749", "#653848", "#a25440", "#ffffff", "#dcbca9", "#fff4d1", "#d4a99b", "#d2aaa2", "#ffdbb7", "#ffb47c"] },
  { at: .52, colors: ["#b47499", "#edd6e5", "#e1c3d9", "#d6b0cc", "#36243c", "#573856", "#5e3b5a", "#6e426d", "#60365f", "#955965", "#ffffff", "#c7a6c1", "#f7d8e8", "#b586b6", "#a981a8", "#f2c3d8", "#f5a3ca"] },
  { at: .74, colors: ["#32243f", "#35273f", "#402f4e", "#503c5c", "#fff7fb", "#efdced", "#d7b8d6", "#c59ad1", "#e6c8ec", "#e7adab", "#201b28", "#735276", "#9d7ba8", "#b08dbd", "#45304e", "#68436c", "#d6b8f1"] },
  { at: 1, colors: ["#0d1725", "#202936", "#273343", "#304053", "#f6f2eb", "#d4dee8", "#a6b4c2", "#a5bed5", "#c0d3e2", "#dea38d", "#17222b", "#3e4b59", "#61778e", "#768ba1", "#25374b", "#28394d", "#c6dfff"] },
] as const;
const keys = ["page", "surface", "surface-quiet", "surface-hover", "ink", "ink-soft", "ink-muted", "accent", "accent-deep", "clay", "button-ink", "line", "card-edge-top", "card-edge-right", "card-edge-bottom", "card-edge-left", "celestial-glow"];

/**
 * Interpolates theme stops and resolves readable card, chrome and button colours across the light/dark crossover.
 * @author meetbyte
 */
export function journeyPalette(progress: number): Record<string, string> {
  const p = Math.max(0, Math.min(1, progress));
  let index = stops.findIndex((stop) => stop.at >= p);
  index = Math.max(1, index);
  const a = stops[index - 1], b = stops[index];
  const t = (p - a.at) / (b.at - a.at);
  const palette = Object.fromEntries(keys.map((key, i) => [key, blend(a.colors[i], b.colors[i], t)]));
  let backgrounds = [palette.surface, palette["surface-quiet"], palette["surface-hover"]];
  // Around the light/dark crossover, use one surface tone so a single text
  // colour can meet AA on every reading surface without a low-contrast fade.
  if (Math.max(...["#000000", "#ffffff"].map((fg) => Math.min(...backgrounds.map((bg) => contrast(fg, bg))))) < 4.5) {
    palette["surface-quiet"] = palette["surface-hover"] = palette.surface;
    backgrounds = [palette.surface];
  }
  for (const key of ["ink", "ink-soft", "ink-muted", "accent", "accent-deep", "clay"]) palette[key] = readable(palette[key], backgrounds);
  palette["chrome-ink"] = readable(palette["ink-soft"], [palette.page]);
  palette["accent-soft"] = palette["surface-quiet"];
  const buttonBackgrounds = [palette.accent, palette["accent-deep"]];
  if (Math.max(...["#000000", "#ffffff"].map((fg) => Math.min(...buttonBackgrounds.map((bg) => contrast(fg, bg))))) < 4.5) palette.accent = palette["accent-deep"];
  palette["button-ink"] = readable(palette["button-ink"], [palette.accent, palette["accent-deep"]]);
  palette.shadow = `${mix(12, -12, p).toFixed(2)}px ${mix(22, 25, p).toFixed(2)}px ${mix(62, 75, p).toFixed(2)}px rgba(0, 0, 0, ${mix(.12, .32, p).toFixed(3)})`;
  palette["card-rim"] = `inset ${mix(1, -1, p).toFixed(3)}px 1px 0 ${palette["celestial-glow"]}66`;
  return palette;
}

export interface JourneyClock {
  now(): number;
  request(callback: FrameRequestCallback): number;
  cancel(id: number): void;
}
/**
 * Controls interruptible sun/moon travel and CSS palette overrides; exposes instant finish/disposal paths for reduced motion and cleanup.
 * @author meetbyte
 */
export function createThemeJourney(root: Pick<HTMLElement, "dataset" | "style">, reduced: () => boolean, clock: JourneyClock = {
  now: () => performance.now(), request: (callback) => requestAnimationFrame(callback), cancel: (id) => cancelAnimationFrame(id),
}) {
  let progress = root.dataset.theme === "dark" ? 1 : 0;
  let target = progress;
  let frame = 0;
  let overrides: string[] = [];
  const paint = () => {
    root.style.setProperty("--night-progress", String(progress));
    root.style.setProperty("--celestial-bend", Math.sin(progress * Math.PI).toFixed(5));
    // Dip beneath the real opaque cards. The texture changes in the hidden
    // middle of the orbit, so the emerging body is already the other light.
    root.style.setProperty("--celestial-arc-progress", Math.sin(progress * Math.PI).toFixed(5));
    const phase = Math.max(0, Math.min(1, (progress - .32) / .36));
    root.style.setProperty("--lunar-phase", String(phase * phase * (3 - 2 * phase)));
    root.style.setProperty("--sunset-opacity", String(Math.max(0, 1 - Math.abs(progress - .32) / .32) * .65));
    root.style.setProperty("--twilight-opacity", String(Math.max(0, 1 - Math.abs(progress - .66) / .34) * .65));
    if (!root.dataset.celestialTravel) return;
    const palette = journeyPalette(progress);
    overrides = Object.keys(palette);
    for (const [key, value] of Object.entries(palette)) root.style.setProperty("--" + key, value);
  };
  const finish = () => {
    clock.cancel(frame); frame = 0; progress = target;
    delete root.dataset.celestialTravel;
    for (const key of overrides) root.style.removeProperty("--" + key);
    overrides = [];
    paint();
  };
  paint();
  return {
    go(theme: Theme) {
      clock.cancel(frame);
      const from = progress;
      target = theme === "dark" ? 1 : 0;
      root.dataset.theme = theme;
      if (reduced() || Math.abs(target - from) < .001) { finish(); return; }
      root.dataset.celestialTravel = theme;
      const start = clock.now();
      const duration = Math.max(650, Math.abs(target - from) * 2800);
      paint();
      const step: FrameRequestCallback = () => {
        const time = Math.min(1, (clock.now() - start) / duration);
        progress = mix(from, target, time * time * (3 - 2 * time));
        paint();
        if (time >= 1) finish(); else frame = clock.request(step);
      };
      frame = clock.request(step);
    },
    finish,
    dispose: finish,
  };
}
