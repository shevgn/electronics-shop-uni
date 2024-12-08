import ordersService from "@services/orders.service";
import { NextFunction, Request, Response } from "express";

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
    const orderId = Number(req.params.orderId);
    if (!orderId) {
      res.status(400).json({ error: "Invalid order ID" });
    }

    await ordersService.deleteOrder(orderId);
    res.status(204).json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default { create, deleteOrder };
