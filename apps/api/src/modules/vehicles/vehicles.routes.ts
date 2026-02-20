import { Router } from "express";
import { VehiclesController } from "./vehicles.controller";
import { requireAuth } from "../../shared/middleware/requireAuth";
import { requireRole } from "../../shared/middleware/requireRole";
import { validateRequest } from "../../shared/middleware/validateRequest";
import { CreateVehicleSchema, UpdateVehicleSchema } from "../../shared/validators";

const router = Router();

router.post("/", validateRequest(CreateVehicleSchema), requireAuth, requireRole("ADMIN", "STAFF", "CUSTOMER"), VehiclesController.create);
router.get("/", requireAuth, requireRole("ADMIN", "STAFF", "CUSTOMER"), VehiclesController.list);
router.get("/by-plate", requireAuth, requireRole("ADMIN", "STAFF", "CUSTOMER"), VehiclesController.getByPlate);
router.get("/:id", requireAuth, requireRole("ADMIN", "STAFF", "CUSTOMER"), VehiclesController.getById);
router.patch("/:id", validateRequest(UpdateVehicleSchema), requireAuth, requireRole("ADMIN", "STAFF", "CUSTOMER"), VehiclesController.update);

export default router;
