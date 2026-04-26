import { Router } from "express";
import { userController } from "../controllers";
import { validate } from "../middlewares";
import { registerUserSchema } from "../models";

const router = Router();

router.get("/", userController.renderLogin);
router.get("/register", userController.renderRegister);
router.get("/email-verification", userController.renderVerifyEmail);
router.post(
  "/register",
  validate(registerUserSchema),
  userController.registerUser,
);

export const loginRoutes = router;