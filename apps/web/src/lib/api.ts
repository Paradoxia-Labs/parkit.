import axios, { AxiosInstance, AxiosError } from "axios";

export interface ApiError {
  success: false;
  message: string;
  errors?: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

type ApiEnvelope<T> = ApiResponse<T> | T;

class ApiClient {
  private client: AxiosInstance;

  private unwrap<T>(payload: ApiEnvelope<T>): T {
    if (
      typeof payload === "object" &&
      payload !== null &&
      "success" in payload &&
      "data" in payload
    ) {
      return (payload as ApiResponse<T>).data as T;
    }

    return payload as T;
  }

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor to include JWT token
    this.client.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        // Handle 401 - redirect to login
        if (error.response?.status === 401) {
          this.clearToken();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Token management
  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
  }

  public setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  }

  public clearToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  }

  // API methods
  public async get<T>(url: string): Promise<T> {
    const response = await this.client.get<ApiEnvelope<T>>(url);
    return this.unwrap<T>(response.data);
  }

  public async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<ApiEnvelope<T>>(url, data);
    return this.unwrap<T>(response.data);
  }

  public async patch<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.patch<ApiEnvelope<T>>(url, data);
    return this.unwrap<T>(response.data);
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<ApiEnvelope<T>>(url);
    return this.unwrap<T>(response.data);
  }
}

export const apiClient = new ApiClient();
