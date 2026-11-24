import { useEffect, useRef } from "react";

const GLYPHS = "01ABCDEF<>/{}[]$#%&*+=-_;:".split("");
const FONT_SIZE = 16;

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* Matrix-style code rain, kept to the screen edges so content stays readable */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let frame = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE - 2}px "JetBrains Mono", monospace`;
      drops = Array.from({ length: Math.ceil(width / FONT_SIZE) }, () =>
        Math.random() < 0.4 ? Math.random() * -40 : -1000,
      );
    };

    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (document.hidden || time - last < 55) return;
      last = time;

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] < -500) {
          if (Math.random() < 0.004) drops[i] = 0;
          continue;
        }
        const y = drops[i] * FONT_SIZE;
        if (y >= 0) {
          const glyph = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          ctx.fillStyle = Math.random() < 0.08 ? "rgba(62,198,255,0.95)" : "rgba(61,255,154,0.9)";
          ctx.fillText(glyph, i * FONT_SIZE, y);
        }
        drops[i] += 1;
        if (y > height && Math.random() > 0.975) {
          drops[i] = Math.random() < 0.5 ? 0 : -1000;
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* Soft glow that follows the cursor */
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${event.clientX - 260}px, ${event.clientY - 260}px, 0)`;
        glow.style.opacity = "1";
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-bg-primary" />

      {/* Code rain (edges only on larger screens) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-[0.16] md:opacity-[0.3] [mask-image:linear-gradient(90deg,#000_0%,transparent_26%,transparent_74%,#000_100%)]"
      />

      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_85%)]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(62,198,255,0.55) 1px, transparent 1px),
            linear-gradient(90deg, rgba(62,198,255,0.55) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Fine green grid, drifting */}
      <div
        className="absolute -inset-3 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(61,255,154,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,255,154,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "14px 14px",
          animation: "grid-drift 40s linear infinite",
        }}
      />

      {/* Scanning beam */}
      <div className="absolute inset-x-0 top-0 h-40 animate-scan will-change-transform">
        <div className="h-full bg-gradient-to-b from-transparent via-primary/[0.035] to-transparent" />
        <div className="absolute bottom-1/2 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050a08_92%)]" />

      {/* Ambient glows */}
      <div className="absolute top-[-12%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/[0.05] rounded-full blur-[140px]" />
      <div className="absolute bottom-[-8%] right-[-10%] w-[700px] h-[500px] bg-accent-blue/[0.04] rounded-full blur-[120px]" />

      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform bg-[radial-gradient(circle,rgba(61,255,154,0.07),transparent_65%)]"
      />

      {/* HUD corner brackets */}
      <span className="absolute top-20 left-4 w-5 h-5 border-t border-l border-primary/25 hidden md:block" />
      <span className="absolute top-20 right-4 w-5 h-5 border-t border-r border-primary/25 hidden md:block" />
      <span className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-primary/25 hidden md:block" />
      <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-primary/25 hidden md:block" />

      <style>{`
        @keyframes grid-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(14px, 14px); }
        }
      `}</style>
    </div>
  );
}
