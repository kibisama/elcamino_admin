"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SystemMonitor() {
  const [open, setOpen] = React.useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const pathnameRef = React.useRef(pathname);
  React.useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  React.useEffect(() => {
    const es = new EventSource("/api/realtime");
    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "HEALTH":
          return setOpen(!data.online);
        case "REVALIDATE":
          if (data.path === pathnameRef.current) return router.refresh();
      }
    };
    es.onerror = () => {
      setOpen(true);
    };
    return () => es.close();
  }, [router]);

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
