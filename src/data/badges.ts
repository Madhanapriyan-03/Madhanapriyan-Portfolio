export interface Badge {
  id: string;
  title: string;
  issuer: string;
  /** Link to the badge on Credly (optional). */
  url?: string;
  /** Badge image URL from Credly (optional, falls back to an icon). */
  image?: string;
}

// Add the badges from https://www.credly.com/users/madhanapriyan-m here.
// While this list is empty, the section shows a single card linking to the
// Credly profile.
export const badges: Badge[] = [];
