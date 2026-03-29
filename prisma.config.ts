import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

dotenv.config();
const dbUrl = process.env.DATABASE_URL || "";

export default defineConfig({
  datasource: {
    url: dbUrl,
  },
  // migrations: {
  //   seed: "npx ts-node prisma/seed.ts",
  // },
});
