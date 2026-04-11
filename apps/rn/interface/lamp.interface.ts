export type LampVideoSources = {
  mobile: string;
  desktop: string;
};

interface Lamp {
  id: number;
  name: string;
  slug: string;
  images: string[];
  video?: {
    desktop: string;
    mobile?: string;
  };
  isFeatured?: boolean;
  description?: string;
  details?: string;
  logo?: string;
  tags?: string[];
  price?: number;
  technic?: string[];
  buildDate?: string;
}

export type { Lamp as default };
