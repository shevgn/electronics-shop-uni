import categoriesService from "@services/categories.service";
import { Request, Response, NextFunction } from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await categoriesService.getAll();
    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = await categoriesService.add(req.body.name);

    res.status(201).json({
      message: "Brand added successfully",
      brand,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await categoriesService.deleteCategory(req.body.id);
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default { getAll, add, deleteCategory };
