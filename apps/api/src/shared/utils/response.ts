import { Response } from "express";

interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

interface ApiError {
  success: false;
  message: string;
  errors?: unknown;
}

export function ok<T>(res: Response, data: T, message?: string) {
  const payload: ApiSuccess<T> = { success: true, data };
  if (message) payload.message = message;
  return res.status(200).json(payload);
}

export function created<T>(res: Response, data: T, message?: string) {
  const payload: ApiSuccess<T> = { success: true, data };
  if (message) payload.message = message;
  return res.status(201).json(payload);
}

export function fail(res: Response, status: number, message: string, errors?: unknown) {
  const payload: ApiError = { success: false, message };
  if (errors !== undefined) payload.errors = errors;
  return res.status(status).json(payload);
}

export function notFound(res: Response, message: string) {
  return fail(res, 404, message);
}
