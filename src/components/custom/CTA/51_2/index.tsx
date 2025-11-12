'use client';

import Button from '@/components/static/Button';
import Section from '@/components/static/Section';
import { Settings } from '@/lib/types';
import { AdvancedMarker, APIProvider, Map, Pin } from '@vis.gl/react-google-maps';
import parse from 'html-react-parser';

type Content = {
    settings: Settings;
};

export default function CTA_51_2({
    content,
    channel,
    locationData,
}: {
    content: Content;
    channel: string;
    locationData: {
        title: { rendered: string };
        acf: {
            abhol_open: Record<string, string>;
            energie_open: Record<string, string>;
            bad_open: Record<string, string>;
            street: string;
            number: number;
            zip: number;
            city: string;
            phone: string;
            lat: string;
            lng: string;
        };
    };
}) {
    let cat = 'bad';
    let bg = '#2B94A6';
    let border = '#268595';
    let glyph = '#55a9b7';

    if (channel === 'energiesparwelten') {
        cat = 'energie';

        bg = '#A2C62C';
        border = '#91b227';
        glyph = '#bdd76b';
    }
    if (channel === 'fliesenwelten') {
        cat = 'fliesen';

        bg = '#CBC5A7';
        border = '#b6b196';
        glyph = '#dad6c1';
    }
    if (channel === 'partner') {
        cat = 'abhol';

        bg = '#F47630';
        border = '#F47630';
        glyph = '#FFF7F3';
    }

    function formatTime(value: string) {
        const time = value.replace(/\s/g, '');
        if (time === null || time === 'null') return 'Geschlossen';
        return String(time).replace(/^(\d{2})(\d{2})$/, '$1:$2');
    }

    return (
        <Section dataComponent="CTA_51_2" settings={content.settings}>
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-[400px] lg:h-[700px]">
                        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                            <Map
                                style={{ width: '100%', height: '100%' }}
                                center={{ lat: parseFloat(locationData?.acf?.lat), lng: parseFloat(locationData?.acf?.lng) }}
                                zoom={10}
                                gestureHandling={'greedy'}
                                disableDefaultUI={true}
                                mapId="edeb5c34fbbda140"
                            >
                                <AdvancedMarker
                                    position={{
                                        lat: parseFloat(locationData?.acf?.lat),
                                        lng: parseFloat(locationData?.acf.lng),
                                    }}
                                >
                                    <Pin background={bg} borderColor={border} glyphColor={glyph} />
                                </AdvancedMarker>
                            </Map>
                        </APIProvider>
                    </div>
                    <div>
                        <h3 className="text-h3 font-headline text-blue leading-tight mb-4">{parse(locationData?.title?.rendered)}</h3>
                        <p>
                            {locationData?.acf?.street} {locationData?.acf?.number}
                        </p>
                        <p>
                            {locationData?.acf?.zip} {locationData?.acf?.city}
                        </p>
                        <Button
                            as="link"
                            link={{
                                url: 'tel:' + locationData?.acf?.phone,
                                title: locationData?.acf?.phone,
                                target: '_self',
                            }}
                            className="mt-4 mb-8"
                        >
                            {locationData?.acf?.phone}
                        </Button>
                        <div>
                            <h4 className="text-h4 font-headline text-blue leading-tight">Öffnungszeiten</h4>
                        </div>
                        <div className="mt-4">
                            <table className="w-full">
                                <tbody className="border border-tabelle-border">
                                    <tr>
                                        <td className="p-2 font-bold">Montag</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_mo_start`])}</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_mo_end`])}</td>
                                    </tr>
                                    <tr className="bg-tabelle-border">
                                        <td className="p-2 font-bold">Dienstag</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_di_start`])}</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_di_end`])}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-bold">Mittwoch</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_mi_start`])}</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_mi_end`])}</td>
                                    </tr>
                                    <tr className="bg-tabelle-border">
                                        <td className="p-2 font-bold">Donnerstag</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_do_start`])}</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_do_end`])}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-bold">Freitag</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_fr_start`])}</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_fr_end`])}</td>
                                    </tr>
                                    <tr className="bg-tabelle-border">
                                        <td className="p-2 font-bold">Samstag</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_sa_start`])}</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_sa_end`])}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-bold">Sonntag</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_so_start`])}</td>
                                        <td className="p-2">{formatTime((locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<string, any>)?.[`${cat}_open_so_end`])}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
