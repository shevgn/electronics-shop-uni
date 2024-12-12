import pool from "@db/connection";

const findMany = async () => {
  const result = await pool.query(`
    SELECT 
      o.id,
      o.user_id,
      o.created_at,
      json_agg(
          json_build_object(
              'id', oi.id,
              'productId', oi.product_id,
              'quantity', oi.quantity
          )
      ) AS items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    GROUP BY o.id; 
  `);
  return result.rows;
};

const create = async (client: any, userId: number) => {
  const result = await client.query(
    `INSERT INTO orders (user_id) VALUES ($1) RETURNING id, created_at`,
    [userId],
  );
  return result.rows[0];
};

const addItem = async (
  client: any,
  orderId: number,
  productId: number,
  quantity: number,
): Promise<number> => {
  const result = await client.query(
    `INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id`,
    [orderId, productId, quantity],
  );
  return result.rows[0];
};

const deleteItems = async (client: any, orderId: number) => {
  await client.query(`DELETE FROM order_items WHERE order_id = $1`, [orderId]);
};

const deleteOrder = async (client: any, orderId: number) => {
  await client.query(`DELETE FROM orders WHERE id = $1`, [orderId]);
};

export default { findMany, create, addItem, deleteItems, deleteOrder };
