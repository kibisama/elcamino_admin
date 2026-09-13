"use client";

import * as React from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureBox({ socket }) {
  if (!socket) throw new Error();

  const [canvas, setCanvas] = React.useState(null);

  const sigRef = React.useRef(null);
  const timeout = React.useRef(null);

  React.useEffect(() => {
    socket.on("canvas", (data) => {
      if (data) {
        sigRef.current.fromDataURL(data);
        setCanvas(data);
      } else {
        sigRef.current.clear();
        setCanvas(null);
      }
    });
    return () => clearTimeout(timeout.current);
  }, [socket]);
  return (
    <div
      style={{
        width: 520,
        height: 170,
        backgroundColor: "#bdbdbd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignatureCanvas
        ref={sigRef}
        backgroundColor="rgb(255,255,255)"
        canvasProps={{ width: 500, height: 150 }}
        onBegin={() => {
          function update() {
            socket.emit("canvas", sigRef.current.toDataURL());
            timeout.current = setTimeout(update, 500);
          }
          timeout.current = setTimeout(update, 500);
        }}
        onEnd={() => {
          clearTimeout(timeout.current);
          socket.emit("canvas", sigRef.current.toDataURL());
        }}
      />
    </div>
  );
}
