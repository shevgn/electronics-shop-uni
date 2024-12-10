import { Router } from "express";
import usersController from "@/controllers/users.controller";
import { auth, checkRole } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/", auth, checkRole(["admin"]), usersController.getAll);
router.post("/login", usersController.login);
router.post("/register", usersController.register);
router.delete("/", auth, checkRole(["admin"]), usersController.deleteUser);

export default router;
