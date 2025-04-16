import { LocationsSlugs } from '@/lib/types';

export default async function getLocationsSlugs() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/locations?_fields=slug&per_page=200`);
    const data: LocationsSlugs[] = await response.json();
    return data;
}
