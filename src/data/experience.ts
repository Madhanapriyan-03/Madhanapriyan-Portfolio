export interface Experience {
  id: string;
  company: string;
  role: string;
  mode: "online" | "onsite";
  location?: string;
  /** e.g. "Jun 2025 – Jul 2025" (optional). */
  period?: string;
  /** What you worked on (optional bullet points). */
  highlights?: string[];
}

// Add `period` and `highlights` to any entry to show dates and details.
export const experience: Experience[] = [
  {
    id: "peralsithub",
    company: "PeralsItHub",
    role: "AI and Software Development",
    mode: "onsite",
    location: "Chennai",
  },
  {
    id: "thiranex",
    company: "Thiranex",
    role: "C++ Programming",
    mode: "online",
    location: "Remote",
  },
  {
    id: "pinnacle",
    company: "Pinnacle",
    role: "Web Development",
    mode: "online",
    location: "Remote",
  },
];
