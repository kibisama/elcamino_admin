"use client";

import * as React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function ItemList({ socket }) {
  if (!socket) throw new Error();
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    socket.on("items", (data) => {
      setItems(data);
    });
  }, [socket]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography>
        {items.length ? `Rx List (${items.length})` : "Rx List"}
      </Typography>
      <div>
        <List>
          {items.map((item, i) => (
            <ListItem sx={{ height: 40 }} key={i}>
              <ListItemButton>
                <ListItemText
                  slotProps={{
                    primary: {
                      sx: { justifySelf: "center", letterSpacing: 2 },
                    },
                  }}
                  primary={item}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
