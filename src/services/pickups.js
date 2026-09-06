const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function search(params) {
  const url = new URL(`${BASE_URL}/api/pickups/search`);
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}
