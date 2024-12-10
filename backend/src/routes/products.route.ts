import { Router } from "express";
import productsController from "@/controllers/products.controller";
import { auth, checkRole } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/", productsController.getAll);
router.get("/:id", productsController.get);
router.post("/", auth, checkRole(["admin"]), productsController.create);
//router.delete("/:id", auth, checkRole(["admin"]), productsController.remove);

export default router;
