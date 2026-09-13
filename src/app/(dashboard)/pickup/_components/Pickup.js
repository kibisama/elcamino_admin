"use client";

import * as React from "react";
import { io } from "socket.io-client";
import { Box } from "@mui/material";
import ItemList from "./ItemList";
import SignatureBox from "./SignatureBox";
import Clock from "./Clock";
import RxNumberInput from "./RxNumberInput";

const PICKUP_SOCKET_URL = process.env.NEXT_PUBLIC_API_URL + "/pickup";

export default function Pickup() {
  const socket = React.useMemo(
    () =>
      io(PICKUP_SOCKET_URL, {
        autoConnect: false,
      }),
    [],
  );

  React.useEffect(() => {
    socket.connect();

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <RxNumberInput socket={socket} />
      <SignatureBox socket={socket} />
      <ItemList socket={socket} />
      <Clock socket={socket} />
    </div>
  );
}
