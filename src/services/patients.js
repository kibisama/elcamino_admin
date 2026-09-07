const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/patients";

export async function searchPatients(q) {
  const res = await fetch(`${BASE_URL}/search?q=${q}`);
  return res.json();
}
