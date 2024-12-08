export type OrderItem = {
  productId: number;
  quantity: number;
};

export type CreateOrderRequest = {
  items: OrderItem[];
};

export type CreateOrderResponse = {
  id: number;
  createdAt: string;
};
