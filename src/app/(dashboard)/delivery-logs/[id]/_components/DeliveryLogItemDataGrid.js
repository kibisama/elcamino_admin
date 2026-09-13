"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { handleReturnItem } from "@/actions/deliveries";

const rowHeight = 48;

export default function DeliveryLogItemDataGrid({ data, logId }) {
  const searchParams = useSearchParams();
  const qRxNumber = searchParams.get("rxNumber");
  const columns = React.useMemo(
    () => [
      {
        field: "rxNumber",
        headerName: "Rx #",
        type: "number",
        width: 90,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (
          <>
            {qRxNumber && params.value === qRxNumber ? (
              <mark>{params.value}</mark>
            ) : (
              params.value
            )}
          </>
        ),
      },
      {
        field: "rxDate",
        headerName: "Rx Date",
        type: "date",
        width: 100,
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => new Date(v),
        valueFormatter: (v) => dayjs(v).format("M. D. YY"),
      },
      {
        field: "patient",
        headerName: "Patient",
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
        field: "returnDate",
        headerName: "Returned",
        type: "date",
        width: 100,
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. D. YY"),
      },
      {
        field: "actions",
        type: "actions",
        width: 60,
        align: "center",
        resizable: false,
        getActions: (params) => (
          <GridActionsCellItem
            disabled={!!params.row.returnDate}
            key="return-item"
            icon={<BackspaceIcon />}
            onClick={() =>
              handleReturnItem(params.id, params.row.version, logId)
            }
          />
        ),
      },
    ],
    [logId],
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
