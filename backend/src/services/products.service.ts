import { Product } from "@/types/product.type";
import { ServerError } from "@/utils/errors.util";
import query from "@db/queries/products.query";

const getAll = async (category?: string): Promise<Product[]> => {
  try {
    const products = await query.getAll(category);
    if (!products) {
      throw new ServerError("Products not found", 404);
    }

    return products;
  } catch (error) {
    throw new ServerError("Failed to get products", 500, error);
  }
};

const get = async (id: number): Promise<Product> => {
  try {
    const product = await query.get(id);
    if (!product) {
      throw new ServerError("Product not found", 404);
    }
    return product;
  } catch (error) {
    throw new ServerError("Failed to get product", 500, error);
  }
};

export default { getAll, get };
