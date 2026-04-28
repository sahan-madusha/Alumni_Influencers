import { Router } from "express";
import { userController } from "../controllers";
import { validate } from "../middlewares";
import { registerUserSchema } from "../models";

const router = Router();

router.get("/", userController.renderLogin);
router.get("/register", userController.renderRegister);
router.get("/email-verification", userController.renderVerifyEmail);
router.get("/forgot-password", userController.renderForgotPassword);
router.get("/password-reset", userController.renderResetPassword);
router.post(
  "/register",
  validate(registerUserSchema),
  userController.registerUser,
);

export const loginRoutes = router;