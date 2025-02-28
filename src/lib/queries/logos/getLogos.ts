import { Logo, Media } from "@/lib/types";

export default async function getLogos(ids: number[]) {
  const fetchPromises = ids.map((id) =>
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}wp/v2/logos/${id}?_fields=acf&acf_format=standard`
    ).then((response) => response.json())
  );

  const logosData: Logo[] = await Promise.all(fetchPromises);
  return logosData;
}
