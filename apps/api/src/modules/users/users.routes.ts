import { Router } from "express";
import { UsersController } from "./users.controller";
import { requireAuth } from "../../shared/middleware/requireAuth";
import { requireRole } from "../../shared/middleware/requireRole";

const router = Router();

router.use(requireAuth);
router.use(requireRole("ADMIN", "STAFF"));

router.post("/", UsersController.create);
router.get("/", UsersController.list);
router.get("/:id", UsersController.get);
router.patch("/:id", UsersController.update);
router.delete("/:id", UsersController.deactivate);

export default router;
