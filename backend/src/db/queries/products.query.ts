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

const addOne = async (
  client: any,
  product: Omit<Product, "images">,
): Promise<void> => {
  const { name, price, release_year, brand, categories, details } = product;

  const brandQuery = `
    INSERT INTO brands (name)
    VALUES ($1)
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name 
    RETURNING id;
  `;
  const brandResult = await client.query(brandQuery, [brand]);
  const brandId = brandResult.rows[0].id;

  const productQuery = `
      INSERT INTO products (name, price, release_year, brand_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
  const productResult = await client.query(productQuery, [
    name,
    price,
    release_year,
    brandId,
  ]);
  const productId = productResult.rows[0].id;

  if (categories.length > 0) {
    const categoryQuery = `
        INSERT INTO product_categories (product_id, category_id)
        SELECT $1, id
        FROM categories
        WHERE name = ANY($2::text[]);
      `;
    await client.query(categoryQuery, [productId, categories]);
  }

  if (Object.keys(details).length > 0) {
    const detailEntries = Object.entries(details);
    const detailQuery = `
        INSERT INTO product_details (product_id, key, value)
        VALUES 
        ${detailEntries
          .map((_, i) => `($1, $${i * 2 + 2}, $${i * 2 + 3})`)
          .join(", ")};
      `;
    const detailParams = detailEntries.flatMap(([key, value]) => [key, value]);
    await client.query(detailQuery, [productId, ...detailParams]);
  }
};

export default { getAll, get, addOne };
