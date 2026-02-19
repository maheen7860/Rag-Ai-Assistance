import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBg() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      init={particlesInit}
      options={{
        background: { color: { value: "transparent" } },
        particles: {
          number: { value: 60 },
          size: { value: 2 },
          move: {
            enable: true,
            speed: 1,
          },
          links: {
            enable: true,
            distance: 120,
            color: "#9333ea",
            opacity: 0.4,
          },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
}
