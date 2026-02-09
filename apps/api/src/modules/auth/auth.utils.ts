import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT configuration - expires in 7 days for security balance between usability and token refresh
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = "7d";

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hash: string
) => {
  return bcrypt.compare(password, hash);
};

export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
