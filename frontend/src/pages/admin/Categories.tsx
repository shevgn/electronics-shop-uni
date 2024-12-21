import Dashboard from "./Dashboard";
import { Category } from "@/types";
import useApi from "@/hooks/useApi";

export default function Categories() {
  const {
    data: categories,
    isLoading: isFetching,
    fetchData: fetchCategories,
  } = useApi<Category[]>("http://localhost:3000/categories", {
    skipFetch: false,
  });

  const { isLoading: isDeleting, fetchData: deleteCategory } = useApi<void>(
    "http://localhost:3000/categories",
    { method: "DELETE", skipFetch: true },
  );

  const { isLoading: isAdding, fetchData: addCategory } = useApi<void>(
    "http://localhost:3000/categories",
    { method: "POST", skipFetch: true },
  );

  const handleCategoryDelete = async (categoryId: number) => {
    try {
      await deleteCategory({ body: { id: categoryId } });
      await fetchCategories();
      alert("Category deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategory = async (
    formData: Record<string, string | number>,
  ) => {
    try {
      await addCategory({ body: { name: formData.name } });
      await fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dashboard<Category>
      name="Categories"
      data={categories || []}
      isFetching={isFetching}
      onFetch={fetchCategories}
      onSubmit={handleAddCategory}
      fields={[
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
      ]}
      customRender={{
        actions: (row: Category) => (
          <button
            onClick={() => {
              handleCategoryDelete(row.id);
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
