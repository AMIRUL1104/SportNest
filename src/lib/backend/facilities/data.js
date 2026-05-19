export default async function getFacilities() {
  const req = await fetch("http://localhost:4000/facilities");
  const res = await req.json();
  return res;
}

export async function getFacilityById(id) {
  const req = await fetch(`http://localhost:4000/facilities/${id}`);
  const res = await req.json();
  return res;
}
