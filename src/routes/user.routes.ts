import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", protect, userController.getAllUsers);
router.post("/register", userController.registerUser);

export const userRoutes = router;