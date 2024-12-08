import { Router } from "express";
import ordersController from "@/controllers/orders.controller";
import { auth, checkRole } from "@/middlewares/auth.middleware";

const router = Router();

router.post("/", auth, ordersController.create);
router.delete(
  "/:orderId",
  auth,
  checkRole(["admin"]),
  ordersController.deleteOrder,
);

export default router;
