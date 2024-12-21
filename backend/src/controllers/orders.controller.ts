import ordersService from "@services/orders.service";
import { NextFunction, Request, Response } from "express";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await ordersService.getAll();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const order = await ordersService.create(req.user.id, req.body.items);

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ordersService.deleteOrder(req.body.id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default { getAll, create, deleteOrder };
