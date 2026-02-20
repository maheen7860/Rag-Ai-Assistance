import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBg() {
  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={init}
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 40 },
          color: { value: "#00d4ff" },
          opacity: { value: 0.2 },
          size: { value: 2 },
          move: { enable: true, speed: 0.3 },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
}