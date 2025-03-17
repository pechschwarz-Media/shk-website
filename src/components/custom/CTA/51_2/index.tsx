'use client';

import Button from '@/components/static/Button';
import Section from '@/components/static/Section';
import { Settings } from '@/lib/types';
import { cn } from '@/lib/utils';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

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
    const openingHoursEnergie = locationData?.acf?.energie_open;
    const openingHoursAbhol = locationData?.acf?.abhol_open;

    const [categories, setCategories] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        const bad = Object.values(openingHoursBad).some((value: any) => {
            const time = value.replace(/\s/g, '');
            return time !== 'null';
        });

        const energie = Object.values(openingHoursEnergie).some((value: any) => {
            const time = value.replace(/\s/g, '');
            return time !== 'null';
        });

        const abholung = Object.values(openingHoursAbhol).some((value: any) => {
            const time = value.replace(/\s/g, '');
            return time !== 'null';
        });

        const categories = [];

        if (bad) {
            categories.push('Bad');
        }

        if (energie) {
            categories.push('Energie');
        }

        if (abholung) {
            categories.push('Abholung');
        }

        setCategories(categories);
        setActiveCategory(categories[0]);
    }, []);

    function formatTime(value: string) {
        const time = value.replace(/\s/g, '');
        if (time === null || time === 'null') return 'Geschlossen';
        return String(time).replace(/^(\d{2})(\d{2})$/, '$1:$2');
    }

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
                        <h3 className="text-h3 mb-4">{parse(locationData?.title?.rendered)}</h3>
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
                        <div>
                            <h4 className="text-h4 font-headline font-light leading-tight mb-6">Öffnungszeiten</h4>
                            <div className="w-full md:w-auto inline-block bg-gray-medium overflow-hidden p-2 rounded-xl">
                                <ul className="gap-x-1 flex">
                                    {categories?.map((category, index) => {
                                        return (
                                            <li key={index}>
                                                <button
                                                    className={cn(
                                                        'flex items-center h-10 justify-center rounded-lg px-5 cursor-pointer text-blue',
                                                        activeCategory === category && 'bg-blue text-white'
                                                    )}
                                                    onClick={() => {
                                                        setActiveCategory(category);
                                                    }}
                                                >
                                                    {category}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-4">
                            {categories?.map((category, index) => {
                                let cat = 'bad';

                                switch (category) {
                                    case 'Bad':
                                        cat = 'bad';
                                        break;
                                    case 'Energie':
                                        cat = 'energie';
                                        break;
                                    case 'Abholung':
                                        cat = 'abhol';
                                        break;
                                }

                                if (category === activeCategory) {
                                    return (
                                        <div key={index}>
                                            <table className="w-full">
                                                <tbody className="border border-tabelle-border">
                                                    <tr>
                                                        <td className="p-2 font-bold">Montag</td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_mo_start`]
                                                            )}
                                                        </td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_mo_end`]
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-tabelle-border">
                                                        <td className="p-2 font-bold">Dienstag</td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_di_start`]
                                                            )}
                                                        </td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_di_end`]
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-2 font-bold">Mittwoch</td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_mi_start`]
                                                            )}
                                                        </td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_mi_end`]
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-tabelle-border">
                                                        <td className="p-2 font-bold">Donnerstag</td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_do_start`]
                                                            )}
                                                        </td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_do_end`]
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-2 font-bold">Freitag</td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_fr_start`]
                                                            )}
                                                        </td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_fr_end`]
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-tabelle-border">
                                                        <td className="p-2 font-bold">Samstag</td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_sa_start`]
                                                            )}
                                                        </td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_sa_end`]
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="p-2 font-bold">Sonntag</td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_so_start`]
                                                            )}
                                                        </td>
                                                        <td className="p-2">
                                                            {formatTime(
                                                                (
                                                                    locationData.acf[`${cat}_open` as keyof typeof locationData.acf] as Record<
                                                                        string,
                                                                        any
                                                                    >
                                                                )?.[`${cat}_open_so_end`]
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    );
                                }
                            })}
                            {/*daysEnergie.some(({ key }) => {
                                const start = formatTime(openingHoursEnergie[`energie_open_${key}_start`]);
                                const end = formatTime(openingHoursEnergie[`energie_open_${key}_end`]);
                                return start !== 'Geschlossen' || end !== 'Geschlossen';
                            }) && (
                                <div>
                                    <table className="w-full">
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
                                                            )*/}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
