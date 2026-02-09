export interface AuditLogDTO {
  ticketId?: string;
  userId: string;
  action: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}
