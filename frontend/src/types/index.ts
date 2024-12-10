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
  role: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserSafe {
  name: string;
  email: string;
  role: string;
}

export type LoginResponse = {
  user: {
    id: number;
    role: string;
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

export type customRender<T> = Partial<
  Record<keyof T, (value: any, row: T) => React.ReactNode>
> & {
  actions?: (row: T) => React.ReactNode;
};
