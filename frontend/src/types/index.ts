export interface ICatalogItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface IDropdownItem {
  icon?: React.ReactNode;
  label: string;
}

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserSafe {
  name: string;
  email: string;
}

export type LoginResponse = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};

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
