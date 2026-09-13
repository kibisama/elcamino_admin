import { getDeliveryMenu } from "@/services/dashboard";
import Dashboard from "./_components/Dashboard";

export default async function DashboardLayout({ children }) {
  const deliveryMenu = await getDeliveryMenu();
  return <Dashboard deliveries={deliveryMenu}>{children}</Dashboard>;
}
