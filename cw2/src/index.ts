import express, { Application } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { prisma } from "./utils/prisma";
import { profileRoutes, userRoutes, bidRoutes, dashboardRoutes, loginRoutes } from "./routes";
import { errorHandler, globalLimiter } from "./middlewares";
import { initScheduler } from "./utils/scheduler";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger.json";
import { PORT } from "./config";

const app: Application = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
        "style-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "fonts.googleapis.com"],
        "font-src": ["'self'", "fonts.gstatic.com", "cdn.jsdelivr.net"],
        "img-src": ["'self'", "data:", "https:"],
        "connect-src": ["'self'"],
      },
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalLimiter);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/bid", bidRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

//View
app.use("/dashboard", dashboardRoutes);
app.use("/", loginRoutes );

app.use(errorHandler);

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server is listening on 0.0.0.0:${PORT}`);
  initScheduler();
});
