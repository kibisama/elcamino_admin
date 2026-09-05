"use client";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function HealthDialog() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const source = new EventSource("/api/health");
    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "HEALTH") setOpen(!data.online);
    };
    source.onerror = () => {
      setOpen(true);
    };
    return () => source.close();
  }, []);

  return (
    <Dialog open={open}>
      <DialogTitle>{"Our backend server is currently down."}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please wait until the server restarts ...
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
