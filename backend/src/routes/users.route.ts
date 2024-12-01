import { Router, Request, Response } from "express";
import usersController from "@/controllers/users.controller";

const router = Router();

router.get("/:id", usersController.get);

router.post("/", usersController.create);

router.put("/:id", usersController.update);

router.delete("/:id", usersController.remove);

export default router;
