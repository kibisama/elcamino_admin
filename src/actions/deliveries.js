"use server";

import { updateTag } from "next/cache";
import { cancelItem } from "@/services/deliveries";
import { fetchWebhook } from "@/lib/realtime";

export async function handleCancelItem(id, version, invoiceCode) {
  await cancelItem(id, version);
  updateTag(`deliveries-${invoiceCode}`);
  fetchWebhook({ type: "REVALIDATE", path: `/deliveries/${invoiceCode}` });
}
