import { Product } from "@/types/product.type";
import { ServerError } from "@/utils/errors.util";
import query from "@db/queries/products.query";
import { generateImageUrl } from "@utils/images.utils";
import pool from "@db/connection";

const getAll = async (category?: string): Promise<Product[]> => {
  try {
    const products: Product[] = await query.getAll(category);
    if (!products) {
      throw new ServerError("Products not found", 404);
    }

    return products.map((product) => ({
      ...product,
      images: !product.images
        ? [""]
        : product.images.map((image) => generateImageUrl(product.name, image)),
    }));
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
    return {
      ...product,
      images: !product.images
        ? [""]
        : product.images.map((image) => generateImageUrl(product.name, image)),
    };
  } catch (error) {
    throw new ServerError("Failed to get product", 500, error);
  }
};

const create = async (product: Omit<Product, "images">): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await query.addOne(client, product);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw new ServerError("Failed to create product", 500, error);
  } finally {
    client.release();
  }
};

export default { getAll, get, create };
