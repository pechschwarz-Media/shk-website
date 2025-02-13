'use client';

import Button from '@/components/static/Button';
import { AcfLink, Media } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useSetCookie } from 'cookies-next/client';

export default function Channel({
    channels,
}: {
    channels: {
        customer: { topline: string; headline: string; link: AcfLink; media: Media };
        partner: { topline: string; headline: string; link: AcfLink; media: Media };
    };
}) {
    const setCookie = useSetCookie();

    return (
        <section className="w-full h-screen flex flex-col lg:flex-row">
            <Link
                href={channels?.customer?.link?.url}
                className="flex-1 h-full relative flex items-center justify-center text-white md:hover:flex-[2] transition-all duration-500"
                onClick={() => {
                    setCookie('channel', 'customer', {
                        maxAge: 2592000,
                    });
                }}
            >
                <div className="absolute size-full top-0 left-0">
                    {channels?.customer?.media?.type === 'image' && (
                        <Image src={channels?.customer?.media?.url} alt={channels?.customer?.media?.alt} fill className="object-cover" />
                    )}
                    {channels?.customer?.media?.type === 'video' && (
                        <video autoPlay muted loop playsInline className="size-full object-cover block">
                            <source src={channels?.customer?.media?.url} />
                        </video>
                    )}
                </div>
                <div className="relative text-center">
                    <div className="font-headline font-light leading-tight mb-8">
                        <div className="text-h5">{channels?.customer?.topline}</div>
                        <div className="text-h1">{channels?.customer?.headline}</div>
                    </div>
                    <Button variant="blueFilled" as="button">
                        Zur Homepage
                    </Button>
                </div>
            </Link>
            <Link
                href={channels?.partner?.link?.url}
                className="flex-1 h-full relative flex items-center justify-center text-white md:hover:flex-[2] transition-all duration-500"
                onClick={() => {
                    setCookie('channel', 'partner', {
                        maxAge: 2592000,
                    });
                }}
            >
                <div className="absolute size-full top-0 left-0">
                    {channels?.partner?.media?.type === 'image' && (
                        <Image src={channels?.partner?.media?.url} alt={channels?.partner?.media?.alt} fill className="object-cover" />
                    )}
                    {channels?.partner?.media?.type === 'video' && (
                        <video autoPlay muted loop playsInline className="size-full object-cover block">
                            <source src={channels?.partner?.media?.url} />
                        </video>
                    )}
                </div>
                <div className="relative text-center">
                    <div className="font-headline font-light leading-tight mb-8">
                        <div className="text-h5">{channels?.partner?.topline}</div>
                        <div className="text-h1">{channels?.partner?.headline}</div>
                    </div>
                    <Button variant="blueFilled" as="button">
                        Zur Homepage
                    </Button>
                </div>
            </Link>
        </section>
    );
}
