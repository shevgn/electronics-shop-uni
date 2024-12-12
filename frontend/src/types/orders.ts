export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
};

export type Order = {
  id: number;
  userId: number;
  createdAt: string;
  items: OrderItem[];
};

export type CreateOrderRequest = {
  items: OrderItem[];
};

export type CreateOrderResponse = {
  id: number;
  createdAt: string;
};

export type FullOrder = Order & OrderItem[];
