export interface Project {
  id: string;
  title: string;
  repoName: string;
  description: string;
  techStack: string[];
  language: string;
  languageColor: string;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  visibility?: "Public" | "Private";
}

const github = "https://github.com/Madhanapriyan-03";

export const projects: Project[] = [
  {
    id: "network-security-analyzer",
    title: "AI-Assisted Network Security Analyzer",
    repoName: "AI-Assisted-Network-Security-Analyzer",
    description:
      "A defensive network-security platform that scans authorized TCP targets, evaluates exposed services, predicts security posture with a trained Random Forest model, and generates structured security reports.",
    techStack: ["Python", "FastAPI", "React", "Vite", "Tailwind CSS", "Random Forest", "SQLite"],
    language: "Python",
    languageColor: "#3572A5",
    githubUrl: `${github}/AI-Assisted-Network-Security-Analyzer`,
    featured: true,
    visibility: "Public",
  },
  {
    id: "piano-note-recognition",
    title: "Piano Note Recognition & Transcription",
    repoName: "Piano-Note-Recognition",
    description:
      "A piano-audio transcription application that identifies polyphonic notes and provides timestamped output, piano-roll visualizations, and MIDI/JSON exports using a CRNN-based model.",
    techStack: ["Python", "Deep Learning", "CRNN", "Audio Processing", "Streamlit", "MIDI"],
    language: "Python",
    languageColor: "#3572A5",
    githubUrl: `${github}/Piano-Note-Recognition`,
    featured: true,
    visibility: "Public",
  },
  {
    id: "port-scanner",
    title: "Multi-Threaded TCP Port Scanner",
    repoName: "Multi-Threaded-TCP-Port-Scanner",
    description:
      "A Python TCP port scanner that uses multithreading to scan a target host, detect open ports, grab service banners, validate input, and report scan duration.",
    techStack: ["Python", "Socket Programming", "Threading", "Networking"],
    language: "Python",
    languageColor: "#3572A5",
    githubUrl: `${github}/Multi-Threaded-TCP-Port-Scanner`,
    featured: true,
    visibility: "Public",
  },
  {
    id: "skillsprint",
    title: "SkillSprint",
    repoName: "SkillSprint",
    description:
      "A skill-based learning platform project focused on learning roadmaps, user accounts, enrollments, and assignment submissions.",
    techStack: ["React", "JavaScript", "Frontend Development"],
    language: "JavaScript",
    languageColor: "#F1E05A",
    githubUrl: `${github}/SkillSprint`,
    visibility: "Public",
  },
];
