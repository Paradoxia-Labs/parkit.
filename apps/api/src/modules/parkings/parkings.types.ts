export interface CreateParkingDTO {
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  type?: "OPEN" | "COVERED" | "TOWER" | "UNDERGROUND" | "ELEVATOR";
  totalSlots: number;
  requiresBooking?: boolean;
}

export interface UpdateParkingDTO {
  name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  requiresBooking?: boolean;
}

export interface ParkingResponse {
  id: string;
  companyId: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  type: string;
  totalSlots: number;
  requiresBooking: boolean;
  createdAt: Date;
  updatedAt: Date;
}
