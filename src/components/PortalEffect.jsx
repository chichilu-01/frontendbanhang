import { useUniverse } from "../context/UniverseToggleContext";
import { useEffect, useState } from "react";

export default function PortalEffect() {
  const { enabled } = useUniverse();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (enabled) {
      setShow(true);
      const timeout = setTimeout(() => setShow(false), 2000); // hiệu ứng 2s
      return () => clearTimeout(timeout);
    }
  }, [enabled]);

  if (!show) return null;

  return (
    <div className="portal-overlay fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
      <div className="portal-circle" />
    </div>
  );
}
