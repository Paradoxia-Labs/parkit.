import { Request, Response } from "express";
import { TicketsService } from "./tickets.service";
import { parseQueryParam } from "../../shared/utils/queryParser";

export class TicketsController {
  static async create(req: Request, res: Response) {
    try {
      const ticket = await TicketsService.create(
        req.user?.companyId!,
        req.body
      );

      res.status(201).json(ticket);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const statusStr = parseQueryParam(req.query.status as string | string[] | undefined);
      const clientIdStr = parseQueryParam(req.query.clientId as string | string[] | undefined);
      const valetIdStr = parseQueryParam(req.query.valetId as string | string[] | undefined);

      const tickets = await TicketsService.list(
        req.user?.companyId!,
        {
          status: statusStr,
          clientId: clientIdStr,
          valetId: valetIdStr,
        }
      );

      res.json(tickets);
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
      const ticket = await TicketsService.getById(
        req.user?.companyId!,
        id
      );

      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      res.json(ticket);
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
      const ticket = await TicketsService.update(
        req.user?.companyId!,
        id,
        req.body
      );

      res.json(ticket);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async assignValet(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const assignment = await TicketsService.assignValet(
        req.user?.companyId!,
        id,
        req.body
      );

      res.status(201).json(assignment);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async reportDamage(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const damageReport = await TicketsService.reportDamage(
        req.user?.companyId!,
        id,
        req.body
      );

      res.status(201).json(damageReport);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async addReview(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const review = await TicketsService.addReview(
        req.user?.companyId!,
        id,
        req.body
      );

      res.status(201).json(review);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async checkout(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const ticket = await TicketsService.checkout(
        req.user?.companyId!,
        id
      );

      res.json(ticket);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
