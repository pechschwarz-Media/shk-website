import getLocations from '@/lib/queries/locations/getLocations';
import Locations_Inner from './inner';
import getLocationcats from '@/lib/queries/taxonomies/getLocationscats';
import { Suspense } from 'react';

export type Content = {
    headline: string;
    text: string;
    hint: string;
    type: string;
};

export default async function Locations({ content }: { content: Content }) {
    const locations = await getLocations();
    const locationcats = await getLocationcats();

    const filteredLocations = locations.filter((location) => {
        if (content.type === 'partner') {
            return location.locationcats.includes(12);
        }

        if (content.type === 'customers') {
            return location.locationcats.includes(9) || location.locationcats.includes(10) || location.locationcats.includes(11);
        }

        return true;
    });

    return (
        <Suspense>
            <Locations_Inner content={content} locations={filteredLocations} locationcats={locationcats} />
        </Suspense>
    );
}
