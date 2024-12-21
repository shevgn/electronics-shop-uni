import pool from "@db/connection";

const findMany = async () => {
  const result = await pool.query("SELECT * FROM categories");
  return result.rows;
};

const findOne = async (id: number) => {
  const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const addOne = async (name: string) => {
  const result = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) ON CONFLICT DO NOTHING RETURNING *",
    [name],
  );
  return result.rows[0];
};

const deleteOne = async (id: number) => {
  const result = await pool.query("DELETE FROM categories WHERE id = $1", [id]);
  return result.rows[0];
};

export default { findMany, findOne, addOne, deleteOne };
