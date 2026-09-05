import { search } from "@/services/pickups";
import PageContainer from "../_components/PageContainer";
import TextFilter from "../_components/TextFilter";

export default async function PickupPage({ searchParams }) {
  const { rxNumber } = await searchParams;
  if (rxNumber) {
    const result = await search(rxNumber);
    console.log(result);
  }
  return (
    <PageContainer
      title="Pickups"
      extraActions={
        <TextFilter queryKey="rxNumber" placeholder="Search RxNumber…" />
      }
    ></PageContainer>
  );
}
