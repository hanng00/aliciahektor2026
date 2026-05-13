"use client";

import { useEffect, useRef } from "react";

type CubeName = "Jeppesen" | "Lennertun";

type Cube = {
  name: CubeName;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

const SIZE = 110;
const SPEED = 90;

const initialCubes = (): Cube[] => [
  { name: "Jeppesen",  x: 40,  y: 80,  vx:  SPEED,        vy:  SPEED * 0.7,  size: SIZE },
  { name: "Lennertun", x: 300, y: 200, vx: -SPEED * 0.8,  vy:  SPEED,        size: SIZE },
  { name: "Jeppesen",  x: 600, y: 400, vx:  SPEED * 0.6,  vy: -SPEED * 0.9,  size: SIZE },
  { name: "Lennertun", x: 150, y: 500, vx: -SPEED,        vy: -SPEED * 0.6,  size: SIZE },
];

export default function BouncingCubes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubesRef = useRef<HTMLDivElement[]>([]);
  const stateRef = useRef<Cube[]>(initialCubes());

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const w = window.innerWidth;
      const h = window.innerHeight;

      stateRef.current.forEach((c, i) => {
        c.x += c.vx * dt;
        c.y += c.vy * dt;

        if (c.x <= 0) { c.x = 0; c.vx = Math.abs(c.vx); }
        if (c.y <= 0) { c.y = 0; c.vy = Math.abs(c.vy); }
        if (c.x + c.size >= w) { c.x = w - c.size; c.vx = -Math.abs(c.vx); }
        if (c.y + c.size >= h) { c.y = h - c.size; c.vy = -Math.abs(c.vy); }

        const el = cubesRef.current[i];
        if (el) el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[5] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {stateRef.current.map((c, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) cubesRef.current[i] = el;
          }}
          className="absolute top-0 left-0"
          style={{ width: c.size, height: c.size, willChange: "transform" }}
        >
          <div
            className="cube-scene"
            style={{ ["--cube-size" as string]: `${c.size}px` } as React.CSSProperties}
          >
            <div className="cube">
              <div className="cube-face cube-face-front">{c.name}</div>
              <div className="cube-face cube-face-back">{c.name}</div>
              <div className="cube-face cube-face-right">{c.name}</div>
              <div className="cube-face cube-face-left">{c.name}</div>
              <div className="cube-face cube-face-top">{c.name}</div>
              <div className="cube-face cube-face-bottom">{c.name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
