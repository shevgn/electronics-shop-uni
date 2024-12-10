import useApi from "@/hooks/useApi";
import { IUser } from "@/types";
import Dashboard from "./Dashboard";

export default function Users() {
  const {
    data: users,
    isLoading: isFetchingUsers,
    fetchData: fetchUsers,
  } = useApi<IUser[]>("http://localhost:3000/users", { skipFetch: false });

  const { isLoading: isDeletingUser, fetchData: deleteUser } = useApi<void>(
    "http://localhost:3000/users",
    {
      method: "DELETE",
      skipFetch: true,
    },
  );

  const { data: createdUser, fetchData: createUser } = useApi<void>(
    "http://localhost:3000/users/register",
    {
      method: "POST",
      skipFetch: true,
    },
  );

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser({
        method: "DELETE",
        body: { id: userId },
      });
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddUser = async (formData: Record<string, string | number>) => {
    try {
      await createUser({ body: formData });
      await fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <Dashboard<IUser>
      name="Users"
      data={users || []}
      isFetching={isFetchingUsers}
      onFetch={fetchUsers}
      onSubmit={handleAddUser}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "password", label: "Password", type: "text", required: true },
      ]}
      customRender={{
        role: (value: string) => <strong>{value}</strong>,
        actions: (row: IUser) => (
          <button
            onClick={() => {
              fetchUsers();
              handleDeleteUser(row.id);
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
