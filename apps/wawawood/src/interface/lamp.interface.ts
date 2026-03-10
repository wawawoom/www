interface Lamp {
  id: number;
  name: string;
  slug: string;
  images: string[];
  video?: string;
  isFeatured?: boolean;
  description?: string;
  details?: string;
  logo?: string;
  tag?: string;
  price?: number;
  technic?: string[];
}

export type { Lamp as default };
