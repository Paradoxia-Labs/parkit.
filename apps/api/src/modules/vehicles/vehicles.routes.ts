import { Router } from "express";
import { VehiclesController } from "./vehicles.controller";
import { requireAuth } from "../../shared/middleware/requireAuth";
import { requireRole } from "../../shared/middleware/requireRole";

const router = Router();

router.use(requireAuth);
router.use(requireRole("ADMIN", "STAFF", "CUSTOMER"));

router.post("/", VehiclesController.create);
router.get("/", VehiclesController.list);
router.get("/by-plate", VehiclesController.getByPlate);
router.get("/:id", VehiclesController.getById);
router.patch("/:id", VehiclesController.update);

export default router;
