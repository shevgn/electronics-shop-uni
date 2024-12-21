import productsService from "@/services/products.service";
import { Product, ProductStats } from "@/types/product.type";
import { NextFunction, Request, Response } from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products: Product[] = await productsService.getAll(
      req.query.category as string | undefined,
    );
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats: ProductStats[] = await productsService.getStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = await productsService.get(Number(req.params.id));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productsService.create(req.body);
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productsService.remove(Number(req.body.id));
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    next(error);
  }
};

export default { getAll, getStats, get, create, remove };
