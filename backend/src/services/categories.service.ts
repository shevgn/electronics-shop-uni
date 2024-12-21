import { ServerError } from "@utils/errors.util";
import query from "@db/queries/categories.query";

const getAll = async () => {
  try {
    const categories = await query.findMany();
    return categories;
  } catch (error) {
    throw new ServerError(
      "Failed to fetch categories" + (error as Error).message,
    );
  }
};

const add = async (name: string) => {
  try {
    const category = await query.addOne(name);
    return category;
  } catch (error) {
    throw new ServerError("Failed to add category" + (error as Error).message);
  }
};

const deleteCategory = async (id: number) => {
  try {
    const isExist = await query.findOne(id);

    if (!isExist) {
      throw new ServerError("Category not found");
    }

    await query.deleteOne(id);
  } catch (error) {
    throw new ServerError(
      "Failed to delete Category" + (error as Error).message,
    );
  }
};

export default { getAll, add, deleteCategory };
