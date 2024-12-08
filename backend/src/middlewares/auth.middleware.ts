import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "@/configs/global.config";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Authorization token is required" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (
      !decoded ||
      typeof decoded !== "object" ||
      !decoded.id ||
      !decoded.email ||
      !decoded.role
    ) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.user = {
      id: decoded.id as number,
      email: decoded.email as string,
      role: decoded.role as string,
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden: insufficient role" });
      return;
    }

    next();
  };
};
