import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import { PORT } from "./Config";

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import { errorHandler } from "./Middlewares";
import helmet from "helmet";
import {
  userRoute,
} from "./Routes";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", async (req, res) => {
  // #swagger.tags = ['Health']
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "OK",
      database: "Connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: "Error",
      database: "Disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/v1/user", userRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use(errorHandler);

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server is listening on 0.0.0.0:${PORT}`);
});