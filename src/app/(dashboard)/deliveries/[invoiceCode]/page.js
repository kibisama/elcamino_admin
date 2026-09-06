import { notFound } from "next/navigation";
import { getDeliveryMenu } from "@/services/dashboard";

export default async function DeliveriesPage({ params }) {
  const { invoiceCode } = await params;
  const deliveryMenu = await getDeliveryMenu();
  if (!deliveryMenu.some((menu) => menu.invoiceCode === invoiceCode))
    notFound();

  return;
}
