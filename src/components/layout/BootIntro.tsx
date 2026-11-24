import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const WIDTH = 37;

const BOOT_LINES = [
  "Loading Kernel",
  "Initializing AI Modules",
  "Loading Cybersecurity Engine",
  "Starting Network Services",
  "Checking Secure Connection",
  "Initializing Portfolio",
];

const STEP = 0.1; // seconds between lines
const TOTAL_LINES = BOOT_LINES.length + 2;
/** The intro stays on screen for about a second, then fades out. */
const INTRO_MS = Math.round((TOTAL_LINES * STEP + 0.45) * 1000);

export function BootIntro({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setTimeout(onDone, reduceMotion ? 0 : INTRO_MS);
    return () => clearTimeout(id);
  }, [onDone, reduceMotion]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="crt w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-bg-secondary px-5 py-10 font-mono text-[11.5px] leading-[2.3] text-primary shadow-[0_0_60px_-18px_rgba(61,255,154,0.35)] sm:px-11 sm:py-14 sm:text-[15px] sm:leading-[2.6]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0 }}
        >
          Booting Kali Linux...
        </motion.p>

        {BOOT_LINES.map((label, i) => (
          <motion.p
            key={label}
            className="whitespace-pre"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (i + 1) * STEP, duration: 0.15 }}
          >
            {label.padEnd(WIDTH, ".")}
            <span className="text-primary">[ OK ]</span>
          </motion.p>
        ))}

        <motion.p
          className="[text-shadow:0_0_14px_rgba(61,255,154,0.6)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (BOOT_LINES.length + 1) * STEP, duration: 0.15 }}
        >
          Access Granted.
          <span className="ml-1 inline-block h-[1.1em] w-[0.55em] translate-y-[3px] bg-primary animate-blink" />
        </motion.p>
      </div>
    </motion.div>
  );
}
