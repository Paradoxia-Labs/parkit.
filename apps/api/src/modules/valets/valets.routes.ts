import { Router } from "express";
import { ValetsController } from "./valets.controller";
import { requireAuth } from "../../shared/middleware/requireAuth";
import { requireRole } from "../../shared/middleware/requireRole";

const router = Router();

router.use(requireAuth);
router.use(requireRole("ADMIN", "STAFF"));

router.post("/", ValetsController.create);
router.get("/", ValetsController.list);
router.get("/:id", ValetsController.getById);
router.patch("/:id", ValetsController.update);
router.patch("/:id/status", ValetsController.updateStatus);
router.delete("/:id", ValetsController.deactivate);

export default router;
