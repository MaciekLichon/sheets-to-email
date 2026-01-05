import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/auth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth();
  console.log(session);

  if (!session?.accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const googleAuth = new google.auth.OAuth2();
  googleAuth.setCredentials({ access_token: session.accessToken });

  const sheets = google.sheets({ version: "v4", auth: googleAuth });

  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: "1FUIDNzlAGWekCh9SfqnNflWG5Xe9-fOBoNFDjcbLjPk",
    range: "Arkusz1",
  });

  return Response.json(resp.data.values ?? []);
}
