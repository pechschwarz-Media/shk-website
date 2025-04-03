'use client';

import Button from '@/components/static/Button';
import { AcfLink, Media } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useSetCookie } from 'cookies-next/client';
import Logo from '@/components/static/Logo';

export default function Channel({
    channels,
}: {
    channels: {
        customer: { topline: string; headline: string; text: string; link: AcfLink; media: Media };
        partner: { topline: string; headline: string; text: string; link: AcfLink; media: Media };
    };
}) {
    const setCookie = useSetCookie();

    return (
        <section className="w-full relative h-screen flex flex-col lg:flex-row">
            <div className="absolute top-0 left-0 md:left-10 z-10 bg-white p-3 md:p-4">
                <Logo className="h-10 w-auto" />
            </div>
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
                    <div className="absolute bg-black opacity-30 inset-0 z-10"></div>
                    {channels?.customer?.media?.type === 'image' && (
                        <Image src={channels?.customer?.media?.url} alt={channels?.customer?.media?.alt} fill className="object-cover" />
                    )}
                    {channels?.customer?.media?.type === 'video' && (
                        <video autoPlay muted loop playsInline className="size-full object-cover block">
                            <source src={channels?.customer?.media?.url} />
                        </video>
                    )}
                </div>
                <div className="relative text-center z-20">
                    <div className="font-headline font-light leading-tight mb-8 max-w-lg">
                        <div className="text-h5">{channels?.customer?.topline}</div>
                        <div className="text-h1">{channels?.customer?.headline}</div>
                        {channels?.customer?.text && <div className="mt-4">{channels?.customer?.text}</div>}
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
                    <div className="absolute bg-black opacity-30 inset-0 z-10"></div>
                    {channels?.partner?.media?.type === 'image' && (
                        <Image src={channels?.partner?.media?.url} alt={channels?.partner?.media?.alt} fill className="object-cover" />
                    )}
                    {channels?.partner?.media?.type === 'video' && (
                        <video autoPlay muted loop playsInline className="size-full object-cover block">
                            <source src={channels?.partner?.media?.url} />
                        </video>
                    )}
                </div>
                <div className="relative text-center z-20">
                    <div className="font-headline font-light leading-tight mb-8 max-w-lg">
                        <div className="text-h5">{channels?.partner?.topline}</div>
                        <div className="text-h1">{channels?.partner?.headline}</div>
                        {channels?.partner?.text && <div className="mt-4">{channels?.partner?.text}</div>}
                    </div>
                    <Button variant="blueFilled" as="button">
                        Zur Homepage
                    </Button>
                </div>
            </Link>
        </section>
    );
}
