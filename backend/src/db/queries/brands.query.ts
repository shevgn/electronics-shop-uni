import pool from "@db/connection";

const findOne = async (id: number) => {
  const result = await pool.query("SELECT * FROM brands WHERE id = $1", [id]);
  return result.rows[0];
};

const findMany = async () => {
  const result = await pool.query("SELECT * FROM brands");
  return result.rows;
};

const addOne = async (name: string) => {
  const result = await pool.query(
    "INSERT INTO brands (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING *",
    [name],
  );
  return result.rows[0];
};

const deleteOne = async (id: number) => {
  const result = await pool.query("DELETE FROM brands WHERE id = $1", [id]);
  return result.rows[0];
};

export default { findOne, findMany, addOne, deleteOne };
