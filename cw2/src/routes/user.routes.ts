import { Router } from "express";
import { protect, validate, authLimiter } from "../middlewares";
import { userController } from "../controllers";
import {
  registerUserSchema,
  loginUserSchema,
  verifyEmailSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from "../models";

const router = Router();

router.get(
  "/",
  protect,
  userController.getAllUsers,
  /* 
    #swagger.tags = ['User']
    #swagger.path = '/user/'
    #swagger.description = 'Retrieve a list of all users. Required authorization.'
  */
);

router.post(
  "/register",
  authLimiter,
  validate(registerUserSchema),
  userController.registerUser,
  /*  
    #swagger.tags = ['User']
    #swagger.path = '/user/register'
    #swagger.description = 'Register a new user.'
  */
);
router.post(
  "/login",
  authLimiter,
  validate(loginUserSchema),
  userController.loginUser,
  /*  
    #swagger.tags = ['User']
    #swagger.path = '/user/login'
    #swagger.description = 'Login user and get JWT token.'
  */
);
router.post(
  "/logout",
  protect,
  userController.logoutUser,
  /* 
    #swagger.tags = ['User']
    #swagger.path = '/user/logout'
    #swagger.description = 'Logout the authenticated user. Required authorization.'
  */
);
router.post(
  "/email-verification",
  validate(verifyEmailSchema),
  userController.verifyEmail,
  /*  
    #swagger.tags = ['User']
    #swagger.path = '/user/email-verification'
    #swagger.description = 'Verify email using the token received during registration.'
  */
);
router.post(
  "/password-reset-request",
  authLimiter,
  validate(requestPasswordResetSchema),
  userController.requestPasswordReset,
  /*  
    #swagger.tags = ['User']
    #swagger.path = '/user/password-reset-request'
    #swagger.description = 'Request a password reset token via email.'
  */
);
router.post(
  "/password-reset",
  authLimiter,
  validate(resetPasswordSchema),
  userController.resetPassword,
  /*  
    #swagger.tags = ['User']
    #swagger.path = '/user/password-reset'
    #swagger.description = 'Reset password using the received token.'
  */
);

export const userRoutes = router;
