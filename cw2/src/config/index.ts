import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const APP_NAME = process.env.APP_NAME;
export const JWT_SECRET = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = process.env.DB_PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const EMAIL_FROM = process.env.EMAIL_FROM;

export const ALLOWED_DOMAINS = ["iit.ac.lk"];
export const TOKEN_EXPIRE_MINUTES = 10;
export const MAX_FAILED_LOGIN_ATTEMPTS = 5;
export const ACCOUNT_LOCK_DURATION_MINUTES = 10;
export const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
export const WINNER_SELECTION_SCHEDULE = "0 18 * * *";