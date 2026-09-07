import { getStationInfo } from "@/services/stations";
import { getItemsOnStage } from "@/services/deliveries";
import PageContainer from "../../_components/PageContainer";
import DeliveryDataGrid from "./_components/DeliveryDataGrid";

export default async function DeliveriesPage({ params }) {
  const { invoiceCode } = await params;
  const station = await getStationInfo(invoiceCode);
  const items = await getItemsOnStage(invoiceCode);
  return (
    <PageContainer title={station.name}>
      <DeliveryDataGrid data={items} invoiceCode={invoiceCode} />
    </PageContainer>
  );
}
