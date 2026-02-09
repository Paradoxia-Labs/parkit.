import { Router } from "express";
import { ClientsController } from "./clients.controller";
import { requireAuth } from "../../shared/middleware/requireAuth";
import { requireRole } from "../../shared/middleware/requireRole";

const router = Router();

router.use(requireAuth);
router.use(requireRole("ADMIN", "STAFF"));

router.post("/", ClientsController.create);
router.get("/", ClientsController.list);
router.get("/:id", ClientsController.getById);
router.patch("/:id", ClientsController.update);
router.get("/:id/vehicles", ClientsController.getVehicles);
router.post("/:id/vehicles", ClientsController.addVehicle);

export default router;
