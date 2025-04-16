import { Location } from '@/lib/types';

export default async function getLocations() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/locations?_fields=title,link,acf,locationcats&per_page=200`);
    const data: Location[] = await response.json();
    return data;
}
