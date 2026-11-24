# Madhanapriyan M — Portfolio

A personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. The visual direction is a Kali/Linux terminal-inspired interface with a dark code-rain background, neon green and cyan accents, glass-style cards, and animated sections.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React and React Icons

## Run locally

**Requirements:** Node.js 22 or newer and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Deploy to GitHub Pages

This repository is configured for GitHub Pages using GitHub Actions.

1. Create a public repository named `Portfolio` under `Madhanapriyan-03`.
2. Push the project files to the `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source.
5. Open the **Actions** tab and wait for **Deploy portfolio to GitHub Pages** to complete.
6. The site will be published at `https://madhanapriyan-03.github.io/Portfolio/`.

The Vite base path is configured automatically for GitHub Actions builds and remains `/` during local development.

## Personal details to finish

- Add your photo as `public/profile.webp` (or `.jpg`, `.jpeg`, `.png`). Until then the home page shows the "MP" fallback ring.
- Activity section: the LeetCode count loads live for `username` in `src/data/leetcode.ts`; fill `stats` (fallback) and `languages` from your profile.
- Credly: list your badges in `src/data/badges.ts` (title, issuer, optional url/image).
- Certificates: edit `src/data/certificates.ts` (add `credentialUrl` for direct links). Experience: add dates and bullet points in `src/data/experience.ts`.
- The home-page text (title, availability, quick-info lines) lives in the `hero` object in `src/data/personal.ts`.
- Add the latest approved resume PDF to `public/resume.pdf`, (`resumeUrl` already respects the GitHub Pages base path).
- Add credential links to `src/data/certificates.ts` (`credentialUrl`) when available.
- Update the project cards in `src/data/projects.ts` when additional repositories or live demos are ready.

## Contact

- GitHub: https://github.com/Madhanapriyan-03
- LinkedIn: https://www.linkedin.com/in/madhanapriyan-m/
- Email: nrmadhan23@gmail.com
