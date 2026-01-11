"use client";

import { FormEvent, useState } from "react";
import { SheetsApiResponse } from "@/types/sheets";
import { login } from "@/lib/actions/auth";

interface RequestFormProps {
  onGridDataUpdate: (v: SheetsApiResponse) => void;
}

const RequestForm = ({ onGridDataUpdate }: RequestFormProps) => {
  const [form, setForm] = useState({
    link: "",
    buildHeaders: false,
  });

  const extractSheetId = (url: string) => {
    const regex = /\/d\/([a-zA-Z0-9-_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sheetId = extractSheetId(form.link);

    // if (!sheetId) {
    //   // TODO: handle on server
    //   console.error("Invalid Google Sheets link");
    //   return;
    // }

    const res = await fetch(
      `/api/sheets?sheetId=${sheetId}&headers=${form.buildHeaders}`
    );
    const body = await res.json();

    if (!res.ok) {
      console.log(`Error ${res.status}`);
      console.log(`Message: ${body.error}`);
      if (res.status === 401) {
        await login();
        return;
      }
      return;
    }

    const data: SheetsApiResponse = body;
    onGridDataUpdate({ rows: data.rows, headers: data.headers });
  };

  return (
    <form className="flex items-center gap-2" onSubmit={(e) => handleSubmit(e)}>
      <div className="grid gap-1">
        <input
          className="bg-white w-full outline-none rounded-md px-2 py-1"
          type="text"
          name="link"
          placeholder="Google Sheets link..."
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            id="buildHeaders"
            name="buildHeaders"
            checked={form.buildHeaders}
            onChange={(e) =>
              setForm({ ...form, buildHeaders: e.target.checked })
            }
          />
          <label className="text-sm" htmlFor="buildHeaders">
            Use the first row as headers
          </label>
        </div>
      </div>
      <button type="submit" className="button-primary">
        Load sheet
      </button>
    </form>
  );
};

export default RequestForm;
