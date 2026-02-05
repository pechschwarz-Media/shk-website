import { PageMeta } from '@/lib/types';

export default async function getLocationsSitemap() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/locations?_fields=link,modified,yoast_head_json&per_page=200`);
    const data: ({ link: string; modified: string } & PageMeta)[] = await response.json();
    return data;
}
