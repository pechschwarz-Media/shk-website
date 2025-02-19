'use client';

import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import parse from 'html-react-parser';
import { APIProvider, Map, Marker, AdvancedMarker, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useState } from 'react';
import Button from '@/components/static/Button';

const locations = [
    {
        name: 'Celle',
        lat: 52.621922,
        lng: 10.07858,
        category: 0,
    },
    {
        name: 'Hamburg',
        lat: 53.551086,
        lng: 9.993682,
        category: 0,
    },
    {
        name: 'Lübeck',
        lat: 53.865467,
        lng: 10.686559,
        category: 1,
    },
    {
        name: 'Kiel',
        lat: 54.323292,
        lng: 10.122765,
        category: 2,
    },
];

export default function Locations() {
    const [zoom, setZoom] = useState(7);
    const [coordinates, setCoordinates] = useState<null | { lat: number; lng: number }>(null);
    const [center, setCenter] = useState({ lat: 52.621922, lng: 10.07858 });
    const [status, setStatus] = useState('');
    const [value, setValue] = useState('');

    async function searchLocation() {
        const response = await fetch('/api/googlemaps/geocoding', {
            method: 'POST',
            body: JSON.stringify({ address: value }),
        });

        const data = await response.json();

        setStatus(data.status);

        if (data.status === 'OK' && data.results.length > 0) {
            setCoordinates({ lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng });
        }

        console.log(data);
    }

    useEffect(() => {
        if (coordinates) {
            setCenter(coordinates);
            setZoom(10);
        }
    }, [coordinates]);

    return (
        <Section dataComponent="Header_5" settings={{ padding: { top: 'medium', bottom: 'medium' }, preventAnimation: true }}>
            <div className="pt-20">
                <div className="container">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-8">
                            <div className="mb-10">
                                <h1 className="text-h3 leading-tight font-headline mb-6">Standort finden</h1>
                                <Text>{parse('<p>Wählen Sie einen unserer Ausstellungen aus<br />und buchen Sie Ihren Termin.</p>')}</Text>
                            </div>
                            <div>
                                <label className="mb-2 block">Entdecken Sie unsere Ausstellungen in der Nähe</label>
                                <div className="flex gap-2">
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
                            <div className="mt-5">
                                <div className="flex items-center gap-2">
                                    <button className="bg-blue text-white h-9 rounded-full px-3">Alle Welten</button>
                                    <button className="bg-customer-bg text-blue h-9 rounded-full px-3">Bäderwelten</button>
                                    <button className="bg-customer-bg text-blue h-9 rounded-full px-3">Fliesenwelten</button>
                                    <button className="bg-customer-bg text-blue h-9 rounded-full px-3">Energiesparwelten</button>
                                </div>
                            </div>
                            <div className="mt-10">
                                {status === 'ZERO_RESULTS' && (
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
                                )}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="h-[800px] sticky top-24 rounded-xl overflow-hidden">
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
                                            return <AdvancedMarker position={{ lat: location.lat, lng: location.lng }} key={index} />;
                                        })}
                                    </Map>
                                </APIProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
