import { useEffect, useState } from "react";
import type { DemoRole } from "./demo-data";

const KEY = "ha-demo-role";
export function useDemoRole() {
  const [role, setRoleState] = useState<DemoRole | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => { setRoleState(sessionStorage.getItem(KEY) as DemoRole | null); setReady(true); }, []);
  const setRole = (r: DemoRole | null) => {
    if (r) sessionStorage.setItem(KEY, r); else sessionStorage.removeItem(KEY);
    setRoleState(r);
  };
  return { role, setRole, ready };
}
