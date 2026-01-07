export interface SheetRow {
  [key: string]: string | null;
}

export interface SheetsApiResponse {
  headers: string[];
  rows: SheetRow[];
}
