import { prisma } from "../../shared/prisma";
import { AuditLogDTO } from "./audit.types";

interface AuditFilters {
  ticketId?: string;
  userId?: string;
}

export class AuditService {
  static async list(
    companyId: string,
    filters: AuditFilters,
    limit: number = 50,
    offset: number = 0
  ) {
    return prisma.auditLog.findMany({
      where: {
        ticket: filters.ticketId ? { companyId } : undefined,
        userId: filters.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        ticket: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });
  }

  static async getByTicket(companyId: string, ticketId: string) {
    return prisma.auditLog.findMany({
      where: {
        ticketId,
        ticket: { companyId },
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getByUser(companyId: string, userId: string) {
    return prisma.auditLog.findMany({
      where: {
        userId,
        user: { companyId },
      },
      include: {
        ticket: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async create(companyId: string, data: AuditLogDTO) {
    return prisma.auditLog.create({
      data: {
        ticketId: data.ticketId,
        userId: data.userId,
        action: data.action,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        metadata: data.metadata,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }
}
