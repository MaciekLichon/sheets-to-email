"use client";

import { useState } from "react";
import type { SelectionChangedEvent } from "ag-grid-community";

import Grid from "./Grid";
import RequestButton from "./requestButton";
import SignInButton from "./signInButton";
import SignOutButton from "./signOutButton";
import TextComposer from "./TextComposer";

interface MainProps {
  session: any;
}

const Main = ({ session }: MainProps) => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleGridDataUpdate = ({
    rowData,
    headers,
  }: {
    rowData: any[];
    headers: any[];
  }) => {
    setRowData(rowData);
    setHeaders(headers);
  };

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    const selected = event.selectedNodes;
    setSelectedRow(selected && selected.length > 0 ? selected[0].data : null);
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-rows-[auto_1fr] gap-10 size-full">
      {session?.user ? (
        <div className="flex justify-between items-center">
          <p>Welcome, {session.user.name}</p>
          <RequestButton onGridDataUpdate={handleGridDataUpdate} />
          <SignOutButton />
        </div>
      ) : (
        <div className="text-center">
          <SignInButton />
        </div>
      )}
      <section className="size-full grid grid-cols-2 gap-10">
        <Grid
          rowData={rowData}
          headers={headers}
          handleSelectionChanged={handleSelectionChanged}
        />
        <TextComposer headers={headers} selectedRow={selectedRow} />
      </section>
    </div>
  );
};

export default Main;
