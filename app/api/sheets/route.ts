import { google } from "googleapis";
import { auth } from "@/auth";
import { SheetRow, SheetsApiResponse } from "@/types/sheets";

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const sheetId = searchParams.get("sheetId");

  if (!sheetId) {
    return new Response("Bad Request: Missing sheetId", { status: 400 });
  }

  const googleAuth = new google.auth.OAuth2();
  googleAuth.setCredentials({ access_token: session.accessToken });

  const sheets = google.sheets({ version: "v4", auth: googleAuth });

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

  const headers = values[0];
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
}
