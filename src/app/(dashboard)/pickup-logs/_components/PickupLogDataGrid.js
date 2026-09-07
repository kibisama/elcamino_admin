"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import PrintIcon from "@mui/icons-material/Print";

const rowHeight = 48;

export default function PickupLogDataGrid({ data }) {
  const searchParams = useSearchParams();
  const qRxNumber = searchParams.get("rxNumber");
  const columns = React.useMemo(
    () => [
      {
        field: "rxNumber",
        headerName: "Rx #",
        width: 100,
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: (params) => (
          <>
            {qRxNumber && params.value === qRxNumber ? (
              <mark>{params.value}</mark>
            ) : (
              params.value
            )}
          </>
        ),
        rowSpanValueGetter: () => null,
      },
      {
        field: "deliveryDate",
        headerName: "Pickup Date",
        type: "date",
        width: 140,
        headerAlign: "center",
        align: "center",
        cellClassName: "rowspan",
        valueGetter: (v) => new Date(v),
        valueFormatter: (v) => dayjs(v).format("M. D. YYYY HH:mm"),
        rowSpanValueGetter: (v, row) => row.pickupId,
      },
      {
        field: "patientName",
        headerName: "Patient Name",
        width: 200,
        headerAlign: "center",
        align: "center",
        sortable: false,
        rowSpanValueGetter: () => null,
      },
      {
        field: "drugName",
        headerName: "Drug Name",
        width: 240,
        headerAlign: "center",
        align: "center",
        sortable: false,
        rowSpanValueGetter: () => null,
      },
      {
        field: "relation",
        headerName: "Relation",
        width: 120,
        headerAlign: "center",
        align: "center",
        cellClassName: "rowspan",
        sortable: false,
        rowSpanValueGetter: (v, row) => row.pickupId,
      },
      {
        field: "notes",
        headerName: "Notes",
        headerAlign: "center",
        align: "center",
        flex: 1,
        sortable: false,
        editable: true,
        rowSpanValueGetter: (v, row) => row.pickupId,
      },
      {
        field: "actions",
        type: "actions",
        width: 60,
        align: "center",
        resizable: false,
        getActions: (params) => (
          <GridActionsCellItem key="print-pickup" icon={<PrintIcon />} />
        ),
      },
    ],
    [qRxNumber],
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
        [`& .rowspan`]: {
          display: "flex",
          alignItems: "center",
        },
      }}
      rowSpanning
      autoPageSize
      showCellVerticalBorder
      showColumnVerticalBorder
      disableColumnMenu
      disableRowSelectionOnClick
    />
  );
}
