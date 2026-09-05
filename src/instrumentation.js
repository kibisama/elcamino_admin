import { startSystemMonitor } from "@/lib/health";

export async function register() {
  startSystemMonitor();
}
