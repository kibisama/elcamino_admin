import { getAll } from "@/services/stations";
import PageContainer from "../_components/PageContainer";
import DeliveryLogDataGrid from "./_components/DeliveryLogDataGrid";
import SelectFilter from "../_components/SelectFilter";
import DateFilter from "../_components/DateFilter";

export default async function DeliveryLogsPage() {
  const stations = await getAll();
  return (
    <PageContainer
      title="Delivery Logs"
      extraActions={
        <>
          <SelectFilter
            label="Delivery Group"
            items={stations.map((station) => ({
              value: station.invoiceCode,
              label: station.displayName,
            }))}
            queryKey="invoiceCode"
            sx={{ minWidth: 300 }}
          />
          <DateFilter />
        </>
      }
    >
      <DeliveryLogDataGrid data={[]} />
    </PageContainer>
  );
}
