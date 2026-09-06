"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Autocomplete,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { searchPatients } from "@/services/patients";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const queryKey = "patientId";

export default function PatientAutocomplete() {
  const [options, setOptions] = React.useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounced = useDebouncedCallback(async (q) => {
    if (!/[a-zA-Z]/.test(q)) return;

    try {
      const options = await searchPatients(q);
      setOptions(options);
    } catch (error) {
      setOptions([]);
    }
  }, 500);
  const handleTextFieldChange = React.useCallback(
    (e) => debounced(e.target.value),
    [debounced],
  );
  const triggerSearch = React.useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(queryKey, value);
      } else {
        params.delete(queryKey);
      }

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <Autocomplete
      disablePortal
      sx={{
        width: "42ch",
      }}
      options={options}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <li {...otherProps} key={option.id}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>{option.fullName}</Typography>
              <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                {option.dob}
              </Typography>
            </div>
          </li>
        );
      }}
      getOptionLabel={(option) => option.fullName}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            size="small"
            onChange={handleTextFieldChange}
            placeholder="Search Patient…"
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps.input,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        );
      }}
      filterOptions={(options) => options}
      onChange={(e, option) => triggerSearch(option?.id)}
    />
  );
}
