import { Router } from "express";
import brandsController from "@/controllers/brands.controller";
import { auth, checkRole } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/", auth, checkRole(["admin"]), brandsController.getAll);
router.post("/", auth, checkRole(["admin"]), brandsController.add);
router.delete("/", auth, checkRole(["admin"]), brandsController.deleteBrand);

export default router;
