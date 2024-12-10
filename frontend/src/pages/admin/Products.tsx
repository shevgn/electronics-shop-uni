import { Product } from "@/types";
import Dashboard from "./Dashboard";
import useApi from "@/hooks/useApi";
import { div } from "motion/react-client";

export default function Products() {
  const {
    data: products,
    isLoading: isFetchingProducts,
    fetchData: fetchProducts,
  } = useApi<Product[]>("http://localhost:3000/products", { skipFetch: false });

  const { isLoading: isDeletingProduct, fetchData: deleteProduct } =
    useApi<void>("http://localhost:3000/products", {
      method: "DELETE",
      skipFetch: true,
    });

  const { data: createdProduct, fetchData: createProduct } = useApi<void>(
    "http://localhost:3000/products",
    { method: "POST", skipFetch: true },
  );

  const handleProductDelete = async (productId: number) => {
    try {
      await deleteProduct({
        method: "DELETE",
        body: { id: productId },
      });
      await fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = async (
    formData: Record<string, string | number>,
  ) => {
    try {
      await createProduct({ body: formData });
      await fetchProducts();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <Dashboard<Product>
      name="Products"
      data={products || []}
      isFetching={isFetchingProducts}
      onFetch={fetchProducts}
      onSubmit={handleAddProduct}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "price", label: "Price", type: "number", required: true },
        {
          name: "releaseYear",
          label: "Release Year",
          type: "number",
          required: true,
        },
        { name: "brand", label: "Brand", type: "text", required: true },
      ]}
      customRender={{
        images: (value: string[]) => (
          <div className="flex flex-col">
            {value.map((url, index) => (
              <span key={index}>{url}</span>
            ))}
          </div>
        ),
        details: (value: Record<string, any>) => (
          <div className="flex space-x-2">
            <span className="text-sm">{JSON.stringify(value, null, 2)}</span>
          </div>
        ),
        categories: (value: string[]) => (
          <ul>
            {value.map((category, index) => (
              <li key={index} className="text-sm">
                {category}
              </li>
            ))}
          </ul>
        ),
        actions: (row: Product) => (
          <button
            onClick={() => {
              fetchProducts();
              handleProductDelete(row.id);
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
