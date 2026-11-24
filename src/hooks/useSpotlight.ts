import { useEffect } from "react";

/**
 * Tracks the pointer over any element that has a spotlight style
 * (.glass-hover, .repo-card, .gradient-border, .spot) and publishes the
 * cursor position as --mx / --my so CSS can paint a radial glow under it.
 * One document-level listener, no React re-renders.
 */
const SELECTOR = ".glass-hover, .repo-card, .gradient-border, .spot";

export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(SELECTOR);
      if (!target) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        target.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
}
