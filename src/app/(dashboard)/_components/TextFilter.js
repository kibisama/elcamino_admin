"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function TextFilter({
  placeholder = "Search…",
  queryKey = "search",
  sx = {},
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultValue = searchParams.get(queryKey) || "";

  const triggerSearch = React.useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set(queryKey, value.trim());
      } else {
        params.delete(queryKey);
      }

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, queryKey],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") triggerSearch(e.target.value);
  };

  return (
    <TextField
      defaultValue={defaultValue}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      size="small"
      sx={{ width: "24ch", ...sx }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
