import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { DATABASE_URL } from "../config";

declare global {
  var prisma: PrismaClient | undefined;
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 10,
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 10000,
  ssl: false,
});

const adapter = new PrismaPg(pool);

export const prisma = global.prisma || new PrismaClient({ adapter });