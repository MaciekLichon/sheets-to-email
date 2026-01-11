"use client";

import { FormEvent, useState } from "react";
import { SheetsApiResponse } from "@/types/sheets";
import { login } from "@/lib/actions/auth";

interface RequestFormProps {
  onGridDataUpdate: (v: SheetsApiResponse) => void;
}

interface ErrorState {
  status: number;
  message: string;
}

const RequestForm = ({ onGridDataUpdate }: RequestFormProps) => {
  const [form, setForm] = useState({
    link: "",
    buildHeaders: false,
  });
  const [error, setError] = useState<ErrorState>({ status: 0, message: "" });
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const extractFileIds = (url: string) => {
    const spreadsheetMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const spreadsheetId = spreadsheetMatch ? spreadsheetMatch[1] : null;

    const gidMatch = url.match(/[?#]gid=([0-9]+)/);
    const sheetId = gidMatch ? gidMatch[1] : null;

    return { spreadsheetId, sheetId };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { spreadsheetId, sheetId } = extractFileIds(form.link);

    // if (!sheetId) {
    //   // TODO: handle on server
    //   console.error("Invalid Google Sheets link");
    //   return;
    // }

    const res = await fetch(
      `/api/sheets?spreadsheetId=${spreadsheetId}&sheetId=${sheetId}&headers=${form.buildHeaders}`
    );
    const body = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        await login();
        setLoading(false);
        return;
      }

      setIsDialogOpen(true);
      setError({ status: res.status, message: body.error });
      setLoading(false);
      return;
    }

    const data: SheetsApiResponse = body;
    onGridDataUpdate({ rows: data.rows, headers: data.headers });
    setLoading(false);
  };

  return (
    <>
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
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
        <button
          type="submit"
          className="button-primary grid place-items-center"
        >
          <span
            className={`row-start-1 col-start-2 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          >
            Load sheet
          </span>
          <span
            className={`row-start-1 col-start-2 ${
              loading ? "opacity-100" : "opacity-0"
            }`}
          >
            Loading...
          </span>
        </button>
      </form>
      {isDialogOpen && (
        <>
          <div className="fixed inset-0 grid place-items-center overflow-auto z-20">
            <div className="bg-white px-8 py-6 rounded-lg max-w-xs w-4/5 grid justify-center justify-items-center shadow-2xl z-20">
              <div className="rounded-full bg-black size-16 grid place-items-center">
                <span className="w-3/5 h-1.5 rounded-full bg-white row-start-1 col-start-1 rotate-45"></span>
                <span className="w-3/5 h-1.5 rounded-full bg-white row-start-1 col-start-1 -rotate-45"></span>
              </div>
              <h2 className="mt-10 text-3xl font-bold">Error {error.status}</h2>
              <p className="mt-2 text-base text-center">{error.message}</p>
            </div>
            <div
              className="absolute inset-0 bg-black opacity-50 z-10"
              onClick={() => setIsDialogOpen(false)}
            ></div>
          </div>
        </>
      )}
    </>
  );
};

export default RequestForm;
