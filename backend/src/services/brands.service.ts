import { ServerError } from "@/utils/errors.util";
import query from "@db/queries/brands.query";

const getAll = async () => {
  try {
    const brands = await query.findMany();
    return brands;
  } catch (error) {
    throw new ServerError("Failed to fetch brands" + (error as Error).message);
  }
};

const add = async (name: string) => {
  try {
    const brand = await query.addOne(name);
    return brand;
  } catch (error) {
    throw new ServerError("Failed to add brand" + (error as Error).message);
  }
};

const deleteBrand = async (id: number) => {
  try {
    const isExist = await query.findOne(id);

    if (!isExist) {
      throw new ServerError("Brand not found");
    }

    await query.deleteOne(id);
  } catch (error) {
    throw new ServerError("Failed to delete brand" + (error as Error).message);
  }
};

export default { getAll, add, deleteBrand };
