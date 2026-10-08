/**
 * @file Optional network hints only; HTML remains usable without this API.
 * @author meetbyte
 */
export const sceneryVisitStorageKey = "meetbyte-full-scenery-visit";
export type ConnectionHints = { saveData?: boolean; effectiveType?: string; downlink?: number; rtt?: number };
/**
 * Classifies offline, Data Saver, slow network, low bandwidth or high latency hints without requiring browser hint support.
 * @author meetbyte
 */
export function isLimitedConnection(online: boolean, hints?: ConnectionHints): boolean {
  return !online || hints?.saveData === true || ["slow-2g", "2g", "3g"].includes(hints?.effectiveType ?? "") ||
    (typeof hints?.downlink === "number" && hints.downlink > 0 && hints.downlink < 1) || (hints?.rtt ?? 0) >= 500;
}
/**
 * Creates the before-paint connection/scenery bootstrap, honoring a per-tab full-artwork override when storage is available.
 * @author meetbyte
 */
export function createConnectionBootstrapScript(): string {
  return `(() => { const c = navigator.connection; const limited = navigator.onLine === false || !!c && (c.saveData === true || ['slow-2g','2g','3g'].includes(c.effectiveType) || c.downlink > 0 && c.downlink < 1 || c.rtt >= 500); let full = false; try { full = sessionStorage.getItem(${JSON.stringify(sceneryVisitStorageKey)}) === 'full'; } catch {} const root = document.documentElement; root.dataset.connection = limited ? 'limited' : 'normal'; root.dataset.scenery = limited && !full ? 'light' : 'full'; })();`;
}
