export interface CreateClientDTO {
  userId: string;
  governmentId: string;
  emergencyPhone?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface UpdateClientDTO {
  governmentId?: string;
  emergencyPhone?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface ClientResponse {
  id: string;
  userId: string;
  governmentId: string;
  companyId: string;
  emergencyPhone?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
