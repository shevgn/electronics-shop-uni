export type TCatalogItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export type TDropdownItem = {
  icon?: React.ReactNode;
  label: string;
};

export type TCartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
