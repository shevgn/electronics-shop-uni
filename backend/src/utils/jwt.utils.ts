import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/configs/global.config";

export const generateToken = (id: number, email: string, role: string) => {
  return jwt.sign(
    {
      id: id,
      email: email,
      role: role,
    },
    JWT_SECRET,
    { expiresIn: "1d" },
  );
};
