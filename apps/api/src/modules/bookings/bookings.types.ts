export interface CreateBookingDTO {
  clientId: string;
  vehicleId: string;
  parkingId: string;
  scheduledEntryTime: string;
  scheduledExitTime?: string;
}

export interface UpdateBookingDTO {
  status?: string;
  scheduledEntryTime?: string;
  scheduledExitTime?: string;
}

export interface BookingResponse {
  id: string;
  status: string;
  scheduledEntryTime: Date;
  scheduledExitTime?: Date;
  clientId: string;
  vehicleId: string;
  parkingId: string;
  createdAt: Date;
  updatedAt: Date;
}
