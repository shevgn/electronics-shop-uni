import { Router } from "express";
import productsController from "@/controllers/products.controller";

const router = Router();

router.get("/", productsController.getAll);
router.get("/:id", productsController.get);

export default router;
