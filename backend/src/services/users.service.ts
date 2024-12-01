export async function get(id: number): Promise<Object> {
  return { id: id, name: "John Doe" };
}

export async function create(id: number, name: string): Promise<Object> {
  return { id: id, name: name };
}

export async function update(id: number, name: string): Promise<Object> {
  return { id: id, name: name };
}

export async function remove(id: number): Promise<Object> {
  return { id: id, name: "John Doe" };
}

export default { get, create, update, remove };
