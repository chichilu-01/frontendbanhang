import { useUniverse } from "../context/UniverseToggleContext";

export default function UniverseEffects() {
  const { enabled } = useUniverse();

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 galaxy-bg" />
      <div className="shooting-star" />
      <div className="planet-orbit">
        <div className="planet" />
      </div>
    </div>
  );
}
