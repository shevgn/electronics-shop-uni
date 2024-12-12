import { Product } from "@/types";
import Dashboard from "./Dashboard";
import useApi from "@/hooks/useApi";
import { useMemo, useState } from "react";

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
      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = async (
    formData: Record<string, string | number>,
  ) => {
    try {
      const details: Record<string, string> = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (key.startsWith("detail_")) {
          const detailKey = key.replace("detail_", "");
          details[detailKey] = value as string;
        }
      });

      const categories = Array.isArray(formData.categories)
        ? (formData.categories as string[])
        : (formData.categories as string).split(",");

      const productData = {
        name: formData.name,
        price: Number(formData.price),
        release_year: Number(formData.releaseYear),
        brand: formData.brand,
        categories: categories.map((c) => c.trim()),
        details,
      };

      await createProduct({ body: productData });
      await fetchProducts();
      alert("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const uniqueCategories = useMemo(() => {
    if (!products) return [];
    const categorySet = new Set<string>();
    products.forEach((product) => {
      product.categories.forEach((category) => categorySet.add(category));
    });
    return Array.from(categorySet);
  }, [products]);

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
        {
          name: "categories",
          label: "Categories",
          type: "select-multiple",
          options: uniqueCategories,
          required: true,
        },
        { name: "detail_Color", label: "Color", type: "text" },
        { name: "detail_Storage", label: "Storage", type: "text" },
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
