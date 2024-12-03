import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

dotenv.config();

export const JWT_SECRET: Secret = process.env.JWT_SECRET || "mysecret";
