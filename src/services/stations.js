const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAll() {
  const url = new URL(`${BASE_URL}/api/stations`);
  const res = await fetch(url);
  return res.json();
}
