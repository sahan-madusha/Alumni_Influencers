import { Router } from "express";
import { protect, validate } from "../middlewares";
import { userController } from "../controllers";
import {
  registerUserSchema,
  loginUserSchema,
  verifyEmailSchema,
  requestPasswordResetSchema,
  verifyResetTokenSchema,
  resetPasswordSchema,
} from "../models";

const router = Router();

router.get("/", protect, userController.getAllUsers);
router.post(
  "/register",
  validate(registerUserSchema),
  userController.registerUser,
);
router.post("/login", validate(loginUserSchema), userController.loginUser);
router.post("/logout", protect, userController.logoutUser);
router.post(
  "/email-verification",
  validate(verifyEmailSchema),
  userController.verifyEmail,
);
router.get(
  "/password-reset-request",
  validate(requestPasswordResetSchema),
  userController.requestPasswordReset,
);
router.post(
  "/password-reset",
  validate(verifyResetTokenSchema),
  userController.verifyResetPassword,
);

export const userRoutes = router;
