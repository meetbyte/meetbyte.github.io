"use client";

/** Keep reading available while navigation or optional artwork is slow. @author meetbyte */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { isLimitedConnection, sceneryVisitStorageKey, type ConnectionHints } from "@/lib/connection";

const ConnectionContext = createContext({ limited: false, offline: false, light: false, ready: false,
  showScenery: () => {}, begin: (href: string) => { void href; }, hold: (href: string) => { void href; } });
export const useConnection = () => useContext(ConnectionContext);

export function ConnectionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState({ limited: false, offline: false, light: false, ready: false });
  const fullScenery = useRef(false);
  const [destination, setDestination] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [stalled, setStalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const path = useRef(pathname);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: ConnectionHints & EventTarget }).connection;
    try { fullScenery.current = sessionStorage.getItem(sceneryVisitStorageKey) === "full"; } catch {}
    const synchronize = () => {
      const offline = navigator.onLine === false;
      const limited = isLimitedConnection(!offline, connection);
      const light = limited && !fullScenery.current;
      document.documentElement.dataset.connection = limited ? "limited" : "normal";
      document.documentElement.dataset.scenery = light ? "light" : "full";
      setState({ limited, offline, light, ready: true });
      setDismissed(false);
    };
    synchronize();
    connection?.addEventListener?.("change", synchronize);
    window.addEventListener("online", synchronize); window.addEventListener("offline", synchronize);
    return () => { connection?.removeEventListener?.("change", synchronize); window.removeEventListener("online", synchronize); window.removeEventListener("offline", synchronize); };
  }, []);

  useEffect(() => {
    if (path.current === pathname) return;
    path.current = pathname; setDestination(null); setVisible(false); setStalled(false);
  }, [pathname]);
  useEffect(() => {
    if (!destination || state.offline) return;
    const feedback = window.setTimeout(() => setVisible(true), 300);
    const fallback = window.setTimeout(() => setStalled(true), 3000);
    return () => { window.clearTimeout(feedback); window.clearTimeout(fallback); };
  }, [destination, state.offline]);

  function showScenery() {
    fullScenery.current = true;
    try { sessionStorage.setItem(sceneryVisitStorageKey, "full"); } catch {}
    document.documentElement.dataset.scenery = "full";
    setState((current) => ({ ...current, light: false }));
  }
  function begin(href: string) {
    if (href.split("#")[0] === pathname) return;
    setDestination(href); setVisible(false); setStalled(false); setDismissed(false);
  }
  function hold(href: string) { setDestination(href); setVisible(true); setDismissed(false); }

  return <ConnectionContext.Provider value={{ ...state, showScenery, begin, hold }}>
    {children}
    {!dismissed && (state.offline || visible && destination) && <div className="connection-notice">
      <span role="status">{state.offline ? "You’re offline. You can keep reading this page." : "Opening page…"}</span>
      {destination && (state.offline || stalled) && <button type="button" disabled={state.offline} onClick={() => window.location.assign(destination)}>{state.offline ? "Waiting for connection" : "Open page directly"}</button>}
      <button type="button" aria-label="Dismiss connection notice" onClick={() => setDismissed(true)}>Dismiss</button>
    </div>}
  </ConnectionContext.Provider>;
}

export function SceneryQualityControl() {
  const connection = useConnection();
  if (!connection.ready || !connection.light) return null;
  return <button type="button" className="scenery-quality-control" onClick={connection.showScenery}>Load full scenery</button>;
}
