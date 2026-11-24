export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  /** Result tier, e.g. "Elite" or "Elite + Gold". */
  grade?: string;
  credentialUrl?: string;
  status: "completed" | "in-progress" | "planned";
}

export const certificates: Certificate[] = [
  {
    id: "nptel-applied-ai",
    title: "Applied Artificial Intelligence",
    issuer: "NPTEL",
    grade: "Elite + Gold",
    status: "completed",
  },
  {
    id: "nptel-algorithms",
    title: "Fundamental Algorithms: Design and Analysis",
    issuer: "NPTEL",
    grade: "Elite",
    status: "completed",
  },
  {
    id: "nptel-rl",
    title: "Reinforcement Learning",
    issuer: "NPTEL",
    date: "Completed",
    status: "completed",
  },
  {
    id: "nptel-genai",
    title: "Programming with Generative AI",
    issuer: "NPTEL",
    date: "Certified",
    status: "completed",
  },
  {
    id: "coursera",
    title: "Programming & AI Courses",
    issuer: "Coursera",
    date: "Multiple certifications",
    status: "completed",
  },
  {
    id: "great-learning",
    title: "Technical Learning Courses",
    issuer: "Great Learning",
    date: "Multiple certifications",
    status: "completed",
  },
  {
    id: "infosys-springboard",
    title: "Programming & AI Courses",
    issuer: "Infosys Springboard",
    date: "Multiple certifications",
    status: "completed",
  },
];
