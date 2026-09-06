"use client";

import * as React from "react";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";

const rowHeight = 48;

export default function StationDataGrid({ data }) {
  const columns = React.useMemo(
    () => [
      {
        field: "invoiceCode",
        headerName: "Code",
        type: "number",
        width: 80,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "address",
        headerName: "Street",
        width: 240,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "city",
        headerName: "City",
        width: 160,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "zip",
        headerName: "Zip",
        width: 80,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "active",
        headerName: "Active",
        width: 80,
        headerAlign: "center",
        align: "center",
        valueFormatter: (v) => (v ? "Yes" : "No"),
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        align: "center",
        resizable: false,
        getActions: (params) => (
          <GridActionsCellItem key="print-pickup" icon={<EditIcon />} />
        ),
      },
    ],
    [],
  );
  return (
    <DataGrid
      columns={columns}
      rows={data}
      rowHeight={rowHeight}
      sx={{
        [`& .${gridClasses.row}:hover`]: {
          backgroundColor: "inherit",
        },
      }}
      autoPageSize
      showCellVerticalBorder
      showColumnVerticalBorder
      disableColumnMenu
      disableRowSelectionOnClick
    />
  );
}
