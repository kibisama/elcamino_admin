import { Box } from "@mui/material";
import { search } from "@/services/pickups";
import PageContainer from "../_components/PageContainer";
import TextFilter from "../_components/TextFilter";
import PatientAutocomplete from "../_components/PatientAutoComplete";
import PickupLogDataGrid from "./_components/PickupLogDataGrid";

export default async function PickupLogsPage({ searchParams }) {
  const params = await searchParams;
  let data;
  if (params.rxNumber || params.patientId) {
    data = await search(params);
  }
  return (
    <PageContainer
      title="Pickup Logs"
      extraActions={
        <>
          <TextFilter
            sx={{ width: "16ch" }}
            queryKey="rxNumber"
            placeholder="RxNumber…"
          />
          <PatientAutocomplete />
        </>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <PickupLogDataGrid data={data ?? []} />
      </Box>
    </PageContainer>
  );
}
