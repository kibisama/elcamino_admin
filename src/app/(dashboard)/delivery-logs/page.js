import { getAll } from "@/services/stations";
import PageContainer from "../_components/PageContainer";
import DeliveryLogDataGrid from "./_components/DeliveryLogDataGrid";
import TextFilter from "../_components/TextFilter";
import SelectFilter from "../_components/SelectFilter";
import DateFilter from "../_components/DateFilter";
import { searchLogs } from "@/services/deliveries";

export default async function DeliveryLogsPage({ searchParams }) {
  const stations = await getAll();
  const params = await searchParams;
  let data = [];
  if (params.rxNumber || params.invoiceCode || params.date) {
    data = await searchLogs(params);
  }
  return (
    <PageContainer
      title="Delivery Logs"
      extraActions={
        <>
          <TextFilter
            sx={{ width: "16ch" }}
            queryKey="rxNumber"
            placeholder="RxNumber…"
          />
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
      <DeliveryLogDataGrid data={data} />
    </PageContainer>
  );
}
