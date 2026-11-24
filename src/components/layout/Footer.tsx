import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personal } from "../../data/personal";
import { TerminalWindow } from "../ui/TerminalWindow";
import { KaliPrompt } from "../ui/KaliPrompt";
import { useInView } from "../../hooks/useInView";

export function Footer() {
  const year = new Date().getFullYear();
  const { ref, isInView } = useInView(0.3);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <footer ref={ref} className="border-t border-border/60">
      <div className="section-container py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto mb-12"
        >
          <TerminalWindow title={`${personal.terminalUser}@${personal.terminalHost}: ~`} variant="kali">
            <div className="space-y-3 text-xs sm:text-sm">
              {phase >= 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <KaliPrompt
                    user={personal.terminalUser}
                    host={personal.terminalHost}
                    command="exit"
                  />
                </motion.div>
              )}
              {phase >= 2 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-text-muted pl-0 sm:pl-4"
                >
                  Connection closed.
                </motion.p>
              )}
              {phase >= 3 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-primary pl-0 sm:pl-4"
                >
                  Thanks for visiting.
                </motion.p>
              )}
              {!isInView && (
                <KaliPrompt
                  user={personal.terminalUser}
                  host={personal.terminalHost}
                  showCursor
                />
              )}
            </div>
          </TerminalWindow>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40">
          <p className="font-mono text-xs text-text-muted">
            © {year} {personal.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-text-muted">
            <span className="text-text-muted/60">stack:</span>{" "}
            <span className="text-primary">React</span>
            <span className="text-text-muted/40 mx-1.5">·</span>
            <span className="text-accent-blue">Tailwind</span>
            <span className="text-text-muted/40 mx-1.5">·</span>
            <span className="text-text-primary">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
