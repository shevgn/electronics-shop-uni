import { Router } from "express";
import usersController from "@/controllers/users.controller";

const router = Router();

router.get("/", usersController.getAll);
router.post("/login", usersController.login);
router.post("/register", usersController.register);

export default router;
