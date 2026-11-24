import { lazy, Suspense } from "react";
import { HeroSection } from "../components/home/HeroSection";

const AboutSection = lazy(() =>
  import("../components/about/AboutSection").then((m) => ({
    default: m.AboutSection,
  })),
);
const SkillsSection = lazy(() =>
  import("../components/skills/SkillsSection").then((m) => ({
    default: m.SkillsSection,
  })),
);
const ExperienceSection = lazy(() =>
  import("../components/experience/ExperienceSection").then((m) => ({
    default: m.ExperienceSection,
  })),
);
const ProjectsSection = lazy(() =>
  import("../components/projects/ProjectsSection").then((m) => ({
    default: m.ProjectsSection,
  })),
);
const CertificatesSection = lazy(() =>
  import("../components/certificates/CertificatesSection").then((m) => ({
    default: m.CertificatesSection,
  })),
);
const GitHubSection = lazy(() =>
  import("../components/github/GitHubSection").then((m) => ({
    default: m.GitHubSection,
  })),
);
const ContactSection = lazy(() =>
  import("../components/contact/ContactSection").then((m) => ({
    default: m.ContactSection,
  })),
);

function SectionFallback() {
  return <div className="py-24" aria-hidden="true" />;
}

export function HomePage({ ready = true }: { ready?: boolean }) {
  return (
    <main>
      <HeroSection ready={ready} />
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificatesSection />
        <GitHubSection />
        <ContactSection />
      </Suspense>
    </main>
  );
}
