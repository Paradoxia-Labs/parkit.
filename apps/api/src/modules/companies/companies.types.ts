export interface CreateCompanyDTO {
  legalName: string;
  commercialName?: string;
  taxId: string;
  countryCode?: string;
  currency?: string;
  timezone?: string;
  billingEmail?: string;
  contactPhone?: string;
  legalAddress?: string;
  brandingConfig?: Record<string, unknown>;
}

export interface UpdateCompanyDTO {
  legalName?: string;
  commercialName?: string;
  billingEmail?: string;
  contactPhone?: string;
  legalAddress?: string;
  brandingConfig?: Record<string, unknown>;
  status?: "PENDING" | "ACTIVE" | "SUSPENDED" | "INACTIVE";
}
