import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma";

export const auditMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  const originalEnd = res.end;

  res.end = function (chunk?: any, encoding?: any, callback?: any): Response {
    res.end = originalEnd;
    const result = res.end(chunk, encoding, callback);


    prisma.auditLog
      .create({
        data: {
          userId: req.user?.id || null,
          apiKeyId: (req.headers["x-api-key"] as string) || null,
          endpoint: req.originalUrl,
          method: req.method,
          statusCode: res.statusCode,
        },
      })
      .catch((err:any) => console.error("Audit log error:", err));

    return result;
  } as any;

  next();
};
