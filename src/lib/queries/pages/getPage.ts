import { Page } from '@/lib/types';

export default async function getPage({ id }: { id: number }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/pages/${id}?_fields=title,template,acf,link&acf_format=standard`);
    const data: Page = await response.json();

    return data;
}
