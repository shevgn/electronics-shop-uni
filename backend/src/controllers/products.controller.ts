import productsService from "@/services/products.service";
import { Product } from "@/types/product.type";
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

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = await productsService.get(Number(req.params.id));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export default { getAll, get };
