"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SelectFilter({ label, items = [], queryKey, sx }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get(queryKey) || "";

  const handleChange = React.useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(queryKey, value);
      } else {
        params.delete(queryKey);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, queryKey],
  );

  return (
    <Box sx={{ minWidth: 100, ...sx }}>
      <FormControl size="small" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={defaultValue}
          label={label}
          onChange={(e) => handleChange(e.target.value)}
        >
          {items.map((item, i) => (
            <MenuItem value={item.value} key={i}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
