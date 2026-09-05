import { handleResponseError } from "@/utils/error";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getStationInfo(invoiceCode) {
  const res = await fetch(`${BASE_URL}/api/stations/${invoiceCode}`);
  handleResponseError(res);
  return res.json();
}
