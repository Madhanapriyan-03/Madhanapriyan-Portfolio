import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import { Shield, Network, Code2, Globe, Server, Wrench } from "lucide-react";
import {
  SiPython,
  SiCplusplus,
  SiOpenjdk,
  SiLinux,
  SiGithub,
  SiHtml5,
  SiCss,
  SiSpringboot,
  SiVirtualbox,
  SiAndroidstudio,
} from "react-icons/si";

export interface SkillItem {
  name: string;
  icon: LucideIcon | ComponentType<{ className?: string }>;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    icon: Code2,
    skills: [
      { name: "Python", icon: SiPython },
      { name: "Java", icon: SiOpenjdk },
      { name: "C++", icon: SiCplusplus },
    ],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    skills: [
      { name: "Linux", icon: SiLinux },
      { name: "Computer Networking", icon: Network },
    ],
  },
  {
    title: "Web / Backend",
    icon: Globe,
    skills: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "REST APIs", icon: Server },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "GitHub", icon: SiGithub },
      { name: "VS Code", icon: Code2 },
      { name: "VirtualBox", icon: SiVirtualbox },
      { name: "Android Studio", icon: SiAndroidstudio },
    ],
  },
];
