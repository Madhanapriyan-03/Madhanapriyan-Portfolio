import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, personal } from "../../data/personal";
import { cn } from "../../utils/cn";

function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      {now.toLocaleTimeString("en-GB", { hour12: false })}
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    let frame = 0;

    // Computed on scroll (not with an IntersectionObserver) because most
    // sections are lazy-loaded and may not exist yet when the page mounts.
    const update = () => {
      setScrolled(window.scrollY > 20);

      const probe = window.innerHeight * 0.4;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg-primary/80 backdrop-blur-xl border-b border-primary/15 shadow-[0_8px_30px_-12px_rgba(61,255,154,0.18)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      {/* Scroll progress */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-primary via-accent-blue to-primary shadow-[0_0_10px_rgba(61,255,154,0.7)]"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <nav className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 gap-6">
          <a
            href="#home"
            className="group flex items-center gap-2 font-mono text-[15px] font-bold text-text-primary shrink-0"
            aria-label="Go to home"
          >
            <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">&gt;</span>
            <span className="glitch-hover">
              madhan<span className="text-primary">.</span>dev
            </span>
            <span className="inline-block w-[7px] h-[15px] bg-primary animate-blink" aria-hidden="true" />
          </a>

          <ul className="hidden lg:flex items-center">
            {navLinks.map((link, i) => {
              const active = activeSection === link.href.slice(1);
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "nav-link relative block px-3 xl:px-3.5 py-2 font-mono text-[12.5px] whitespace-nowrap transition-colors duration-200",
                      active ? "text-primary" : "text-text-muted hover:text-text-primary",
                    )}
                  >
                    <span className="hidden xl:inline text-primary/45 mr-1.5 text-[10px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute left-3 right-3 -bottom-[1px] h-[2px] rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden xl:flex items-center gap-3 font-mono text-[11px] text-text-muted shrink-0">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping-slow" />
                <span className="relative w-2 h-2 rounded-full bg-primary" />
              </span>
              ONLINE
            </span>
            <span className="text-border">|</span>
            <Clock />
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-text-muted hover:text-primary border border-border hover:border-primary/50 rounded-md transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-primary/15 bg-bg-primary/95 backdrop-blur-xl overflow-hidden font-mono"
          >
            <p className="px-5 pt-4 text-[11px] text-text-muted">
              {personal.terminalUser}@{personal.terminalHost}:~$ ls ./sections
            </p>
            <ul className="px-3 py-3 space-y-0.5">
              {navLinks.map((link, i) => {
                const active = activeSection === link.href.slice(1);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors",
                        active
                          ? "text-primary bg-primary/10"
                          : "text-text-muted hover:text-text-primary hover:bg-bg-secondary",
                      )}
                    >
                      <span className="text-primary/50 text-xs">{String(i + 1).padStart(2, "0")}</span>
                      <span>./{link.label.toLowerCase()}</span>
                      {active && <span className="ml-auto text-primary">●</span>}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
