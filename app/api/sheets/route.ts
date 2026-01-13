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
  const includeHeaders = searchParams.get("headers") === "true";

  if (
    !spreadsheetId ||
    spreadsheetId === "null" ||
    spreadsheetId === "undefined"
  ) {
    return errorResponse("MISSING_SPREADSHEET_ID");
  }

  if (!sheetId || sheetId === "null" || sheetId === "undefined") {
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

    if (values.length === 0) {
      return Response.json({
        headers: [],
        rows: [],
      });
    }

    const headers = includeHeaders
      ? values[0]
      : values[0].map((_, index) => `column-${index + 1}`);
    const dataRows = values.slice(1);

    const rows: SheetRow[] = dataRows.map((row) => {
      const obj: SheetRow = {};
      headers?.forEach((header, index) => {
        obj[header] = row[index] ?? null;
      });
      return obj;
    });

    const res: SheetsApiResponse = {
      headers,
      rows,
    };

    return Response.json(res);
  } catch (error: any) {
    const status = error?.status || error?.code;

    // if (status === 400) {
    //   return errorResponse("INVALID_RANGE");
    // }

    if (status === 403) {
      return errorResponse("FORBIDDEN");
    }

    // TODO: check if might be replaced with INVALID_SPREADSHEET_ID
    if (status === 404) {
      return errorResponse("NOT_FOUND");
    }

    if (status === 429) {
      return errorResponse("RATE_LIMITED");
    }

    return errorResponse("INTERNAL_ERROR");
  }
}
