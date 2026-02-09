import { Router } from "express";
import { TicketsController } from "./tickets.controller";
import { requireAuth } from "../../shared/middleware/requireAuth";
import { requireRole } from "../../shared/middleware/requireRole";

const router = Router();

router.use(requireAuth);
router.use(requireRole("ADMIN", "STAFF", "CUSTOMER"));

router.post("/", TicketsController.create);
router.get("/", TicketsController.list);
router.get("/:id", TicketsController.getById);
router.patch("/:id", TicketsController.update);
router.post("/:id/assign-valet", TicketsController.assignValet);
router.post("/:id/damage-report", TicketsController.reportDamage);
router.post("/:id/review", TicketsController.addReview);
router.patch("/:id/checkout", TicketsController.checkout);

export default router;
