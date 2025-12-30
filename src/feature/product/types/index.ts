export type Review = {
  id: number;
  username: string;
  identity: string;
  comment: string;
  satisfiesPercent: string;
  like: string;
  dislike: string;
  active: boolean;
};

export type Product = {
  slug: string
  title: string
  description: string
  priceToman: number
  images: Array<{ src: string; alt: string }>
  brand?: string
  condition?: "new" | "used"
  availability?: "in_stock" | "out_of_stock"
  updatedAtISO?: string
}

export type ImageCategory = {
  id: number;
  name: string;
  src: string;
  alt: string;
};