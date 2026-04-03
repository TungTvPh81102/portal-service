import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { ApiError, HttpStatus } from "@/types/api";
import { ERROR_MESSAGES } from "@/constants/error-messages";

const API_BASE_URL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
    : "/api";
const API_TIMEOUT = 10000;

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        const csrfToken = this.getCsrfToken();
        if (csrfToken) {
          config.headers["X-CSRF-TOKEN"] = csrfToken;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        return this.handleError(error);
      }
    );
  }

  private handleError(error: AxiosError): Promise<never> {
    const apiError: ApiError = {
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
      status: 500,
    };

    if (error.response) {
      const { status, data } = error.response;
      apiError.status = status;

      switch (status) {
        case HttpStatus.BAD_REQUEST:
          apiError.message = ERROR_MESSAGES.BAD_REQUEST;
          break;
        case HttpStatus.UNAUTHORIZED:
          apiError.message = ERROR_MESSAGES.UNAUTHORIZED;
          this.handleUnauthorized();
          break;
        case HttpStatus.FORBIDDEN:
          apiError.message = ERROR_MESSAGES.FORBIDDEN;
          break;
        case HttpStatus.NOT_FOUND:
          apiError.message = ERROR_MESSAGES.NOT_FOUND;
          break;
        case HttpStatus.UNPROCESSABLE_ENTITY:
          apiError.message = ERROR_MESSAGES.VALIDATION_ERROR;
          if (data && typeof data === "object" && "errors" in data) {
            apiError.errors = (data as any).errors;
          }
          break;
        case HttpStatus.INTERNAL_SERVER_ERROR:
          apiError.message = ERROR_MESSAGES.SERVER_ERROR;
          break;
        case HttpStatus.SERVICE_UNAVAILABLE:
          apiError.message = ERROR_MESSAGES.SERVICE_UNAVAILABLE;
          break;
        default:
          apiError.message = `Lỗi ${status}: ${this.getErrorMessage(data)}`;
      }

      if (data && typeof data === "object") {
        const laravelData = data as any;
        if (laravelData.message) {
          apiError.message = laravelData.message;
        }
      }
    } else if (error.request) {
      apiError.message = ERROR_MESSAGES.NETWORK_ERROR;
      apiError.status = 0;
    } else {
      apiError.message = error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
    }

    return Promise.reject(apiError);
  }

  private getErrorMessage(data: any): string {
    if (typeof data === "string") return data;
    if (data && typeof data === "object") {
      if (data.message) return data.message;
      if (data.error) return data.error;
    }
    return "Lỗi không xác định";
  }

  private handleUnauthorized() {
    this.clearAuthTokenStorage();

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  private getAuthToken(key?: string): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getLocalStorage(key);
  }

  private clearAuthTokenStorage(key?: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeLocalStorage(key);
  }

  private getCsrfToken(): string | null {
    if (typeof window === "undefined") return null;
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || null;
  }

  public async download(url: string, filename?: string): Promise<void> {
    const response = await this.instance.get(url, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }
}

const apiClient = new ApiClient();

export default apiClient;
export { ApiClient };
