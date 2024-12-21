import useApi from "@/hooks/useApi";
import Dashboard from "./Dashboard";
import { Brand } from "@/types";

export default function Brands() {
  const {
    data: brands,
    isLoading: isFetching,
    fetchData: fetchBrands,
  } = useApi<Brand[]>("http://localhost:3000/brands", { skipFetch: false });

  const { isLoading: isAdding, fetchData: addBrand } = useApi<void>(
    "http://localhost:3000/brands",
    { method: "POST", skipFetch: true },
  );

  const { isLoading: isDeleting, fetchData: deleteBrand } = useApi<void>(
    "http://localhost:3000/brands",
    { method: "DELETE", skipFetch: true },
  );

  const handleBrandDelete = async (brandId: number) => {
    try {
      await deleteBrand({
        method: "DELETE",
        body: { id: brandId },
      });
      await fetchBrands();
      alert("Brand deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBrand = async (formData: Record<string, string | number>) => {
    try {
      await addBrand({
        method: "POST",
        body: { name: formData.name },
      });
      await fetchBrands();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dashboard<Brand>
      name="Brands"
      data={brands || []}
      isFetching={isFetching}
      onFetch={fetchBrands}
      onSubmit={handleAddBrand}
      fields={[
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
      ]}
      customRender={{
        actions: (row: Brand) => (
          <button
            onClick={() => {
              handleBrandDelete(row.id);
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
