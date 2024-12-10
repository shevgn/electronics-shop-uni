import { User } from "@/types/user.type";
import pool from "@db/connection";

export const getAll = async (): Promise<User[]> => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const get = async (id: number): Promise<User> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const findOne = async (email: string): Promise<User> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

export const addOne = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'user') RETURNING *",
    [name, email, password],
  );
  return result.rows[0];
};

const deleteOne = async (id: number): Promise<number> => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id",
    [id],
  );
  return result.rows[0].id;
};

export default { getAll, get, findOne, addOne, deleteOne };
