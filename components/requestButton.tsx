"use client";

import { SheetsApiResponse } from "@/types/sheets";
import { useState } from "react";

interface RequestButtonProps {
  onGridDataUpdate: (v: SheetsApiResponse) => void;
}

const RequestButton = ({ onGridDataUpdate }: RequestButtonProps) => {
  // const [inputValue, setInputValue] = useState("");
  const [form, setForm] = useState({
    link: "",
    useFirstRowAsHeaders: false,
  });

  const extractSheetId = (url: string) => {
    const regex = /\/d\/([a-zA-Z0-9-_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleClick = async () => {
    const sheetId = extractSheetId(form.link);
    const res = await fetch(
      `/api/sheets?sheetId=${sheetId}&headers=${form.useFirstRowAsHeaders}`
    );

    if (!res.ok) {
      console.error("Failed to load sheet");
      return;
    }

    const data: SheetsApiResponse = await res.json();
    onGridDataUpdate({ rows: data.rows, headers: data.headers });
  };

  return (
    <div className="flex items-center gap-2">
      <div>
        <input
          className="bg-white"
          type="text"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.useFirstRowAsHeaders}
            onChange={(e) =>
              setForm({ ...form, useFirstRowAsHeaders: e.target.checked })
            }
          />
          <label className="text-sm">Turn the first row into headers</label>
        </div>
      </div>
      <button onClick={handleClick}>Load sheet</button>
    </div>
  );
};

export default RequestButton;
