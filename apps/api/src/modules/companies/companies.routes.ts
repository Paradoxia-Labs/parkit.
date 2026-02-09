import { Router } from "express";
import { CompaniesController } from "./companies.controller";
import { requireAuth } from "../../shared/middleware/requireAuth";
import { requireCompany } from "../../shared/middleware/requireCompany";
import { requireRole } from "../../shared/middleware/requireRole";

const router = Router();

router.get(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  CompaniesController.list
);

router.post(
  "/",
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
  requireAuth,
  requireCompany,
  CompaniesController.update
);

export default router;
