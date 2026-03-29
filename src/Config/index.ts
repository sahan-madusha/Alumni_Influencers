import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const APP_NAME = process.env.APP_NAME || "alumni-influencers";
const rawUrl = process.env.DATABASE_URL || "";
export const isLocalHost = process.env.NODE_ENV === "localhost";
export const DATABASE_URL = isLocalHost
  ? rawUrl
  : rawUrl.includes("sslmode=require") &&
      !rawUrl.includes("uselibpqcompat=true")
    ? `${rawUrl}&uselibpqcompat=true`
    : rawUrl;

export const JWT_SECRET = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV || "development";
