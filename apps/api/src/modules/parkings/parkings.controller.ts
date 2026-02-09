import { Request, Response } from "express";
import { ParkingsService } from "./parkings.service";

export class ParkingsController {
  static async create(req: Request, res: Response) {
    try {
      const parking = await ParkingsService.create(
        req.user.companyId,
        req.body
      );

      res.status(201).json(parking);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const parkings = await ParkingsService.list(req.user.companyId);

      res.json(parkings);
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
      const parking = await ParkingsService.getById(
        req.user.companyId,
        id
      );

      if (!parking) {
        return res.status(404).json({ message: "Parking not found" });
      }

      res.json(parking);
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
      const parking = await ParkingsService.update(
        req.user.companyId,
        id,
        req.body
      );

      res.json(parking);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async getSlots(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const slots = await ParkingsService.getSlots(
        req.user.companyId,
        id
      );

      res.json(slots);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async getAvailableSlots(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const slots = await ParkingsService.getAvailableSlots(
        req.user.companyId,
        id
      );

      res.json(slots);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
