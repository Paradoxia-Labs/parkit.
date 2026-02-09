import { Request, Response } from "express";
import { ValetsService } from "./valets.service";
import { parseQueryParam } from "../../shared/utils/queryParser";

export class ValetsController {
  static async create(req: Request, res: Response) {
    try {
      const valet = await ValetsService.create(
        req.user?.companyId!,
        req.body
      );

      res.status(201).json(valet);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const { status } = req.query;
      const statusStr = parseQueryParam(status);

      const valets = await ValetsService.list(
        req.user?.companyId!,
        statusStr
      );

      res.json(valets);
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
      const valet = await ValetsService.getById(
        req.user?.companyId!,
        id
      );

      if (!valet) {
        return res.status(404).json({ message: "Valet not found" });
      }

      res.json(valet);
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const valet = await ValetsService.update(
        req.user?.companyId!,
        id,
        req.body
      );

      res.json(valet);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const valet = await ValetsService.updateStatus(
        req.user?.companyId!,
        id,
        req.body.status
      );

      res.json(valet);
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  static async deactivate(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await ValetsService.deactivate(
        req.user?.companyId!,
        id
      );

      res.status(204).send();
    } catch (error: unknown) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
