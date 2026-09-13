"use client";

import * as React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import PrintIcon from "@mui/icons-material/Print";
import FindInPageIcon from "@mui/icons-material/FindInPage";

const rowHeight = 48;

export default function DeliveryLogDataGrid({ data, rxNumber }) {
  const columns = React.useMemo(
    () => [
      {
        field: "date",
        headerName: "Date",
        type: "date",
        width: 140,
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => new Date(v),
        valueFormatter: (v) => dayjs(v).format("M. D. YY"),
      },
      {
        field: "stationDisplayName",
        headerName: "Delivery Group",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "session",
        headerName: "Session",
        width: 140,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "count",
        headerName: "Count",
        type: "number",
        width: 100,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "due",
        headerName: "Due",
        type: "number",
        width: 120,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "status",
        headerName: "Status",
        width: 140,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        align: "center",
        resizable: false,
        getActions: (params) => [
          <GridActionsCellItem
            key="see-log"
            component={Link}
            href={
              rxNumber
                ? `/delivery-logs/${params.id}?rxNumber=${rxNumber}`
                : `/delivery-logs/${params.id}`
            }
            icon={<FindInPageIcon />}
          />,
          <GridActionsCellItem key="print-log" icon={<PrintIcon />} />,
        ],
      },
    ],
    [rxNumber],
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
