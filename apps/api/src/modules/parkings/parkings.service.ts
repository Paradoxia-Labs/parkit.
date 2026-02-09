import { prisma } from "../../shared/prisma";
import type { ParkingType, SlotType } from "@prisma/client";

interface CreateParkingDTO {
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  type?: ParkingType;
  totalSlots: number;
  requiresBooking?: boolean;
}

interface UpdateParkingDTO {
  name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  type?: ParkingType;
  requiresBooking?: boolean;
}

export class ParkingsService {
  static async create(companyId: string, data: CreateParkingDTO) {
    return prisma.parking.create({
      data: {
        companyId,
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        type: data.type || "OPEN",
        totalSlots: data.totalSlots,
        requiresBooking: data.requiresBooking || false,
      },
      include: {
        slots: true,
      },
    });
  }

  static async list(companyId: string) {
    return prisma.parking.findMany({
      where: { companyId },
      include: {
        slots: {
          select: {
            id: true,
            label: true,
            isAvailable: true,
            slotType: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(companyId: string, parkingId: string) {
    return prisma.parking.findFirst({
      where: { id: parkingId, companyId },
      include: {
        slots: true,
        tickets: {
          where: { exitTime: null },
          select: {
            id: true,
            vehicle: {
              select: {
                plate: true,
                brand: true,
                model: true,
              },
            },
            slot: {
              select: {
                label: true,
              },
            },
          },
        },
      },
    });
  }

  static async update(
    companyId: string,
    parkingId: string,
    data: UpdateParkingDTO
  ) {
    return prisma.parking.update({
      where: { id: parkingId },
      data: {
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        ...(data.type !== undefined ? { type: data.type } : {}),
        requiresBooking: data.requiresBooking,
      },
      include: {
        slots: true,
      },
    });
  }

  static async getSlots(companyId: string, parkingId: string) {
    return prisma.parkingSlot.findMany({
      where: {
        parking: { id: parkingId, companyId },
      },
      include: {
        tickets: {
          where: { exitTime: null },
          select: {
            id: true,
            vehicle: {
              select: {
                plate: true,
              },
            },
          },
        },
      },
      orderBy: { label: "asc" },
    });
  }

  static async getAvailableSlots(companyId: string, parkingId: string) {
    return prisma.parkingSlot.findMany({
      where: {
        parking: { id: parkingId, companyId },
        isAvailable: true,
      },
      orderBy: { label: "asc" },
    });
  }

  static async createSlots(
    parkingId: string,
    slots: Array<{ label: string; slotType?: SlotType }>
  ) {
    const createdSlots = [];

    for (const slot of slots) {
      const created = await prisma.parkingSlot.create({
        data: {
          parkingId,
          label: slot.label,
          slotType: slot.slotType || "REGULAR",
        },
      });
      createdSlots.push(created);
    }

    return createdSlots;
  }
}
