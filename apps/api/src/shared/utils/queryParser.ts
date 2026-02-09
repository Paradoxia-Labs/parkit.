import { ParsedQs } from "qs";

export function parseQueryParam(value: string | string[] | ParsedQs | ParsedQs[] | undefined): string | undefined {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string") {
    return value[0];
  }
  return undefined;
}
