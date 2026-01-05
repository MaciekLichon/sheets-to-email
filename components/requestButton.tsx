"use client";

import { useState } from "react";

const RequestButton = () => {
  const [inputValue, setInputValue] = useState("");

  const extractSheetId = (url: string) => {
    const regex = /\/d\/([a-zA-Z0-9-_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleClick = async () => {
    const sheetId = extractSheetId(inputValue);
    const res = await fetch(`/api/sheets?sheetId=${sheetId}`);

    if (!res.ok) {
      console.error("Failed to load sheet");
      return;
    }

    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleClick}>Load sheet</button>
    </div>
  );
};

export default RequestButton;
