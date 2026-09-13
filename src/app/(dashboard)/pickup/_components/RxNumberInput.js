"use client";

import * as React from "react";
import { NumericFormat } from "react-number-format";
import { TextField } from "@mui/material";

function RxNumberFormat({ ...other }, ref) {
  return (
    <NumericFormat
      {...other}
      decimalScale={0}
      allowNegative={false}
      getInputRef={ref}
      valueIsNumericString
    />
  );
}

export default function RxNumberInput({ socket }) {
  if (!socket) throw new Error();
  const [rxNumber, setRxNumber] = React.useState("");

  React.useEffect(() => {}, [socket]);
  return (
    <TextField
      slotProps={{ input: { inputComponent: RxNumberFormat } }}
      sx={{ width: 140 }}
      label="Rx Number"
      autoFocus
      value={rxNumber}
      onChange={(e) => setRxNumber(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          socket.emit("items", { action: "push", item: rxNumber });
        }
      }}
    />
  );
}
