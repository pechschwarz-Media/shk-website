import { PageMeta } from '@/lib/types';

export default async function getHomepageMeta() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/pages/7?_fields=yoast_head_json&acf_format=standard`);
    const data: PageMeta = await response.json();

    return data.yoast_head_json;
}
