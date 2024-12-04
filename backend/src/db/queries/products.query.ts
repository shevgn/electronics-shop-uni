import { Product } from "@/types/product.type";
import pool from "@db/connection";

const getAll = async (category?: string): Promise<Product[]> => {
  const query = `
    SELECT 
        pr.id AS product_id,
        pr.name AS product_name,
        pr.price,
        pr.release_year,
        COALESCE(array_agg(DISTINCT c.name), ARRAY[]::TEXT[]) AS categories,
        COALESCE(array_agg(DISTINCT pd.key || ': ' || pd.value), ARRAY[]::TEXT[]) AS details,
        COALESCE(b.name, 'Unknown') AS brand
    FROM 
        products AS pr
    LEFT JOIN product_categories AS pc ON pr.id = pc.product_id
    LEFT JOIN categories AS c ON pc.category_id = c.id
    LEFT JOIN product_details AS pd ON pr.id = pd.product_id
    LEFT JOIN brands AS b ON pr.brand_id = b.id
    ${category ? "WHERE c.name = $1" : ""}
    GROUP BY pr.id, b.name
  `;

  const params = category ? [category] : [];
  const result = await pool.query(query, params);
  return result.rows;
};

const get = async (id: number): Promise<Product> => {
  const query = `
    SELECT 
        pr.id AS product_id,
        pr.name AS product_name,
        pr.price,
        pr.release_year,
        COALESCE(array_agg(DISTINCT c.name), ARRAY[]::TEXT[]) AS categories,
        COALESCE(array_agg(DISTINCT pd.key || ': ' || pd.value), ARRAY[]::TEXT[]) AS details,
        COALESCE(b.name, 'Unknown') AS brand
    FROM 
        products AS pr
    LEFT JOIN product_categories AS pc ON pr.id = pc.product_id
    LEFT JOIN categories AS c ON pc.category_id = c.id
    LEFT JOIN product_details AS pd ON pr.id = pd.product_id
    LEFT JOIN brands AS b ON pr.brand_id = b.id
    WHERE pr.id = $1
    GROUP BY pr.id, b.name
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export default { getAll, get };
