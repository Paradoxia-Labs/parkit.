import { Router } from "express";
import { CompaniesController } from "./companies.controller";
import { requireAuth } from "../../shared/middleware/requireAuth";
import { requireCompany } from "../../shared/middleware/requireCompany";
import { requireRole } from "../../shared/middleware/requireRole";
import { validateRequest } from "../../shared/middleware/validateRequest";
import { CreateCompanySchema, UpdateCompanySchema } from "../../shared/validators";

const router = Router();

router.get(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  CompaniesController.list
);

router.post(
  "/",
  validateRequest(CreateCompanySchema),
  requireAuth,
  requireRole("ADMIN"),
  CompaniesController.create
);

router.get(
  "/me",
  requireAuth,
  requireCompany,
  CompaniesController.me
);

router.patch(
  "/me",
  validateRequest(UpdateCompanySchema),
  requireAuth,
  requireCompany,
  CompaniesController.update
);

export default router;
