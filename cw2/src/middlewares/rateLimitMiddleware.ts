import rateLimit from "express-rate-limit";
import { RATE_LIMIT_WINDOW } from "../config";

export const globalLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
});

export const authLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many authentication attempts, please try again after 15 minutes",
  },
});
