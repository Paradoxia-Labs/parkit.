import { Request, Response } from "express";
import { VehiclesService } from "./vehicles.service";
import { parseQueryParam } from "../../shared/utils/queryParser";

export class VehiclesController {
  static async create(req: Request, res: Response) {
    try {
      const vehicle = await VehiclesService.create(
        req.user.companyId,
        req.body
      );

      res.status(201).json(vehicle);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const vehicles = await VehiclesService.list(req.user.companyId);

      res.json(vehicles);
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
      const vehicle = await VehiclesService.getById(
        req.user.companyId,
        id
      );

      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      res.json(vehicle);
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
      const vehicle = await VehiclesService.update(
        req.user.companyId,
        id,
        req.body
      );

      res.json(vehicle);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async getByPlate(req: Request, res: Response) {
    try {
      const plateStr = parseQueryParam(req.query.plate as string | string[] | undefined) || '';
      const countryStr = parseQueryParam(req.query.countryCode as string | string[] | undefined) || 'CR';

      const vehicle = await VehiclesService.getByPlate(
        req.user.companyId,
        plateStr,
        countryStr
      );

      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      res.json(vehicle);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
