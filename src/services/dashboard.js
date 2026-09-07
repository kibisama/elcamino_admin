import { handleResponseError } from "@/utils/error";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDeliveryMenu() {
  const res = await fetch(`${BASE_URL}/api/stations/menu`);
  handleResponseError(res);
  return res.json();
}
