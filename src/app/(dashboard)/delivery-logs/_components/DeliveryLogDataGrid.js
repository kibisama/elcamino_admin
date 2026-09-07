"use client";

import * as React from "react";
import dayjs from "dayjs";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import BackspaceIcon from "@mui/icons-material/Backspace";

const rowHeight = 48;

export default function DeliveryLogDataGrid({ data }) {
  const columns = React.useMemo(
    () => [
      {
        field: "time",
        headerName: "",
        type: "date",
        width: 90,
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => new Date(v),
        valueFormatter: (v) => dayjs(v).format("hh:mm A"),
      },
      {
        field: "rxNumber",
        headerName: "Rx #",
        type: "number",
        width: 100,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "rxDate",
        headerName: "Rx Date",
        type: "date",
        width: 90,
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => new Date(v),
        valueFormatter: (v) => dayjs(v).format("M. DD. YY"),
      },
      {
        field: "patient",
        headerName: "Patient",
        width: 180,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "doctorName",
        headerName: "Prescriber",
        width: 180,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "drugName",
        headerName: "Drug Name",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "rxQty",
        headerName: "Qty",
        width: 60,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "plan",
        headerName: "Plan",
        width: 80,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "patPay",
        headerName: "Copay",
        width: 80,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "actions",
        type: "actions",
        width: 60,
        align: "center",
        resizable: false,
        getActions: (params) => (
          <GridActionsCellItem key="return-item" icon={<BackspaceIcon />} />
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
        maxHeight: rowHeight * 100,
        [`& .${gridClasses.row}:hover`]: {
          backgroundColor: "inherit",
        },
        "& .MuiDataGrid-columnHeader--last .MuiDataGrid-columnSeparator": {
          display: "none",
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
