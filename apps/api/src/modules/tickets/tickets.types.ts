export interface CreateTicketDTO {
  bookingId?: string;
  parkingId: string;
  vehicleId: string;
  clientId: string;
  slotId?: string;
}

export interface UpdateTicketDTO {
  status?: string;
  slotId?: string;
}

export interface AssignValetDTO {
  valetId: string;
  role: "RECEPTOR" | "DRIVER" | "DELIVERER";
}

export interface ReportDamageDTO {
  valetId: string;
  description: string;
  photos?: Array<{
    url: string;
    label?: string;
  }>;
}

export interface AddReviewDTO {
  stars: number;
  comment?: string;
}

export interface TicketResponse {
  id: string;
  companyId: string;
  parkingId: string;
  vehicleId: string;
  clientId: string;
  status: string;
  entryTime: Date;
  exitTime?: Date;
  createdAt: Date;
}
