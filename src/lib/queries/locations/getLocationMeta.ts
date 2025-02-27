import { LocationMeta, PageMeta } from "@/lib/types";

export default async function getLocationMeta({ slug }: { slug: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}wp/v2/locations?slug=${slug}&_fields=yoast_head_json`
  );
  const data: LocationMeta = await response.json();
  return data[0].yoast_head_json;
}
