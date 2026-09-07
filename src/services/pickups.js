const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/pickups";

export async function search(params) {
  const url = new URL(`${BASE_URL}/search`);
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }
  const res = await fetch(url);
  return res.json();
}
