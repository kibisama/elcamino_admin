const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getItemsOnStage(invoiceCode) {
  const url = new URL(`${BASE_URL}/api/deliveries/${invoiceCode}`);
  const res = await fetch(url, {
    cache: "force-cache",
    next: { tags: [`deliveries-${invoiceCode}`] },
  });
  return res.json();
}

export async function cancelItem(id, version) {
  const url = new URL(`${BASE_URL}/api/deliveries/cancel/${id}`);
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ version }),
  });
  return res.ok;
}

export async function createLog(invoiceCode, itemRows) {
  const url = new URL(`${BASE_URL}/api/deliveries/logs/${invoiceCode}`);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: itemRows.map((row) => ({ id: row.id, version: row.version })),
    }),
  });
  return res.json();
}
