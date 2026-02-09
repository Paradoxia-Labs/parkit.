import type { Prisma } from "@prisma/client";

export interface AuditLogDTO {
  ticketId?: string;
  userId: string;
  action: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Prisma.InputJsonValue;
}
