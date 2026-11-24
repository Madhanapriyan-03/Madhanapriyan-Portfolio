export const personal = {
  name: "Madhanapriyan M",
  role: "Cybersecurity & Software Development Enthusiast",
  education: "B.Tech Artificial Intelligence and Data Science",
  status: "Undergraduate Student",
  graduation: "2028",
  cgpa: "8.27 / 10",
  location: "Tamil Nadu, India",
  goal: "Build a career in cybersecurity, with a focus on network security and penetration testing.",
  email: "nrmadhan23@gmail.com",
  emailComposeUrl:
    "https://mail.google.com/mail/?view=cm&fs=1&to=nrmadhan23%40gmail.com",
  github: "https://github.com/Madhanapriyan-03",
  githubUsername: "Madhanapriyan-03",
  linkedin: "https://www.linkedin.com/in/madhanapriyan-m/",
  leetcode: "https://leetcode.com/u/Madhanapriyan/",
  credly: "https://www.credly.com/users/madhanapriyan-m",
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  terminalUser: "madhan",
  terminalHost: "kali",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Activity", href: "#activity" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  title: "Aspiring Penetration Tester",
  availability: "Available for Internship",
  info: [
    { icon: "🎓", text: "AI & DS Student" },
    { icon: "🐧", text: "Linux Enthusiast" },
    { icon: "🌐", text: "Networking" },
    { icon: "🛡", text: "Ethical Hacking" },
  ],
  command: "whoami",
  boot: ["Loading Kernel", "Initializing Network", "Loading Portfolio"],
} as const;
