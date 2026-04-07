import { Router } from "express";
import { protect,validate } from "../middlewares";
import { userController } from "../controllers";
import { registerUserSchema, loginUserSchema, verifyEmailSchema } from "../models";

const router = Router();

router.get("/", protect, userController.getAllUsers);
router.post("/register", validate(registerUserSchema), userController.registerUser);
router.post("/login", validate(loginUserSchema), userController.loginUser);
router.post("/email-verification", validate(verifyEmailSchema), userController.verifyEmail);

export const userRoutes = router;