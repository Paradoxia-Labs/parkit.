import { Request, Response } from "express";
import { ClientsService } from "./clients.service";

export class ClientsController {
  static async create(req: Request, res: Response) {
    try {
      const client = await ClientsService.create(
        req.user?.companyId!,
        req.body
      );

      res.status(201).json(client);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const clients = await ClientsService.list(req.user?.companyId!);

      res.json(clients);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const client = await ClientsService.getById(
        req.user?.companyId!,
        id
      );

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.json(client);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const client = await ClientsService.update(
        req.user?.companyId!,
        id,
        req.body
      );

      res.json(client);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async getVehicles(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const vehicles = await ClientsService.getVehicles(
        req.user?.companyId!,
        id
      );

      res.json(vehicles);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async addVehicle(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const clientVehicle = await ClientsService.addVehicle(
        req.user?.companyId!,
        id,
        req.body
      );

      res.status(201).json(clientVehicle);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
