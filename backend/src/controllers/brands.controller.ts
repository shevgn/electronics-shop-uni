import brandsService from "@/services/brands.service";
import { Request, Response, NextFunction } from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await brandsService.getAll();
    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = await brandsService.add(req.body.name);

    res.status(201).json({
      message: "Brand added successfully",
      brand,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await brandsService.deleteBrand(req.body.id);
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default { getAll, add, deleteBrand };
