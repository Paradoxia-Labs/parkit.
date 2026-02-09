export interface CreateValetDTO {
  userId: string;
  licenseNumber: string;
  licenseExpiry: string;
  currentParkingId?: string;
}

export interface UpdateValetDTO {
  licenseNumber?: string;
  licenseExpiry?: string;
  currentParkingId?: string;
  ratingAvg?: number;
}

export interface ValetResponse {
  id: string;
  companyId: string;
  userId: string;
  licenseNumber: string;
  licenseExpiry: Date;
  currentStatus: string;
  ratingAvg: number;
  createdAt: Date;
  updatedAt: Date;
}
