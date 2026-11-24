import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { personal } from "../../data/personal";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";
import { GlassCard } from "../ui/GlassCard";
import { StatCard } from "../ui/StatCard";
import { LeetCodeCard } from "./LeetCodeCard";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

export function GitHubSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const username = personal.githubUsername;

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        return res.json();
      })
      .then((data: GitHubRepo[]) => {
        setRepos(Array.isArray(data) ? data.slice(0, 6) : []);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setLoadError(true);
        setRepos([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [username]);

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&bg_color=0D1117&title_color=DCF5E6&text_color=8AA597&icon_color=3DFF9A&rank_icon=percentile&hide_title=false`;
  const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&bg_color=0D1117&title_color=DCF5E6&text_color=8AA597&langs_count=6`;

  return (
    <section id="activity" className="section-py bg-bg-secondary/20" aria-label="Activity">
      <div className="section-container">
        <SectionHeader
          label="// activity.log"
          title="Open Source Activity"
          description="A live snapshot of my public repositories and development activity."
        />

        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6 mb-6">
          <StatCard label="github-stats — profile metrics">
            <img
              src={statsUrl}
              alt={`GitHub statistics for ${username}`}
              loading="lazy"
              className="w-full h-auto rounded-b-xl"
            />
          </StatCard>

          <StatCard label="top-langs — language breakdown" delay={0.08}>
            <img
              src={langsUrl}
              alt={`Top languages for ${username}`}
              loading="lazy"
              className="w-full h-auto rounded-b-xl"
            />
          </StatCard>
        </div>

        <LeetCodeCard />

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-semibold text-text-primary flex items-center gap-2.5">
              <FaGithub className="w-5 h-5 text-text-muted" aria-hidden="true" />
              Recent Public Repositories
            </h3>
            <span className="font-mono text-xs text-text-muted hidden sm:inline">
              github.com/{username}
            </span>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-36 rounded-xl border border-border bg-bg-card/50 animate-pulse"
                />
              ))}
            </div>
          ) : repos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo, index) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="repo-card group flex flex-col p-5 h-full"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-sm text-accent-blue group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <FaGithub className="w-3.5 h-3.5 text-text-muted" aria-hidden="true" />
                      {repo.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" aria-hidden="true" />
                  </div>
                  <p className="text-xs text-text-muted line-clamp-2 mb-4 flex-1 leading-relaxed">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted font-mono pt-3 border-t border-border/40">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" aria-hidden="true" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" aria-hidden="true" />
                      {repo.forks_count}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            <GlassCard className="p-6 border border-border/60">
              <p className="text-text-muted text-sm font-mono">
                {loadError ? "GitHub repositories could not be loaded right now." : "No public repositories are available to display."} Visit{" "}
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">
                  github.com/{username}
                </a>
                {" "}to browse the repositories directly.
              </p>
            </GlassCard>
          )}
        </div>

        <div className="mt-10 text-center">
          <Button href={personal.github} variant="secondary" external>
            <FaGithub className="w-4 h-4" aria-hidden="true" />
            View Full Profile
          </Button>
        </div>
      </div>
    </section>
  );
}
