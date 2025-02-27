import { Locationcat } from '@/lib/types';

export default async function getLocationcats() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/locationcats?_fields=id,name&per_page=100`);
    const data: Locationcat[] = await response.json();
    return data;
}
