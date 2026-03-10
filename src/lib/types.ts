
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "app" | "website";
  description: string;
  longDescription: string;
  keyFeatures: string[];
  role: string;
  challenges: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  playStoreLink?: string;
  repoLink?: string;
  liveLink?: string;
}
