'use client';

import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import parse from 'html-react-parser';
import { APIProvider, Map, AdvancedMarker, MapCameraChangedEvent, Pin } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import Button from '@/components/static/Button';
import { cn } from '@/lib/utils';
import { Location, Locationcat } from '@/lib/types';
import { Content } from './index';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Locations_Inner({
    content,
    locations,
    locationcats,
    channel,
}: {
    content: Content;
    locations: Location[];
    locationcats: Locationcat[];
    channel: string;
}) {
    const [zoom, setZoom] = useState(7);
    const [coordinates, setCoordinates] = useState<null | { lat: number; lng: number }>(null);
    const [center, setCenter] = useState({ lat: 53.635502, lng: 11.40125 });
    const [status, setStatus] = useState('');
    const [value, setValue] = useState('');
    const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);
    const [category, setCategory] = useState<'all' | number>('all');

    async function searchLocation() {
        const response = await fetch('/api/googlemaps/geocoding', {
            method: 'POST',
            body: JSON.stringify({ address: value }),
        });

        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
            setCoordinates({
                lat: data.results[0].geometry.location.lat,
                lng: data.results[0].geometry.location.lng,
            });
        }

        setStatus(data.status);
    }

    useEffect(() => {
        if (coordinates) {
            setCenter(coordinates);
            setZoom(10);

            const categoryLocations = filterLocations(locations, category);
            const sortedLocations = sortByDistance(categoryLocations, coordinates);
            setFilteredLocations(sortedLocations);
            setStatus('filtered');
        }
    }, [coordinates, category]);

    function filterLocations(locations: Location[], category: 'all' | number) {
        return locations.filter((location) => {
            return category === 'all' || location.locationcats.includes(category);
        });
    }

    function sortByDistance(locations: Location[], coordinates: { lat: number; lng: number }) {
        return locations
            .map((location) => ({
                ...location,
                distance: getDistance(coordinates, {
                    lat: parseFloat(location?.acf?.lat),
                    lng: parseFloat(location?.acf?.lng),
                }),
            }))
            .sort((a, b) => a.distance - b.distance);
    }

    function getDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }) {
        const { lat: lat1, lng: lon1 } = point1;
        const { lat: lat2, lng: lon2 } = point2;

        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const lat1Rad = toRad(lat1);
        const lat2Rad = toRad(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c * 100) / 100;
    }

    function toRad(deg: number) {
        return deg * (Math.PI / 180);
    }

    const searchParams = useSearchParams();

    const cat = searchParams.get('category');

    useEffect(() => {
        if (cat) {
            setCategory(parseInt(cat));
            console.log('test');
        }
    }, [cat]);

    return (
        <Section dataComponent="Locations" settings={{ padding: { top: 'medium', bottom: 'medium' }, preventAnimation: true }}>
            <div className="pt-20">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="relative lg:order-2">
                            <div className="h-[300px] md:h-[500px] lg:h-[800px] sticky top-24 rounded-xl overflow-hidden">
                                <div className="relative h-full">
                                    <div className="absolute top-6 left-6 z-10 flex flex-col gap-1">
                                        <button
                                            className={cn(
                                                'bg-blue size-10 rounded-md text-white flex items-center justify-center',
                                                zoom === 15 && 'opacity-50 pointer-events-none'
                                            )}
                                            onClick={() => {
                                                if (zoom < 15) {
                                                    setZoom(zoom + 1);
                                                }
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                        <button
                                            className={cn(
                                                'bg-blue size-10 rounded-md text-white flex items-center justify-center',
                                                zoom === 5 && 'opacity-50 pointer-events-none'
                                            )}
                                            onClick={() => {
                                                if (zoom > 5) {
                                                    setZoom(zoom - 1);
                                                }
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                            </svg>
                                        </button>
                                    </div>
                                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                                        <Map
                                            style={{ width: '100%', height: '100%' }}
                                            center={center}
                                            zoom={zoom}
                                            gestureHandling={'greedy'}
                                            disableDefaultUI={true}
                                            mapId="edeb5c34fbbda140"
                                            onCameraChanged={(ev: MapCameraChangedEvent) => {
                                                setCenter(ev.detail.center);
                                            }}
                                        >
                                            {locations.map((location, index) => {
                                                return (
                                                    <AdvancedMarker
                                                        position={{
                                                            lat: parseFloat(location.acf?.lat),
                                                            lng: parseFloat(location.acf.lng),
                                                        }}
                                                        onClick={() => {
                                                            setCoordinates({
                                                                lat: parseFloat(location.acf.lat),
                                                                lng: parseFloat(location.acf.lng),
                                                            });
                                                            setStatus('OK');
                                                        }}
                                                        key={index}
                                                    >
                                                        {channel === 'partner' ? (
                                                            <Pin background={'#F47630'} borderColor={'#F47630'} glyphColor={'#FFF7F3'} />
                                                        ) : (
                                                            <Pin background={'#2B94A6'} borderColor={'#2B94A6'} glyphColor={'#E0FBFF'} />
                                                        )}
                                                    </AdvancedMarker>
                                                );
                                            })}
                                        </Map>
                                    </APIProvider>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-6 md:p-8">
                            <div className="mb-10">
                                <h1 className="text-h3 leading-tight font-headline mb-6">{content?.headline}</h1>
                                <Text>{parse(content?.text)}</Text>
                            </div>
                            <div>
                                <label className="mb-2 block">{content?.hint}</label>
                                <div className="flex flex-col md:flex-row gap-2">
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Standort, PLZ oder Land"
                                            className="border border-blue bg-neutral-50 w-full h-14 rounded-lg outline-blue pl-12 pr-5"
                                            onChange={(e) => {
                                                setValue(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <Button
                                        as="button"
                                        variant="blueFilled"
                                        className="h-14 rounded-lg"
                                        onClick={() => {
                                            searchLocation();
                                        }}
                                    >
                                        Suchen
                                    </Button>
                                </div>
                            </div>
                            {content?.type === 'customers' && (
                                <div className="mt-5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <button
                                            className={cn(
                                                'bg-customer-bg text-blue hover:bg-blue hover:text-white h-9 rounded-full px-3',
                                                category === 'all' && 'bg-blue text-white'
                                            )}
                                            onClick={() => {
                                                setCategory('all');
                                            }}
                                        >
                                            Alle Welten
                                        </button>
                                        <button
                                            className={cn(
                                                'bg-customer-bg text-blue hover:bg-baederwelt hover:text-white h-9 rounded-full px-3',
                                                category === 11 && 'bg-baederwelt text-white'
                                            )}
                                            onClick={() => {
                                                setCategory(11);
                                            }}
                                        >
                                            Bäderwelten
                                        </button>
                                        <button
                                            className={cn(
                                                'bg-customer-bg text-blue hover:bg-fliesenwelt hover:text-white h-9 rounded-full px-3',
                                                category === 10 && 'bg-fliesenwelt text-white'
                                            )}
                                            onClick={() => {
                                                setCategory(10);
                                            }}
                                        >
                                            Fliesenwelten
                                        </button>
                                        <button
                                            className={cn(
                                                'bg-customer-bg text-blue hover:bg-energiesparwelt hover:text-white h-9 rounded-full px-3',
                                                category === 9 && 'bg-energiesparwelt text-white'
                                            )}
                                            onClick={() => {
                                                setCategory(9);
                                            }}
                                        >
                                            Energiesparwelten
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="mt-10">
                                {status === 'ZERO_RESULTS' ||
                                    (filteredLocations.length === 0 && (
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-8"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>Kein Standort gefunden. Bitte ändern Sie Ihre Eingabe.</div>
                                        </div>
                                    ))}
                                {status === 'filtered' && (
                                    <div className="space-y-3">
                                        {filteredLocations.map((location, index) => {
                                            return (
                                                <div className="border border-blue rounded-lg overflow-hidden" key={index}>
                                                    <div className="p-4">
                                                        {typeof location?.distance !== 'undefined' && (
                                                            <div className="text-gray text-small mb-3">
                                                                {Math.floor(location.distance)}km entfernt
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-1 mb-2">
                                                            {location?.locationcats.map((category, index) => {
                                                                const locationcat = locationcats
                                                                    .filter((cat) => {
                                                                        return cat.id === category;
                                                                    })
                                                                    ?.at(0);
                                                                return (
                                                                    <div
                                                                        className={cn(
                                                                            'px-3 text-tiny text-white h-6 flex items-center rounded-full',
                                                                            category === 11 && 'bg-baederwelt',
                                                                            category === 9 && 'bg-energiesparwelt',
                                                                            category === 10 && 'bg-fliesenwelt',
                                                                            category === 12 && 'bg-black'
                                                                        )}
                                                                        key={index}
                                                                    >
                                                                        {locationcat?.name}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="text-large font-headline mb-3">{parse(location.title?.rendered)}</div>
                                                        <address className="not-italic text-gray">
                                                            {location?.acf?.street} {location?.acf?.number}
                                                            <br />
                                                            {location?.acf?.zip} {location?.acf?.city}
                                                        </address>
                                                        <Link href={location?.link} className="flex items-center gap-2 text-blue mt-5">
                                                            Weitere Details
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                stroke="currentColor"
                                                                className="size-4"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
