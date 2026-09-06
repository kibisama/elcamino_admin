const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function searchPatients(q) {
  const res = await fetch(`${BASE_URL}/api/patients/search?q=${q}`);
  return res.json();
}
