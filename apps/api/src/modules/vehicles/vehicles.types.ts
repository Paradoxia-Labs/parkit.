export interface CreateVehicleDTO {
  plate: string;
  brand: string;
  model: string;
  year?: number;
  countryCode?: string;
  dimensions?: Record<string, unknown>;
}

export interface UpdateVehicleDTO {
  brand?: string;
  model?: string;
  year?: number;
  dimensions?: Record<string, unknown>;
}

export interface VehicleResponse {
  id: string;
  companyId: string;
  plate: string;
  brand: string;
  model: string;
  year?: number;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
}
