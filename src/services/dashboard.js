const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDeliveryMenu() {
  const res = await fetch(`${BASE_URL}/api/stations/menu`);
  return res.json();
}
