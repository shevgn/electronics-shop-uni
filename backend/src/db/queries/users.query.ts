import pool from "@db/connection";

export const getAll = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const get = async (id: number) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const create = async (name: string, email: string, password: string) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password],
  );
  return result.rows[0];
};

export default { getAll, get, create };
