import { google } from "googleapis";
import { auth } from "@/auth";
import { SheetRow, SheetsApiResponse } from "@/types/sheets";
import { errorResponse } from "@/lib/errors/error-response";

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.accessToken) {
    return errorResponse("UNAUTHORIZED");
  }

  const { searchParams } = new URL(req.url);
  const spreadsheetId = searchParams.get("spreadsheetId");
  const sheetId = searchParams.get("sheetId");
  const getHeadersFromData = searchParams.get("headers") === "true";

  if (!isDefinedString(spreadsheetId)) {
    return errorResponse("MISSING_SPREADSHEET_ID");
  }

  if (!isDefinedString(sheetId)) {
    return errorResponse("MISSING_SHEET_ID");
  }

  const googleAuth = new google.auth.OAuth2();
  googleAuth.setCredentials({ access_token: session.accessToken });
  const sheets = google.sheets({ version: "v4", auth: googleAuth });

  try {
    const meta = await sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId,
    });

    const range = meta.data.sheets?.find(
      (sheet) => sheet.properties?.sheetId === parseInt(sheetId)
    )?.properties?.title;

    if (!range) {
      return errorResponse("INVALID_SHEET_ID");
    }

    const sheetsRes = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });

    const values: string[][] = sheetsRes.data.values ?? [];
    return Response.json(parseSheetValues(values, getHeadersFromData));
  } catch (error: any) {
    const status = error?.status || error?.code;

    switch (status) {
      // case 400:
      //   return errorResponse("INVALID_RANGE");
      case 403:
        return errorResponse("FORBIDDEN");
      case 404:
        // TODO: check if might be replaced with INVALID_SPREADSHEET_ID
        return errorResponse("NOT_FOUND");
      case 429:
        return errorResponse("RATE_LIMITED");
      default:
        return errorResponse("INTERNAL_ERROR");
    }
  }
}

const isDefinedString = (value: string | null): value is string =>
  !!value && value !== "null" && value !== "undefined";

const parseSheetValues = (
  values: string[][],
  getHeadersFromData: boolean
): SheetsApiResponse => {
  if (values.length === 0) {
    return {
      headers: [],
      rows: [],
    };
  }

  const [headersRow, ...rest] = values;
  const headers = getHeadersFromData
    ? headersRow
    : headersRow.map((_, index) => `column-${index + 1}`);
  const dataRows = getHeadersFromData ? rest : values;

  const rows: SheetRow[] = dataRows.map((row) => {
    const obj: SheetRow = {};
    headers?.forEach((header, index) => {
      obj[header] = row[index] ?? null;
    });
    return obj;
  });

  return { headers, rows };
};
