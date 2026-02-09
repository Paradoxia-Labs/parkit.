import { Router } from "express";
import { ParkingsController } from "./parkings.controller";
import { requireAuth } from "../../shared/middleware/requireAuth";
import { requireRole } from "../../shared/middleware/requireRole";

const router = Router();

router.use(requireAuth);
router.use(requireRole("ADMIN", "STAFF"));

router.post("/", ParkingsController.create);
router.get("/", ParkingsController.list);
router.get("/:id", ParkingsController.getById);
router.patch("/:id", ParkingsController.update);
router.get("/:id/slots", ParkingsController.getSlots);
router.get("/:id/slots/available", ParkingsController.getAvailableSlots);

export default router;
