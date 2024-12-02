import query from "@db/queries/users.query";

export async function getAll(): Promise<Object> {
  const result = await query.getAll();
  return result;
}

export async function get(id: number): Promise<Object> {
  const result = await query.get(id);
  return result;
}

export async function create(
  name: string,
  email: string,
  password: string,
): Promise<Object> {
  const result = await query.create(name, email, password);
  return result;
}

export async function update(id: number, name: string): Promise<Object> {
  return { id: id, name: name };
}

export async function remove(id: number): Promise<Object> {
  return { id: id, name: "John Doe" };
}

export default { getAll, get, create, update, remove };
