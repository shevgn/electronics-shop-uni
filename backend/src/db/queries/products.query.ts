import { Product } from "@/types/product.type";
import pool from "@db/connection";

const getAll = async (category?: string): Promise<Product[]> => {
  const query = `
  SELECT 
    pr.id AS id,
    pr.name AS name,
    pr.price::FLOAT AS price,
    pr.release_year,
    COALESCE(array_agg(DISTINCT c.name), ARRAY[]::TEXT[]) AS categories,
    COALESCE(
        json_object_agg(DISTINCT pd.key, pd.value) 
        FILTER (WHERE pd.key IS NOT NULL AND pd.value IS NOT NULL), 
        '{}'::JSON
    ) AS details,
    json_agg(DISTINCT img.image_url) FILTER (WHERE img.image_url IS NOT NULL) AS images,
    COALESCE(b.name, 'Unknown') AS brand
  FROM 
    products AS pr
    LEFT JOIN product_categories AS pc ON pr.id = pc.product_id
    LEFT JOIN categories AS c ON pc.category_id = c.id
    LEFT JOIN product_details AS pd ON pr.id = pd.product_id
    LEFT JOIN brands AS b ON pr.brand_id = b.id
    LEFT JOIN images AS img ON img.image_url IS NOT NULL
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
    pr.price::FLOAT as price,
    pr.release_year,
    COALESCE(array_agg(DISTINCT c.name), ARRAY[]::TEXT[]) AS categories,
    COALESCE(
        json_object_agg(DISTINCT pd.key, pd.value) 
        FILTER (WHERE pd.key IS NOT NULL AND pd.value IS NOT NULL), 
        '{}'::JSON
    ) AS details,
    json_agg(DISTINCT img.image_url) FILTER (WHERE img.image_url IS NOT NULL) AS images,
    COALESCE(b.name, 'Unknown') AS brand
  FROM 
    products AS pr
    LEFT JOIN product_categories AS pc ON pr.id = pc.product_id
    LEFT JOIN categories AS c ON pc.category_id = c.id
    LEFT JOIN product_details AS pd ON pr.id = pd.product_id
    LEFT JOIN brands AS b ON pr.brand_id = b.id
    LEFT JOIN images AS img ON img.image_url IS NOT NULL
    WHERE pr.id = $1
    GROUP BY pr.id, b.name
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export default { getAll, get };
