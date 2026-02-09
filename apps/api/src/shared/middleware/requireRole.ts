import { Request, Response, NextFunction } from "express";

type SystemRole = "ADMIN" | "STAFF" | "CUSTOMER";

// Middleware factory: returns middleware that enforces role-based access control
export const requireRole =
  (...allowedRoles: SystemRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if user role is in allowed roles list
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        message: "Insufficient permissions",
      });
    }

    next();
  };
