import { Router } from "express";
import categoriesController from "@controllers/categories.controller";
import { auth, checkRole } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/", auth, checkRole(["admin"]), categoriesController.getAll);
router.post("/", auth, checkRole(["admin"]), categoriesController.add);
router.delete(
  "/",
  auth,
  checkRole(["admin"]),
  categoriesController.deleteCategory,
);

export default router;
