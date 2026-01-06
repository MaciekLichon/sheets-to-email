"use client";

import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface GridProps {
  rowData: any[];
  headers: any[];
  handleSelectionChanged: (event: any) => void;
}

const myTheme = themeQuartz.withParams({
  backgroundColor: "transparent",
  wrapperBorder: false,
});

const Grid = ({ rowData, headers, handleSelectionChanged }: GridProps) => {
  const getColDefs = () => {
    return headers.map((header) => ({ field: header }));
  };

  return (
    <div className="box-wrapper rounded-[20px] h-full">
      <AgGridReact
        rowData={rowData}
        columnDefs={getColDefs()}
        onSelectionChanged={handleSelectionChanged}
        rowSelection={{
          mode: "singleRow",
          enableClickSelection: true,
        }}
        autoSizeStrategy={{ type: "fitCellContents" }}
        theme={myTheme}
      />
    </div>
  );
};

export default Grid;
