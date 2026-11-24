import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { personal } from "../../data/personal";
import { Button } from "../ui/Button";
import { GlassCard } from "../ui/GlassCard";
import { leetcode } from "../../data/leetcode";
import { StatCard } from "../ui/StatCard";

interface Solved {
  total: number;
  easy: number;
  medium: number;
  hard: number;
}

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type Status = "loading" | "ok" | "failed";

async function fetchJson(url: string, signal: AbortSignal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

function useLeetCodeStats() {
  const [solved, setSolved] = useState<Solved>(leetcode.stats);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const controller = new AbortController();
    const user = encodeURIComponent(leetcode.username);
    const timeout = setTimeout(() => controller.abort(), 12000);

    // Try each public stats API in turn until one answers.
    const sources: Array<() => Promise<Solved>> = [
      async () => {
        const d = await fetchJson(`https://leetcode-stats-api.herokuapp.com/${user}`, controller.signal);
        if (d?.status !== "success") throw new Error("no data");
        return { total: d.totalSolved, easy: d.easySolved, medium: d.mediumSolved, hard: d.hardSolved };
      },
      async () => {
        const d = await fetchJson(`https://alfa-leetcode-api.onrender.com/${user}/solved`, controller.signal);
        if (typeof d?.solvedProblem !== "number") throw new Error("no data");
        return { total: d.solvedProblem, easy: d.easySolved, medium: d.mediumSolved, hard: d.hardSolved };
      },
    ];

    (async () => {
      for (const load of sources) {
        try {
          setSolved(await load());
          setStatus("ok");
          return;
        } catch {
          if (controller.signal.aborted) return;
        }
      }
      setStatus("failed");
    })();

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return { solved, status };
}

export function LeetCodeCard() {
  const { solved, status } = useLeetCodeStats();
  const { languages, username } = leetcode;
  const hasCount = solved.total > 0;

  if (!username) return null;

  const maxLang = Math.max(1, ...languages.map((l) => l.solved));
  const difficulty = [
    { label: "Easy", value: solved.easy, color: "bg-primary" },
    { label: "Medium", value: solved.medium, color: "bg-accent-amber" },
    { label: "Hard", value: solved.hard, color: "bg-danger" },
  ];
  const maxDiff = Math.max(1, solved.easy, solved.medium, solved.hard);

  // Ring: one arc per difficulty, sized by its share of solved problems
  const GAP = 3;
  const sum = Math.max(1, solved.easy + solved.medium + solved.hard);
  const strokes = ["stroke-primary", "stroke-accent-amber", "stroke-danger"];
  let used = 0;
  const segments = difficulty.map((d, i) => {
    const share = (d.value / sum) * CIRCUMFERENCE;
    const seg = {
      label: d.label,
      stroke: strokes[i],
      length: Math.max(0, share - (d.value > 0 ? GAP : 0)),
      offset: used,
    };
    used += share;
    return seg;
  });

  return (
    <div className="grid lg:grid-cols-[1fr_17rem] gap-5 lg:gap-6">
    <StatCard label="leetcode — problem solving" delay={0.12}>
      {hasCount ? (
      <div
        className={`p-5 md:p-7 grid gap-8 md:gap-10 items-center ${
          languages.length > 0 ? "md:grid-cols-2" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="relative w-36 h-36 shrink-0">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r={RADIUS} fill="none" strokeWidth="8" className="stroke-border" />
              {segments.map((seg, i) => (
                <motion.circle
                  key={seg.label}
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="butt"
                  className={seg.stroke}
                  strokeDasharray={`${seg.length} ${CIRCUMFERENCE}`}
                  strokeDashoffset={-seg.offset}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.25 }}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-bold text-text-primary tabular-nums">
                {solved.total}
              </span>
              <span className="font-mono text-[10px] text-text-muted">solved</span>
            </div>
          </div>

          <ul className="w-full space-y-3">
            {difficulty.map((d, i) => (
              <li key={d.label}>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-text-muted">{d.label}</span>
                  <span className="text-text-primary tabular-nums">{d.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${d.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(d.value / maxDiff) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: "easeOut" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {languages.length > 0 && (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary mb-4">
              Languages used
            </p>
            <ul className="space-y-3">
              {languages.map((lang, i) => (
                <li key={lang.name}>
                  <div className="flex justify-between font-mono text-xs mb-1">
                    <span className="text-text-primary">{lang.name}</span>
                    <span className="text-text-muted tabular-nums">{lang.solved} solved</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent-blue"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(lang.solved / maxLang) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      ) : (
        <div className="p-6 md:p-8 font-mono text-sm text-text-muted">
          <p className="text-primary mb-2">$ leetcode --solved @{username}</p>
          <p>
            {status === "loading"
              ? "Fetching solved count..."
              : "Live count is unavailable right now. Open my profile to see the latest numbers."}
          </p>
        </div>
      )}
    </StatCard>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <GlassCard
        hover
        glow="green"
        className="h-full border border-border/60"
      >
        <div className="h-full p-6 flex flex-col items-center justify-center text-center gap-4">
        <SiLeetcode className="w-10 h-10 text-[#ffa116] drop-shadow-[0_0_12px_rgba(255,161,22,0.45)]" aria-hidden="true" />
        <div>
          <p className="font-display text-lg font-semibold text-text-primary">LeetCode</p>
          <p className="font-mono text-xs text-text-muted">@{username}</p>
        </div>
        <Button href={personal.leetcode} external variant="primary" className="w-full">
          Explore
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </Button>
        </div>
      </GlassCard>
    </motion.div>
    </div>
  );
}
