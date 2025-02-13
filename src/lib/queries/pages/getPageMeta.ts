import { PageMeta } from '@/lib/types';

export default async function getPageMeta({ id }: { id: number }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/pages/${id}?_fields=yoast_head_json`);
    const data: PageMeta = await response.json();
    return data.yoast_head_json;
}
