const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function search(rxNumber) {
  const res = await fetch(
    `${BASE_URL}/api/pickups/search?rxNumber=${rxNumber}`,
  );
  return res.json();
}
