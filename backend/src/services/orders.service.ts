import { ServerError } from "@/utils/errors.util";
import pool from "@db/connection";
import query from "@db/queries/orders.query";

interface OrderItem {
  productId: number;
  quantity: number;
}

const create = async (userId: number, items: OrderItem[]) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const order = await query.create(client, userId);
    const orderId = order.id;

    for (const item of items) {
      await query.addItem(client, orderId, item.productId, item.quantity);
    }

    await client.query("COMMIT");

    return {
      id: orderId,
      createdAt: order.created_at,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw new ServerError(
      "Failed to create order: " + (error as Error).message,
    );
  } finally {
    client.release();
  }
};

const deleteOrder = async (orderId: number): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await query.deleteItems(client, orderId);
    await query.deleteOrder(client, orderId);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw new ServerError(
      "Failed to delete order: " + (error as Error).message,
    );
  } finally {
    client.release();
  }
};

export default { create, deleteOrder };
