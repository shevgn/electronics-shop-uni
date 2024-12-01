import { Request, Response } from "express";
import usersService from "@services/users.service";

async function get(req: Request, res: Response) {
  const users = await usersService.get(Number(req.params.id));
  res.json(users);
}

async function create(req: Request, res: Response) {
  const user = await usersService.create(req.body.id, req.body.name);
  res.json(user);
}

async function update(req: Request, res: Response) {
  const user = await usersService.update(req.body.id, req.body.name);
  res.json(user);
}

async function remove(req: Request, res: Response) {
  const user = await usersService.remove(Number(req.params.id));
  res.json(user);
}

export default { get, create, update, remove };
