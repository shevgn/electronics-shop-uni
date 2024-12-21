import useApi from "@/hooks/useApi";
import { ProductStats } from "@/types";
import Dashboard from "./Dashboard";

export function Statistics() {
  const {
    data: productsStats,
    isLoading: isFetchingProducts,
    fetchData: fetchStat,
  } = useApi<ProductStats[]>("http://localhost:3000/products/stats");

  return (
    <Dashboard<ProductStats>
      name="Statistics"
      data={productsStats || []}
      onFetch={fetchStat}
      onSubmit={() => { }}
      isFetching={isFetchingProducts}
    />
  );
}
