import { getDeliveryMenu } from "@/services/dashboard";
import Dashboard from "./_components/Dashboard";
import HealthDialog from "./_components/HealthDialog";

export default async function DashboardLayout({ children }) {
  const deliveryMenu = await getDeliveryMenu();
  return (
    <Dashboard deliveries={deliveryMenu}>
      <HealthDialog />
      {children}
    </Dashboard>
  );
}
