import { Router } from "express";
import { BookingsController } from "./bookings.controller";
import { requireAuth } from "../../shared/middleware/requireAuth";
import { requireRole } from "../../shared/middleware/requireRole";

const router = Router();

router.use(requireAuth);
router.use(requireRole("ADMIN", "STAFF", "CUSTOMER"));

router.post("/", BookingsController.create);
router.get("/", BookingsController.list);
router.get("/:id", BookingsController.getById);
router.patch("/:id", BookingsController.update);
router.patch("/:id/cancel", BookingsController.cancel);

export default router;
