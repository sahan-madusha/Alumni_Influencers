import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal server error";
  let section = "GENERAL";
  let errors: any[] | undefined = [];

  console.log(err);

  /* =====================
     Domain / Business errors
  ====================== */
  if (err && typeof err === "object" && "statusCode" in err) {
    const customErr = err as any;
    statusCode = customErr.statusCode;
    message = customErr.message;
    section = customErr.section || "BUSINESS";
    errors = customErr.errors;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    /* =====================
     Prisma known errors
  ====================== */
    section = "DATABASE";

    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "Duplicate field value";
        errors = [
          {
            field: Array.isArray(err.meta?.target)
              ? err.meta.target.join(", ")
              : err.meta?.target,
            issue: "Already exists",
          },
        ];
        break;

      case "P2003": // Foreign key violation
        statusCode = 400;
        message = "Foreign key constraint failed";
        errors = [
          {
            field: Array.isArray(err.meta?.field_name)
              ? err.meta?.field_name.join(", ")
              : err.meta?.field_name,
            issue: "Invalid reference",
          },
        ];
        break;

      case "P2025":
        statusCode = 404;
        message = "Record not found";
        break;

      case "P2024":
        statusCode = 503;
        message = "Database connection timeout";
        break;

      default:
        statusCode = 400;
        message = "Database request error";
        break;
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    /* =====================
     Prisma validation errors
  ====================== */
    statusCode = 400;
    section = "DATABASE";
    message = "Invalid database query";
  } else {
    /* =====================
     Fallback / unexpected errors
  ====================== */
    if (process.env.NODE_ENV !== "production") {
      console.error("Unhandled error:", err);
      if (err instanceof Error) message = err.message;
    }
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    section,
    message,
    errors: errors?.length ? errors : undefined,
  });
};
