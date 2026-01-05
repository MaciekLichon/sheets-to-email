"use client";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface GridProps {
  rowData: any[];
  headers: any[];
  handleSelectionChanged: (event: any) => void;
}

const Grid = ({ rowData, headers, handleSelectionChanged }: GridProps) => {
  const getColDefs = () => {
    return headers.map((header) => ({ field: header }));
  };

  return (
    <div className="h-full">
      <AgGridReact
        rowData={rowData}
        columnDefs={getColDefs()}
        onSelectionChanged={handleSelectionChanged}
        rowSelection={{
          mode: "singleRow",
          enableClickSelection: true,
        }}
        autoSizeStrategy={{ type: "fitCellContents" }}
      />
    </div>
  );
};

export default Grid;
