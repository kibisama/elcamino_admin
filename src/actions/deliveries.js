"use server";

import { revalidateTag } from "next/cache";
import { cancelItem } from "@/services/deliveries";
import { broadcast } from "@/lib/realtime";

export async function handleCancelItem(id, version, invoiceCode) {
  await cancelItem(id, version);
  revalidateTag(`deliveries-${invoiceCode}`);
  broadcast({ type: "REVALIDATE", path: `/deliveries/${invoiceCode}` });
}
