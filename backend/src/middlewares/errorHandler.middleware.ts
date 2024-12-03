import { Request, Response, NextFunction } from "express";
import { ServerError } from "@/utils/errors.util";

function errorHandler(
  err: ServerError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof ServerError) {
    res.status(err.status).json({ error: err.message, details: err.details });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default errorHandler;
