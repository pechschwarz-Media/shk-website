import { Glossar } from '@/lib/types';

export default async function getGlossar() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}wp/v2/glossar?_fields=title,acf&acf_format=standard&orderby=title&order=asc&per_page=100`
    );
    const data: Glossar[] = await response.json();
    return data;
}
