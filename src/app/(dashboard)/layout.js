import { getDeliveryMenu } from "@/services/dashboard";
import Dashboard from "./_components/Dashboard";
import SystemMonitor from "./_components/SystemMonitor";

export default async function DashboardLayout({ children }) {
  const deliveryMenu = await getDeliveryMenu();
  return (
    <Dashboard deliveries={deliveryMenu}>
      <SystemMonitor />
      {children}
    </Dashboard>
  );
}
