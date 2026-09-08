const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/deliveries";

export async function getItemsOnStage(invoiceCode) {
  const url = new URL(`${BASE_URL}/${invoiceCode}`);
  const res = await fetch(url, {
    cache: "force-cache",
    next: { tags: [`deliveries-${invoiceCode}`] },
  });
  return res.json();
}

export async function cancelItem(id, version) {
  const url = new URL(`${BASE_URL}/cancel/${id}`);
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ version }),
  });
  return res.ok;
}

export async function returnItem(id, version) {
  const url = new URL(`${BASE_URL}/return/${id}`);
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ version }),
  });
  return res.json();
}

export async function createLog(invoiceCode, itemRows) {
  const url = new URL(`${BASE_URL}/logs/${invoiceCode}`);
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

export async function searchLogs(params) {
  const url = new URL(`${BASE_URL}/logs`);
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }
  const res = await fetch(url);
  return res.json();
}

export async function getLogItems(id) {
  const url = new URL(`${BASE_URL}/logs/${id}`);
  const res = await fetch(url, {
    cache: "force-cache",
    next: {
      tags: [`delivery-log-items-${id}`],
    },
  });
  return res.json();
}
