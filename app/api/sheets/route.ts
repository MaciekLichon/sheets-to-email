import { google } from "googleapis";
import { auth } from "@/auth";

export async function GET(req: Request) {
  const session = await auth();
  console.log(session);

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

  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Arkusz1",
  });

  return Response.json(resp.data.values ?? []);
}
