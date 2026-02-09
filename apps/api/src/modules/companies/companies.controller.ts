import { Request, Response } from "express";
import { CompaniesService } from "./companies.service";

export class CompaniesController {
  static async create(req: Request, res: Response) {
    const company = await CompaniesService.create(req.body);
    res.status(201).json(company);
  }

  static async me(req: Request, res: Response) {
    const company = await CompaniesService.getById(req.user.companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  }

  static async update(req: Request, res: Response) {
    const company = await CompaniesService.update(
      req.user.companyId,
      req.body
    );

    res.json(company);
  }

  static async list(_req: Request, res: Response) {
    const companies = await CompaniesService.list();
    res.json(companies);
  }
}
