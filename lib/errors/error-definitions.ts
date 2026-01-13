import { ApiErrorCode } from "./error-codes";

export const ERROR_DEFINITIONS: Record<
  ApiErrorCode,
  { status: number; message: string }
> = {
  MISSING_SPREADSHEET_ID: { status: 400, message: "Spreadsheet ID is missing" }, // try (works)
  INVALID_SPREADSHEET_ID: { status: 400, message: "Invalid spreadsheet ID" },
  MISSING_SHEET_ID: { status: 400, message: "Sheet tab ID is missing" }, // try (works)
  INVALID_SHEET_ID: { status: 400, message: "Invalid sheet tab ID" }, // try (works)
  INVALID_RANGE: { status: 400, message: "Invalid data range" },
  UNAUTHORIZED: { status: 401, message: "Authentication expired or invalid" }, // try (works)
  FORBIDDEN: { status: 403, message: "Access to spreadsheet denied" }, // catch (works)
  NOT_FOUND: { status: 404, message: "Spreadsheet not found" }, // try (works)
  RATE_LIMITED: { status: 429, message: "Rate limit exceeded" }, // catch
  INTERNAL_ERROR: { status: 500, message: "Internal server error" },
};
