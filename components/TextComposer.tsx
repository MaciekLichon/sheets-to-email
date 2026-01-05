"use client";

import { useState } from "react";
import TextArea from "./TextArea";
import TextPreview from "./TextPreview";

interface MailComposerProps {
  headers: string[];
  selectedRow: any | null;
}

const TextComposer = ({ headers, selectedRow }: MailComposerProps) => {
  const [rawText, setRawText] = useState("");

  const handleRawTextChange = (newText: string) => {
    setRawText(newText);
  };

  return (
    <div className="grid grid-rows-2 gap-10">
      <TextArea
        text={rawText}
        handleTextChange={handleRawTextChange}
        headers={headers}
      />
      <TextPreview text={rawText} selectedRow={selectedRow} />
    </div>
  );
};

export default TextComposer;
