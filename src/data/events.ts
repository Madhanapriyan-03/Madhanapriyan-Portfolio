export interface CommunityEvent {
  id: string;
  title: string;
  type: "Meetup" | "Summit";
  venue: string;
  /** e.g. "July 2026" (optional). */
  date?: string;
}

export const events: CommunityEvent[] = [
  {
    id: "grafana-sre-coimbatore",
    title: "Grafana & Friends × SRE Community Coimbatore Meetup",
    type: "Meetup",
    venue: "iamneo office",
  },
  {
    id: "cloud-native-coimbatore",
    title: "Cloud Native Coimbatore Meetup",
    type: "Meetup",
    venue: "Pressidio",
    date: "July 2026",
  },
  {
    id: "servicenow-ai-summit",
    title: "ServiceNow AI Summit",
    type: "Summit",
    venue: "Le Méridien",
  },
];
