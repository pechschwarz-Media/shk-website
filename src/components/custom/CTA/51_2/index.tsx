'use client';

import Button from '@/components/static/Button';
import Section from '@/components/static/Section';
import { Settings } from '@/lib/types';
import { APIProvider, Map, AdvancedMarker, MapCameraChangedEvent, Pin } from '@vis.gl/react-google-maps';

type Content = {
    headline: string;
    setting: Settings;
};

export default function CTA_51_2({
    content,
    locationData,
}: {
    content: Content;
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
    const openingHoursBad = locationData?.acf?.bad_open;
    const openingHoursAbhol = locationData?.acf?.abhol_open;
    const openingHoursEnergie = locationData?.acf?.energie_open;

    const formatTime = (time: any) => {
        if (!time || time.trim() === 'null') return 'Geschlossen';
        const cleanTime = time.trim().padStart(4, '0');
        return `${cleanTime.slice(0, 2)}:${cleanTime.slice(2)} Uhr`;
    };

    const daysBad = [
        { key: 'mo', label: 'Montag' },
        { key: 'di', label: 'Dienstag' },
        { key: 'mi', label: 'Mittwoch' },
        { key: 'do', label: 'Donnerstag' },
        { key: 'fr', label: 'Freitag' },
        { key: 'sa', label: 'Samstag' },
        { key: 'so', label: 'Sonntag' },
    ];

    const daysAbhol = [
        { key: 'mo', label: 'Montag' },
        { key: 'di', label: 'Dienstag' },
        { key: 'mi', label: 'Mittwoch' },
        { key: 'do', label: 'Donnerstag' },
        { key: 'fr', label: 'Freitag' },
        { key: 'sa', label: 'Samstag' },
        { key: 'so', label: 'Sonntag' },
    ];

    const daysEnergie = [
        { key: 'mo', label: 'Montag' },
        { key: 'di', label: 'Dienstag' },
        { key: 'mi', label: 'Mittwoch' },
        { key: 'do', label: 'Donnerstag' },
        { key: 'fr', label: 'Freitag' },
        { key: 'sa', label: 'Samstag' },
        { key: 'so', label: 'Sonntag' },
    ];

    return (
        <Section dataComponent="CTA_51_2" settings={content.setting}>
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
                                    <Pin background={'#2B94A6'} borderColor={'#2B94A6'} glyphColor={'#E0FBFF'} />
                                </AdvancedMarker>
                            </Map>
                        </APIProvider>
                    </div>
                    <div>
                        <h3 className="text-h3 mb-4">{locationData?.title?.rendered}</h3>
                        <p>{locationData?.acf?.street + locationData?.acf?.number}</p>
                        <p>{locationData?.acf?.zip + locationData?.acf?.city}</p>
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
                        <div className="flex flex-col gap-16">
                            {daysBad.some(({ key }) => {
                                const start = formatTime(openingHoursBad[`bad_open_${key}_start`]);
                                const end = formatTime(openingHoursBad[`bad_open_${key}_end`]);
                                return start !== 'Geschlossen' || end !== 'Geschlossen';
                            }) && (
                                <div>
                                    <h4 className="text-h4">Öffungszeiten Bad</h4>
                                    <table className="w-full mt-4 lg:mt-6">
                                        <tbody className="border-2 border-tabelle-border">
                                            {daysBad.map(({ key, label }, index) => (
                                                <tr
                                                    key={key}
                                                    className={`border-2 border-tabelle-border ${
                                                        index % 2 === 0 ? 'bg-transparent' : 'bg-tabelle-background'
                                                    }`}
                                                >
                                                    <td className="p-2 border-r-2 border-tabelle-border">{label}</td>
                                                    <td className="p-2">
                                                        {formatTime(openingHoursBad[`bad_open_${key}_start`]) === 'Geschlossen' &&
                                                        formatTime(openingHoursBad[`bad_open_${key}_end`]) === 'Geschlossen'
                                                            ? 'Geschlossen'
                                                            : formatTime(openingHoursBad[`bad_open_${key}_start`]) !== 'Geschlossen' &&
                                                              formatTime(openingHoursBad[`bad_open_${key}_end`]) === 'Geschlossen'
                                                            ? `${formatTime(openingHoursBad[`bad_open_${key}_start`])} - ${formatTime(
                                                                  openingHoursBad[`bad_open_${key}_end`]
                                                              )}`
                                                            : formatTime(openingHoursBad[`bad_open_${key}_start`]) === 'Geschlossen' &&
                                                              formatTime(openingHoursBad[`bad_open_${key}_end`]) !== 'Geschlossen'
                                                            ? `${formatTime(openingHoursBad[`bad_open_${key}_start`])} - ${formatTime(
                                                                  openingHoursBad[`bad_open_${key}_end`]
                                                              )}`
                                                            : formatTime(openingHoursBad[`bad_open_${key}_start`]) !== 'Geschlossen' &&
                                                              formatTime(openingHoursBad[`bad_open_${key}_end`]) !== 'Geschlossen'
                                                            ? `${formatTime(openingHoursBad[`bad_open_${key}_start`])} - ${formatTime(
                                                                  openingHoursBad[`bad_open_${key}_end`]
                                                              )}`
                                                            : 'Geschlossen'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {daysAbhol.some(({ key }) => {
                                const start = formatTime(openingHoursAbhol[`abhol_open_${key}_start`]);
                                const end = formatTime(openingHoursAbhol[`abhol_open_${key}_end`]);
                                return start !== 'Geschlossen' || end !== 'Geschlossen';
                            }) && (
                                <div>
                                    <h4 className="text-h4">Öffnungszeiten Abholung</h4>
                                    <table className="w-full mt-4 lg:mt-6">
                                        <tbody className="border-2 border-tabelle-border">
                                            {daysAbhol.map(({ key, label }, index) => (
                                                <tr
                                                    key={key}
                                                    className={`border-2 border-tabelle-border ${
                                                        index % 2 === 0 ? 'bg-transparent' : 'bg-tabelle-background'
                                                    }`}
                                                >
                                                    <td className="p-2 border-r-2 border-tabelle-border">{label}</td>
                                                    <td className="p-2">
                                                        {formatTime(openingHoursAbhol[`abhol_open_${key}_start`]) === 'Geschlossen' &&
                                                        formatTime(openingHoursAbhol[`abhol_open_${key}_end`]) === 'Geschlossen'
                                                            ? 'Geschlossen'
                                                            : formatTime(openingHoursAbhol[`abhol_open_${key}_start`]) !== 'Geschlossen' &&
                                                              formatTime(openingHoursAbhol[`abhol_open_${key}_end`]) === 'Geschlossen'
                                                            ? `${formatTime(openingHoursAbhol[`abhol_open_${key}_start`])} - ${formatTime(
                                                                  openingHoursAbhol[`abhol_open_${key}_end`]
                                                              )}`
                                                            : formatTime(openingHoursAbhol[`abhol_open_${key}_start`]) === 'Geschlossen' &&
                                                              formatTime(openingHoursAbhol[`abhol_open_${key}_end`]) !== 'Geschlossen'
                                                            ? `${formatTime(openingHoursAbhol[`abhol_open_${key}_start`])} - ${formatTime(
                                                                  openingHoursAbhol[`abhol_open_${key}_end`]
                                                              )}`
                                                            : formatTime(openingHoursAbhol[`abhol_open_${key}_start`]) !== 'Geschlossen' &&
                                                              formatTime(openingHoursAbhol[`abhol_open_${key}_end`]) !== 'Geschlossen'
                                                            ? `${formatTime(openingHoursAbhol[`abhol_open_${key}_start`])} - ${formatTime(
                                                                  openingHoursAbhol[`abhol_open_${key}_end`]
                                                              )}`
                                                            : 'Geschlossen'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {daysEnergie.some(({ key }) => {
                                const start = formatTime(openingHoursEnergie[`energie_open_${key}_start`]);
                                const end = formatTime(openingHoursEnergie[`energie_open_${key}_end`]);
                                return start !== 'Geschlossen' || end !== 'Geschlossen';
                            }) && (
                                <div>
                                    <h4 className="text-h4">Öffungszeiten Energie</h4>
                                    <table className="w-full mt-4 lg:mt-6">
                                        <tbody className="border-2 border-tabelle-border">
                                            {daysEnergie.map(({ key, label }, index) => (
                                                <tr
                                                    key={key}
                                                    className={`border-2 border-tabelle-border ${
                                                        index % 2 === 0 ? 'bg-transparent' : 'bg-tabelle-background'
                                                    }`}
                                                >
                                                    <td className="p-2 border-r-2 border-tabelle-border">{label}</td>
                                                    <td className="p-2">
                                                        {formatTime(openingHoursEnergie[`energie_open_${key}_start`]) === 'Geschlossen' &&
                                                        formatTime(openingHoursEnergie[`energie_open_${key}_end`]) === 'Geschlossen'
                                                            ? 'Geschlossen'
                                                            : formatTime(openingHoursEnergie[`energie_open_${key}_start`]) !== 'Geschlossen' &&
                                                              formatTime(openingHoursEnergie[`energie_open_${key}_end`]) === 'Geschlossen'
                                                            ? `${formatTime(openingHoursEnergie[`energie_open_${key}_start`])} - ${formatTime(
                                                                  openingHoursEnergie[`energie_open_${key}_end`]
                                                              )}`
                                                            : formatTime(openingHoursEnergie[`energie_open_${key}_start`]) === 'Geschlossen' &&
                                                              formatTime(openingHoursEnergie[`energie_open_${key}_end`]) !== 'Geschlossen'
                                                            ? `${formatTime(openingHoursEnergie[`energie_open_${key}_start`])} - ${formatTime(
                                                                  openingHoursEnergie[`energie_open_${key}_end`]
                                                              )}`
                                                            : formatTime(openingHoursEnergie[`energie_open_${key}_start`]) !== 'Geschlossen' &&
                                                              formatTime(openingHoursEnergie[`energie_open_${key}_end`]) !== 'Geschlossen'
                                                            ? `${formatTime(openingHoursEnergie[`energie_open_${key}_start`])} - ${formatTime(
                                                                  openingHoursEnergie[`energie_open_${key}_end`]
                                                              )}`
                                                            : 'Geschlossen'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
