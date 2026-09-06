import { Box } from "@mui/material";
import { getAll } from "@/services/stations";
import PageContainer from "../_components/PageContainer";
import StationDataGrid from "./_components/StationDataGrid";

export default async function DeliveryGroupsPage() {
  const stations = await getAll();
  return (
    <PageContainer title="Delivery Groups">
      <Box sx={{ flex: 1, width: "100%" }}>
        <StationDataGrid data={stations} />
      </Box>
    </PageContainer>
  );
}
