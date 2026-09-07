import { getAll } from "@/services/stations";
import PageContainer from "../_components/PageContainer";
import DeliveryGroupDataGrid from "./_components/DeliveryGroupDataGrid";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

export default async function DeliveryGroupsPage() {
  const stations = await getAll();
  return (
    <PageContainer title="Delivery Groups">
      <DeliveryGroupDataGrid data={stations} />
    </PageContainer>
  );
}
