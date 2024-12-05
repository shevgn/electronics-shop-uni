export type Product = {
  id: number;
  name: string;
  price: number;
  release_year: number;
  categories: string[];
  details: Record<string, string>;
  images: string[];
  brand: string;
};
