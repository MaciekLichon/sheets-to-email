import { google } from "googleapis";
import { auth } from "@/auth";
import { SheetRow, SheetsApiResponse } from "@/types/sheets";

const errorMessages: { [key: number]: string } = {
  400: "Bad Request: Missing sheetId", // missing sheetId or completely bad link format (id not extracted)
  401: "Unauthorized: Invalid or expired Google authentication", // unauthorized, user not logged in or token expired
  403: "Forbidden: Access to the spreadsheet is denied", // sheet exists but user has no access
  404: "Not Found: Spreadsheet not found", // valid sheets link but sheet with such id not found
  429: "Too Many Requests: Google API rate limit exceeded", // rate limit exceeded
};

const generateErrorResponse = (status: number, message: string) => {
  return Response.json({ error: message }, { status });
};

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.accessToken) {
    return generateErrorResponse(401, errorMessages[401]);
  }

  const { searchParams } = new URL(req.url);
  const sheetId = searchParams.get("sheetId");
  const includeHeaders = searchParams.get("headers") === "true";

  if (!sheetId || sheetId === "null" || sheetId === "undefined") {
    return generateErrorResponse(400, errorMessages[400]);
  }

  const googleAuth = new google.auth.OAuth2();
  googleAuth.setCredentials({ access_token: session.accessToken });
  const sheets = google.sheets({ version: "v4", auth: googleAuth });

  try {
    const sheetsRes = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Arkusz1",
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
    const status = error?.status || error?.code || 500; // fallback 500
    const message = errorMessages[status] || "Internal Server Error";

    return generateErrorResponse(status, message);
  }
}
