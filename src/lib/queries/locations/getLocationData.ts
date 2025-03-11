import { LocationData, LocationsSlugs } from '@/lib/types';

export default async function getLocationData({ slug }: { slug: string }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}wp/v2/locations?slug=${slug}&_fields=title,template,acf,locationcats&acf_format=standard`
    );
    const data: LocationData[] = await response.json();
    return data[0] || null;
}
