import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../shared/middleware/validateRequest";
import { LoginSchema } from "../../shared/validators";

const router = Router();

router.post("/register", validateRequest(LoginSchema), AuthController.register);
router.post("/login", validateRequest(LoginSchema), AuthController.login);

export default router;
