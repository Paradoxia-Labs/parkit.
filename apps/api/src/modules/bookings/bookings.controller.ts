import { Request, Response } from "express";
import { BookingsService } from "./bookings.service";
import { parseQueryParam } from "../../shared/utils/queryParser";

export class BookingsController {
  static async create(req: Request, res: Response) {
    try {
      const booking = await BookingsService.create(
        req.user?.companyId!,
        req.body
      );

      res.status(201).json(booking);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const { status, clientId } = req.query;
      const statusStr = parseQueryParam(status);
      const clientIdStr = parseQueryParam(clientId);

      const bookings = await BookingsService.list(
        req.user?.companyId!,
        {
          status: statusStr,
          clientId: clientIdStr,
        }
      );

      res.json(bookings);
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
      const booking = await BookingsService.getById(
        req.user?.companyId!,
        id
      );

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json(booking);
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
      const booking = await BookingsService.update(
        req.user?.companyId!,
        id,
        req.body
      );

      res.json(booking);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async cancel(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const booking = await BookingsService.cancel(
        req.user?.companyId!,
        id
      );

      res.json(booking);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
