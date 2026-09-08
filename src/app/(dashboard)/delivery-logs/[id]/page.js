import PageContainer from "../../_components/PageContainer";
import { getLogItems } from "@/services/deliveries";
import DeliveryLogItemDataGrid from "./_components/DeliveryLogItemDataGrid";

export default async function DeliveryLogPage({ params }) {
  const { id } = await params;
  const data = await getLogItems(id);
  return (
    <PageContainer title="Delivery Log Items">
      <DeliveryLogItemDataGrid data={data} logId={id} />
    </PageContainer>
  );
}
