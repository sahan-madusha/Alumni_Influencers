import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", protect, userController.getAllUsers);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/email-verification", userController.verifyEmail);
// router.post("/logout", protect, userController.logoutUser);
// router.post("/password/reset", protect, userController.resetPassword);

export const userRoutes = router;