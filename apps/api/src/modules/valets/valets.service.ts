import { prisma } from "../../shared/prisma";
import { ValetStatus } from "@prisma/client";
import { hashPassword } from "../auth/auth.utils";

interface CreateValetDTO {
  userId: string;
  licenseNumber: string;
  licenseExpiry: string;
  currentParkingId?: string;
}

interface UpdateValetDTO {
  licenseNumber?: string;
  licenseExpiry?: string;
  currentParkingId?: string;
  ratingAvg?: number;
}

export class ValetsService {
  static async create(companyId: string, data: CreateValetDTO) {
    const userExists = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!userExists) {
      throw new Error("User not found");
    }

    return prisma.valet.create({
      data: {
        companyId,
        userId: data.userId,
        licenseNumber: data.licenseNumber,
        licenseExpiry: new Date(data.licenseExpiry),
        currentParkingId: data.currentParkingId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  static async list(companyId: string, status?: string) {
    return prisma.valet.findMany({
      where: {
        companyId,
        currentStatus: status ? (status as ValetStatus) : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        assignments: {
          select: {
            id: true,
            ticketId: true,
            role: true,
            assignedAt: true,
          },
          orderBy: { assignedAt: "desc" },
          take: 5,
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(companyId: string, valetId: string) {
    return prisma.valet.findFirst({
      where: { id: valetId, companyId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        assignments: {
          include: {
            ticket: {
              select: {
                id: true,
                status: true,
                vehicle: {
                  select: {
                    plate: true,
                  },
                },
              },
            },
          },
          orderBy: { assignedAt: "desc" },
          take: 10,
        },
        damageReports: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });
  }

  static async update(
    companyId: string,
    valetId: string,
    data: UpdateValetDTO
  ) {
    return prisma.valet.update({
      where: { id: valetId },
      data: {
        licenseNumber: data.licenseNumber,
        licenseExpiry: data.licenseExpiry
          ? new Date(data.licenseExpiry)
          : undefined,
        currentParkingId: data.currentParkingId,
        ratingAvg: data.ratingAvg,
      },
      include: {
        user: true,
      },
    });
  }

  static async updateStatus(
    companyId: string,
    valetId: string,
    status: ValetStatus
  ) {
    return prisma.valet.update({
      where: { id: valetId },
      data: {
        currentStatus: status,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  static async deactivate(companyId: string, valetId: string) {
    return prisma.valet.update({
      where: { id: valetId },
      data: {
        currentStatus: ValetStatus.AWAY,
      },
    });
  }
}
