import { PageUris } from '@/lib/types';

export default async function getPagesUris() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/pages?_fields=uri,link,modified`);
    const data: PageUris[] = await response.json();
    return data;
}
