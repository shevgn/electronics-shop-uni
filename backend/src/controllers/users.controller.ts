import { NextFunction, Request, Response } from "express";
import usersService from "@services/users.service";

async function getAll(_: Request, res: Response) {
  const users = await usersService.getAll();
  res.json(users);
}

async function get(req: Request, res: Response): Promise<void> {
  const user = await usersService.get(Number(req.params.id));
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
}

async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await usersService.login(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await usersService.register(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export default { getAll, get, login, register };
