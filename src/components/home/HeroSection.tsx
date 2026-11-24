import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { hero, personal } from "../../data/personal";
import { useTypingEffect } from "../../hooks/useTypingEffect";
import { Button } from "../ui/Button";

// Drop your photo into /public named profile.webp, .jpg, .jpeg or .png
const profileSources = ["webp", "jpg", "jpeg", "png"].map(
  (ext) => `${import.meta.env.BASE_URL}profile.${ext}`,
);

/** One "Loading ........ 100%" boot line that counts up, then hands over. */
function BootLine({ label, onDone }: { label: string; onDone: () => void }) {
  const reduceMotion = useReducedMotion();
  const [percent, setPercent] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (reduceMotion) {
      setPercent(100);
      const id = setTimeout(() => doneRef.current(), 60);
      return () => clearTimeout(id);
    }

    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const start = performance.now();
    const duration = 650;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setPercent(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(() => doneRef.current(), 160);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [reduceMotion]);

  return (
    <motion.p
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex whitespace-nowrap my-[7px]"
    >
      <span>{label}</span>
      <span className="flex-1 overflow-hidden text-text-muted/60" aria-hidden="true">
        {".".repeat(90)}
      </span>
      <span
        className={`w-[4ch] text-right tabular-nums transition-colors ${
          percent === 100 ? "text-primary" : "text-text-muted"
        }`}
      >
        {percent}%
      </span>
    </motion.p>
  );
}

function TerminalContent() {
  const { displayed, isComplete } = useTypingEffect(hero.command, {
    speed: 115,
    delay: 450,
  });
  const [bootStep, setBootStep] = useState(0);

  useEffect(() => {
    if (!isComplete) return;
    const id = setTimeout(() => setBootStep(1), 450);
    return () => clearTimeout(id);
  }, [isComplete]);

  const advance = () => setBootStep((s) => s + 1);
  const granted = bootStep > hero.boot.length;

  return (
    <>
      <div>
        <span className="text-primary">└─$</span>{" "}
        <span className="inline-block min-h-[1.5em] text-[#f2f8f3]">{displayed}</span>
        {!granted && (
          <span
            className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[3px] bg-primary animate-blink"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="mt-[22px] min-h-[8.6em] text-[#c4d2c8]">
        {hero.boot.map(
          (label, i) =>
            bootStep > i && (
              <BootLine
                key={label}
                label={label}
                onDone={bootStep === i + 1 ? advance : () => undefined}
              />
            ),
        )}
        {granted && (
          <motion.p
            initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="mt-4 font-bold text-primary [text-shadow:0_0_14px_rgba(61,255,154,0.55)]"
          >
            ✔ Access Granted
          </motion.p>
        )}
      </div>
    </>
  );
}

function BootTerminal({ ready }: { ready: boolean }) {
  return (
    <div
      className="crt overflow-hidden rounded-[14px] border border-border bg-[linear-gradient(145deg,#0c1712,#070d0a)] animate-glow-pulse transition-colors hover:border-primary/40"
    >
      <div className="flex h-[38px] items-center gap-2 border-b border-border bg-[#0f1c15] px-[15px]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff625c]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffc247]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#39d878]" />
      </div>

      <div className="px-[14px] py-[18px] font-mono text-[.78rem] font-medium leading-[1.9] min-[521px]:px-[26px] min-[521px]:pb-[27px] min-[521px]:pt-6 min-[521px]:text-[.96rem]">
        <div className="text-primary">
          ┌──({personal.terminalUser}㉿{personal.terminalHost})-[~]
        </div>
        <div className="min-h-[calc(10.5em+22px)]">
          {ready ? (
            <TerminalContent />
          ) : (
            <div>
              <span className="text-primary">└─$</span>{" "}
              <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[3px] bg-primary animate-blink" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileCard() {
  const [sourceIndex, setSourceIndex] = useState(0);
  const imageFailed = sourceIndex >= profileSources.length;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), {
    stiffness: 180,
    damping: 18,
  });

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="spot relative w-[min(100%,360px)] overflow-hidden rounded-[18px] border border-[#2c5a40] bg-[linear-gradient(155deg,#112219,#0a110d)] px-[25px] py-8 text-center shadow-[0_18px_55px_rgba(0,0,0,0.55)] transition-[border-color,box-shadow] duration-300 hover:border-primary/60 hover:shadow-[0_0_46px_-10px_rgba(61,255,154,0.4),0_18px_55px_rgba(0,0,0,0.55)]"
    >
      {/* HUD ticks */}
      <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-primary/50" />
      <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-primary/50" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-primary/50" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-primary/50" />

      <div className="relative mx-auto mb-[22px] h-[174px] w-[174px]">
        <span className="ring-sweep absolute -inset-[9px] animate-spin-slow rounded-full" aria-hidden="true" />
        <span
          className="absolute -inset-[17px] animate-spin-rev rounded-full border border-dashed border-primary/30"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 animate-ping-slow rounded-full border border-primary/40"
          aria-hidden="true"
        />

        <div className="relative h-full w-full rounded-full border-2 border-primary p-1.5 shadow-[0_0_28px_rgba(61,255,154,0.27)]">
          {imageFailed ? (
            <div className="grid h-full w-full place-items-center rounded-full bg-[#1b3023] font-mono text-5xl font-bold text-primary">
              MP
            </div>
          ) : (
            <img
              src={profileSources[sourceIndex]}
              alt="Madhanapriyan profile photo"
              onError={() => setSourceIndex((i) => i + 1)}
              className="h-full w-full rounded-full object-cover object-top"
            />
          )}
        </div>
      </div>

      <h1 className="my-[5px] font-sans text-[1.55rem] font-bold tracking-normal text-text-primary">
        {personal.name}
      </h1>
      <h3 className="mb-5 font-mono text-base font-medium tracking-normal text-primary">
        {hero.title}
      </h3>

      <div className="inline-block text-left text-[#c2d0c6]">
        {hero.info.map((item) => (
          <p
            key={item.text}
            className="my-[5px] cursor-default transition-all duration-200 hover:translate-x-1.5 hover:text-primary"
          >
            {item.icon} {item.text}
          </p>
        ))}
      </div>

      <div className="mt-[18px] flex items-center justify-center gap-2 text-[.9rem] text-primary">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-primary" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
        </span>
        {hero.availability}
      </div>
    </motion.div>
  );
}

export function HeroSection({ ready = true }: { ready?: boolean }) {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center pb-16 pt-28"
      aria-label="Introduction"
    >
      <div className="section-container w-full">
        <div className="grid items-center gap-9 min-[850px]:grid-cols-[1.2fr_.8fr] min-[850px]:gap-[54px]">
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, x: -24 }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <BootTerminal ready={ready} />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 flex flex-wrap gap-3.5"
            >
              <Button href={personal.resumeUrl} variant="primary">
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </Button>
              <Button href="#projects" variant="secondary">
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-first flex justify-center min-[850px]:order-none"
            initial={{ opacity: 0, x: 24 }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfileCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
