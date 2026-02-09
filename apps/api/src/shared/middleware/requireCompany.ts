import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";

export async function requireCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const headerCompanyId = req.headers["x-company-id"] as string | undefined;

  if (headerCompanyId) {
    req.user.companyId = headerCompanyId;
    return next();
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    include: {
      valet: true,
      client: true,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (user.valet?.companyId) {
    req.user.companyId = user.valet.companyId;
    return next();
  }

  if (user.client?.companyId) {
    req.user.companyId = user.client.companyId;
    return next();
  }

  return res
    .status(403)
    .json({ message: "No company context available" });
}
