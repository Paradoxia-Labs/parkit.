import { Router } from "express";
import { ParkingsController } from "./parkings.controller";
import { requireAuth } from "../../shared/middleware/requireAuth";
import { requireRole } from "../../shared/middleware/requireRole";
import { validateRequest } from "../../shared/middleware/validateRequest";
import { CreateParkingSchema, UpdateParkingSchema } from "../../shared/validators";

const router = Router();

router.post("/", validateRequest(CreateParkingSchema), requireAuth, requireRole("ADMIN", "STAFF"), ParkingsController.create);
router.get("/", requireAuth, requireRole("ADMIN", "STAFF"), ParkingsController.list);
router.get("/:id", requireAuth, requireRole("ADMIN", "STAFF"), ParkingsController.getById);
router.patch("/:id", validateRequest(UpdateParkingSchema), requireAuth, requireRole("ADMIN", "STAFF"), ParkingsController.update);
router.get("/:id/slots", requireAuth, requireRole("ADMIN", "STAFF"), ParkingsController.getSlots);
router.get("/:id/slots/available", requireAuth, requireRole("ADMIN", "STAFF"), ParkingsController.getAvailableSlots);

export default router;
