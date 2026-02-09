import { Request, Response } from "express";
import { AuditService } from "./audit.service";
import { parseQueryParam } from "../../shared/utils/queryParser";

export class AuditController {
  static async list(req: Request, res: Response) {
    try {
      const ticketIdStr = parseQueryParam(req.query.ticketId as string | string[] | undefined);
      const userIdStr = parseQueryParam(req.query.userId as string | string[] | undefined);
      const limitStr = parseQueryParam(req.query.limit as string | string[] | undefined) || "50";
      const offsetStr = parseQueryParam(req.query.offset as string | string[] | undefined) || "0";

        const logs = await AuditService.list(
          req.user.companyId,
        {
          ticketId: ticketIdStr,
          userId: userIdStr,
        },
        parseInt(limitStr),
        parseInt(offsetStr)
      );

      res.json(logs);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async getByTicket(req: Request, res: Response) {
    try {
      const ticketId = Array.isArray(req.params.ticketId) ? req.params.ticketId[0] : req.params.ticketId;
        const logs = await AuditService.getByTicket(
          req.user.companyId,
        ticketId
      );

      res.json(logs);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async getByUser(req: Request, res: Response) {
    try {
      const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
        const logs = await AuditService.getByUser(
          req.user.companyId,
        userId
      );

      res.json(logs);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
