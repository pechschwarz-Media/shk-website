import { Homepage } from '@/lib/types';

export default async function getHomepage() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/pages/7?_fields=title,template,acf&acf_format=standard`);
    const data: Homepage = await response.json();

    return data;
}
