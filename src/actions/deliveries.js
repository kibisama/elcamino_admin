"use server";

import { updateTag } from "next/cache";
import { cancelItem, createLog, returnItem } from "@/services/deliveries";
import { fetchWebhook } from "@/lib/realtime";

export async function handleCancelItem(id, version, invoiceCode) {
  await cancelItem(id, version);
  updateTag(`deliveries-${invoiceCode}`);
  fetchWebhook({ type: "REVALIDATE", path: `/deliveries/${invoiceCode}` });
}

export async function handleReturnItem(id, version, logId) {
  await returnItem(id, version);
  updateTag(`delivery-log-items-${logId}`);
  fetchWebhook({ type: "REVALIDATE", path: `/delivery-logs/${logId}` });
}

export async function handleCreateLog(invoiceCode, itemRows) {
  await createLog(invoiceCode, itemRows);
  updateTag(`deliveries-${invoiceCode}`);
  fetchWebhook([
    { type: "REVALIDATE", path: `/deliveries/${invoiceCode}` },
    { type: "REVALIDATE", path: "/delivery-logs" },
  ]);
}
