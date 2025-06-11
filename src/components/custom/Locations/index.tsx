import getLocations from '@/lib/queries/locations/getLocations';
import Locations_Inner from './inner';
import getLocationcats from '@/lib/queries/taxonomies/getLocationscats';
import { Suspense } from 'react';

export type Content = {
    headline: string;
    text: string;
    hint: string;
    type: string;
    category: number | null;
};

export default async function Locations({ content, channel }: { content: Content; channel: string }) {
    const locations = await getLocations();
    const locationcats = await getLocationcats();

    const filteredLocations = locations
        .filter((location) => {
            if (content.type === 'customers') {
                return location.locationcats.includes(9) || location.locationcats.includes(10) || location.locationcats.includes(11);
            }

            return true;
        })
        .filter((location) => {
            if (content?.category) {
                return location.locationcats.includes(content?.category);
            }

            return true;
        });

    return (
        <Suspense>
            <Locations_Inner
                content={content}
                channel={channel}
                locations={filteredLocations}
                locationcats={locationcats}
                defaultCategory={content?.category}
            />
        </Suspense>
    );
}
