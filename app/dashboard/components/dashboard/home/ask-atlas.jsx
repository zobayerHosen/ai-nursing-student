"use client";

import { BiSolidMicrophone } from "react-icons/bi";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AskAtlas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const CSS_W = 620;
    const CSS_H = 260;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = CSS_W * dpr;
    canvas.height = CSS_H * dpr;
    canvas.style.width = CSS_W + "px";
    canvas.style.height = CSS_H + "px";

    ctx.scale(dpr, dpr);

    const centerY = CSS_H / 2;
    const centerX = CSS_W / 2;

    // 🔥 Global animation speed
    // 1 = original
    // 0.5 = 2x slower
    // 0.2 = 5x slower
    // 0.1 = 10x slower
    const ANIMATION_SPEED = 0.5;

    // Eye/lens envelope
    const envelope = (x) => {
      const t = (x - centerX) / (CSS_W / 2);
      const clamped = Math.max(-1, Math.min(1, t));
      return Math.sqrt(Math.max(0, 1 - clamped * clamped));
    };

    const strands = [
      {
        freq: 0.028,
        amp: 46,
        phase: 0,
        speed: 0.0011,
        color: [56, 214, 255],
        size: 1.3,
        density: 2.1,
      },
      {
        freq: 0.021,
        amp: 34,
        phase: 1.7,
        speed: -0.0008,
        color: [110, 140, 255],
        size: 1.1,
        density: 2.4,
      },
      {
        freq: 0.034,
        amp: 28,
        phase: 3.1,
        speed: 0.0009,
        color: [190, 110, 255],
        size: 1.1,
        density: 2.6,
      },
      {
        freq: 0.017,
        amp: 52,
        phase: 4.4,
        speed: -0.0006,
        color: [80, 190, 255],
        size: 1.4,
        density: 1.9,
      },
      {
        freq: 0.04,
        amp: 20,
        phase: 2.2,
        speed: 0.0012,
        color: [210, 130, 255],
        size: 0.9,
        density: 3.0,
      },
      {
        freq: 0.024,
        amp: 38,
        phase: 5.4,
        speed: -0.0009,
        color: [70, 160, 255],
        size: 1.0,
        density: 2.2,
      },
    ];

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, CSS_W, CSS_H);

      strands.forEach((s) => {
        for (let x = 0; x <= CSS_W; x += s.density) {
          const env = envelope(x);
          if (env <= 0.01) continue;

          const y =
            centerY +
            Math.sin(
              x * s.freq +
              s.phase +
              t * (s.speed * 60 * ANIMATION_SPEED)
            ) *
            s.amp *
            env +
            Math.sin(
              x * s.freq * 2.3 +
              s.phase * 1.6 +
              t * 0.004 * ANIMATION_SPEED
            ) *
            6 *
            env;

          // Dust jitter
          const jitter =
            (Math.sin(
              x * 12.9898 +
              s.phase * 78.233 +
              Math.floor(t * 1.5 * ANIMATION_SPEED)
            ) *
              43758.5453) %
            1;

          const jy = y + jitter * 5 * env;

          const alpha = 0.15 + env * 0.55;
          const [r, g, b] = s.color;

          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.arc(
            x,
            jy,
            s.size * (0.5 + env * 0.8),
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      });

      t += ANIMATION_SPEED;

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Link
      href="/dashboard/my-tutor"
      className="w-full"
    >
      <section className="relative flex h-85 w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-[#12142c]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-65 w-125 rounded-full bg-cyan-500/5 blur-[100px]" />
        </div>

        {/* Orb + Wave */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: 400, height: 260 }}
        >
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          {/* Ellipse */}
          <div className="absolute left-1/2 top-1/2 h-57.5 w-95 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />

            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(10,12,30,0.35) 0%, rgba(10,12,30,0.05) 60%, rgba(10,12,30,0) 75%)",
              }}
            />

            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow:
                  "0 0 12px 2px rgba(45,212,255,.55),0 0 40px 6px rgba(45,212,255,.25),inset 0 0 25px rgba(45,212,255,.25)",
              }}
            />
          </div>
        </div>

        <p className="text-lg  tracking-wide text-cyan-200">
          Ask Atlas anything
        </p>

        <button className="cursor-pointer flex h-10 w-10  transition-transform duration-300 hover:scale-110">
          <BiSolidMicrophone
            className="h-8 w-8 text-[#00d1f19d]"
          />
        </button>
      </section>
    </Link>
  );
}