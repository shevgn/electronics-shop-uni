import useApi from "@/hooks/useApi";
import Dashboard from "./Dashboard";
import { Order, OrderItem } from "@/types/orders";

export default function Orders() {
  const {
    data: orders,
    isLoading: isFetchingOrders,
    fetchData: fetchOrders,
  } = useApi<Order[]>("http://localhost:3000/orders", {
    skipFetch: false,
  });

  const { isLoading: isDeletingOrder, fetchData: deleteOrder } = useApi<void>(
    "http://localhost:3000/orders",
    { method: "DELETE", skipFetch: true },
  );

  const { isLoading: isAddingOrder, fetchData: addOrder } = useApi<void>(
    "http://localhost:3000/orders",
    { method: "POST", skipFetch: true },
  );

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await deleteOrder({
        method: "DELETE",
        body: { id: orderId },
      });
      await fetchOrders();
      alert("Order deleted successfully");
    } catch (error) {
      console.error("Failed to delete order: " + error);
    }
  };

  return (
    <Dashboard<Order>
      name="Orders"
      data={orders || []}
      isFetching={isFetchingOrders}
      onFetch={fetchOrders}
      onSubmit={() => { }}
      customRender={{
        items: (items: OrderItem[]) => (
          <div>
            {items.map((item) => (
              <div key={item.id}>
                <p>Product ID: {item.productId}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        ),
        actions: (row: Order) => (
          <button
            onClick={() => {
              handleDeleteOrder(row.id);
            }}
            key={`delete-${row.id}`}
            className="h-full w-full text-red-500"
          >
            Delete
          </button>
        ),
      }}
    />
  );
}
