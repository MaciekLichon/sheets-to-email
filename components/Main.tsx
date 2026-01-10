"use client";

import { useState } from "react";
import { Session } from "next-auth";
import type { SelectionChangedEvent } from "ag-grid-community";

import { SheetRow, SheetsApiResponse } from "@/types/sheets";

import Grid from "./Grid";
import Navbar from "./Navbar/Navbar";
import TextArea from "./TextArea";
import TextPreview from "./TextPreview";

interface MainProps {
  session: Session | null;
}

const Main = ({ session }: MainProps) => {
  const [rowData, setRowData] = useState<SheetRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<SheetRow | null>(null);
  const [rawText, setRawText] = useState("");
  const [layoutVariant, setLayoutVariant] = useState(1);

  const handleGridDataUpdate = ({ headers, rows }: SheetsApiResponse) => {
    setRowData(rows);
    setHeaders(headers);
  };

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    const selected = event.selectedNodes;
    setSelectedRow(selected && selected.length > 0 ? selected[0].data : null);
  };

  const handleRawTextChange = (newText: string) => {
    setRawText(newText);
  };

  const handleLayoutChange = () => {
    setLayoutVariant((prev) => (prev === 4 ? 1 : prev + 1));
  };

  return (
    <div className="grid grid-rows-[auto_1fr] max-w-5xl mx-auto size-full">
      <Navbar
        session={session}
        layoutVariant={layoutVariant}
        handleLayoutChange={handleLayoutChange}
        handleGridDataUpdate={handleGridDataUpdate}
      />
      <div id="main" className={`variant-${layoutVariant} overflow-auto mt-5`}>
        <Grid
          rowData={rowData}
          headers={headers}
          handleSelectionChanged={handleSelectionChanged}
        />
        <TextArea
          text={rawText}
          headers={headers}
          handleTextChange={handleRawTextChange}
        />
        <TextPreview text={rawText} selectedRow={selectedRow} />
      </div>
    </div>
  );
};

export default Main;
