"use client";

import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryDate = searchParams.get("date");
  const handleDateChange = (newValue) => {
    if (!newValue) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("date", newValue.format("YYYY-MM-DD"));

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={queryDate ? dayjs(queryDate) : dayjs()}
        onChange={handleDateChange}
        slotProps={{
          textField: { size: "small", sx: { width: "24ch" } },
        }}
      />
    </LocalizationProvider>
  );
}
