export interface NotificationDTO {
  title: string;
  body: string;
  type: "PUSH" | "SMS" | "EMAIL";
}

export interface NotificationResponse {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
