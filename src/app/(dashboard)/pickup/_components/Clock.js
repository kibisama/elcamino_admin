"use client";

import * as React from "react";
import { Typography } from "@mui/material";

export default function Clock({ socket }) {
  if (!socket) throw new Error();
  const [time, setTime] = React.useState(null);

  React.useEffect(() => {
    socket.on("time", (data) => {
      setTime(data);
    });
  }, [socket]);
  return <Typography>{time}</Typography>;
}
