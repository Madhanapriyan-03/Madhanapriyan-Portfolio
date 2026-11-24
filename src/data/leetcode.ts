// LeetCode panel in the Activity section.
//
// `username` drives the live solved-count (fetched from public stats APIs
// when the page loads). `stats` and `languages` are shown as a fallback /
// extra detail, copy them from your LeetCode profile:
//   - stats:     total / easy / medium / hard solved
//   - languages: the "Languages" list (problems solved per language)
export const leetcode = {
  username: "Madhanapriyan",
  stats: { total: 0, easy: 0, medium: 0, hard: 0 },
  languages: [] as { name: string; solved: number }[],
};
