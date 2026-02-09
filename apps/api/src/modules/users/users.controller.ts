import { Request, Response } from "express";
import { UsersService } from "./users.service";

export class UsersController {
  static async create(req: Request, res: Response) {
    const user = await UsersService.create(
      req.user?.companyId!,
      req.body
    );

    res.status(201).json(user);
  }

  static async list(req: Request, res: Response) {
    const users = await UsersService.list(req.user?.companyId!);
    res.json(users);
  }

  static async get(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const user = await UsersService.getById(
      req.user?.companyId!,
      id
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  }

  static async update(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const user = await UsersService.update(
      req.user?.companyId!,
      id,
      req.body
    );

    res.json(user);
  }

  static async deactivate(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await UsersService.deactivate(
      req.user?.companyId!,
      id
    );

    res.status(204).send();
  }
}
