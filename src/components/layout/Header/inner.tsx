'use client';

import Button from '@/components/static/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { animate, AnimatePresence, motion, stagger } from 'motion/react';
import { AcfLink, CustomerMenu } from '@/lib/types';
import Logo from '@/components/static/Logo';
import { setCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';

export default function HeaderInner({
    channel,
    menu,
    links,
}: {
    channel: string;
    menu: CustomerMenu;
    links: { locations: AcfLink; appointment: AcfLink; shop: AcfLink; locations2: AcfLink };
}) {
    const [currentMenuItem, setCurrentMenuItem] = useState(-1);
    const [toggle, setToggle] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [changeChannel, setChangeChannel] = useState(false);

    useEffect(() => {
        if (toggle) {
            if (menuOpen) {
                setCurrentMenuItem(-1);
                animate([
                    ['.mobile-menu', { y: ['-100%', '0%'] }, { ease: [0.645, 0.045, 0.355, 1] }],
                    ['.children', { y: [40, 0], opacity: [0, 1] }, { ease: [0.645, 0.045, 0.355, 1], delay: stagger(0.1), at: '-0.15' }],
                ]);
            } else {
                animate([
                    ['.children', { y: [0, -40], opacity: [1, 0] }, { ease: [0.645, 0.045, 0.355, 1] }],
                    ['.mobile-menu', { y: ['0%', '-100%'] }, { ease: [0.645, 0.045, 0.355, 1], delay: stagger(0.1), at: '-0.15' }],
                ]);
            }
        }
    }, [menuOpen]);

    const router = useRouter();

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 w-full z-50 bg-light/80 h-20 border-t-8 border-b border-b-gray/30 lg:border-b-0',
                    channel === 'customer' && 'border-t-customer',
                    channel === 'partner' && 'border-t-partner',
                    channel === 'energiesparwelten' && 'border-energiesparwelt',
                    channel === 'fliesenwelten' && 'border-fliesenwelt',
                    channel === 'baederwelten' && 'border-baederwelt'
                )}
            >
                <div className="absolute top-0 left-0 size-full backdrop-blur -z-10"></div>
                <div className="container h-full">
                    <div className="flex justify-between h-full items-center">
                        <Link href="/">
                            <Logo className="h-10 text-blue" />
                        </Link>
                        <div className="max-h-screen hidden lg:block">
                            <nav className="container max-w-full">
                                <ul className="flex items-center gap-10">
                                    {menu?.length > 0 && (
                                        <>
                                            {menu?.map((menuItem, index) => {
                                                return (
                                                    <li key={index}>
                                                        <Link
                                                            href={menuItem?.link?.url}
                                                            className="flex items-center gap-1"
                                                            onClick={(e) => {
                                                                if (menuItem?.submenu?.length > 0) {
                                                                    e.preventDefault();
                                                                    setCurrentMenuItem(currentMenuItem === index ? -1 : index);
                                                                }
                                                            }}
                                                        >
                                                            {menuItem?.link?.title}
                                                            {menuItem?.submenu?.length > 0 && (
                                                                <div className={cn('transition-all', currentMenuItem === 0 && 'rotate-180')}>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={1.5}
                                                                        stroke="currentColor"
                                                                        className="size-4"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </Link>
                                                        {menuItem?.submenu?.length > 0 && (
                                                            <AnimatePresence>
                                                                {currentMenuItem === index && (
                                                                    <motion.div
                                                                        initial={{ y: '30px', opacity: 0 }}
                                                                        animate={{ y: 0, opacity: 1 }}
                                                                        exit={{ y: '30px', opacity: 0 }}
                                                                        style={{ x: '-50%' }}
                                                                        className="absolute top-full max-w-full left-1/2 mt-4 -translate-x-1/2 bg-light/80 backdrop-blur p-6 lg:p-8 rounded-xl"
                                                                    >
                                                                        <div className="flex flex-row w-full gap-8">
                                                                            {menuItem?.submenu?.map((subMenuItem, index) => {
                                                                                return (
                                                                                    <Link
                                                                                        href={subMenuItem?.link?.url}
                                                                                        className="lg:w-56 flex-1 group"
                                                                                        key={index}
                                                                                    >
                                                                                        <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-5">
                                                                                            <Image
                                                                                                src={subMenuItem?.image?.url}
                                                                                                fill
                                                                                                alt={subMenuItem?.image?.alt}
                                                                                                className="group-hover:scale-110 transition-all"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="text-headline leading-tight text-large text-blue mb-1">
                                                                                            {subMenuItem?.link?.title}
                                                                                        </div>
                                                                                        <div className="text-blue text-small hyphens-auto ">
                                                                                            <p>{subMenuItem?.description}</p>
                                                                                        </div>
                                                                                    </Link>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </>
                                    )}
                                </ul>
                            </nav>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                className="lg:hidden size-12 rounded-full border border-blue bg-gray-light relative"
                                onClick={() => {
                                    setToggle(true);
                                    setMenuOpen(!menuOpen);
                                }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-1">
                                    <span
                                        className={cn(
                                            'w-5 h-[2px] bg-dark block relative transition-all',
                                            menuOpen && 'rotate-[225deg] -bottom-[3px]'
                                        )}
                                    ></span>
                                    <span className={cn('w-5 h-[2px] bg-dark block relative', menuOpen && 'hidden')}></span>
                                    <span
                                        className={cn('w-5 h-[2px] bg-dark block relative transition-all', menuOpen && 'rotate-[135deg] -top-[3px]')}
                                    ></span>
                                </div>
                            </button>
                            {(channel === 'customer' ||
                                channel === 'energiesparwelten' ||
                                channel === 'fliesenwelten' ||
                                channel === 'baederwelten') && (
                                <>
                                    <Link
                                        href={links?.locations?.url}
                                        className="size-12 rounded-full border border-blue bg-gray-light flex items-center justify-center hover:bg-blue hover:text-white transition-all"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                            />
                                        </svg>
                                    </Link>
                                    <Button as="link" link={links?.appointment} variant="blueFilled">
                                        Besichtigung
                                    </Button>
                                </>
                            )}
                            {channel === 'partner' && (
                                <>
                                    <Link
                                        href={links?.shop?.url}
                                        className="size-12 rounded-full border border-blue bg-gray-light flex items-center justify-center hover:bg-blue hover:text-white transition-all"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_8386_22116)">
                                                <path
                                                    d="M4 19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21C6.53043 21 7.03914 20.7893 7.41421 20.4142C7.78929 20.0391 8 19.5304 8 19C8 18.4696 7.78929 17.9609 7.41421 17.5858C7.03914 17.2107 6.53043 17 6 17C5.46957 17 4.96086 17.2107 4.58579 17.5858C4.21071 17.9609 4 18.4696 4 19Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M17 17H6V3H4"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M6 5L20 6L19 13H6"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_8386_22116">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </Link>
                                    <Button as="link" link={links?.locations2} variant="blueFilled">
                                        Standorte
                                    </Button>
                                </>
                            )}
                            <button
                                className="hidden lg:flex items-center gap-2 ml-4"
                                onClick={() => {
                                    setChangeChannel(true);

                                    let cookie = 'customer';
                                    let link = '/kunden/';

                                    switch (channel) {
                                        case 'customer':
                                            cookie = 'partner';
                                            link = '/partner/';
                                            break;
                                        case 'partner':
                                            cookie = 'customer';
                                            link = '/kunden/';
                                            break;
                                        case 'energiesparwelten':
                                            cookie = 'partner';
                                            link = '/partner/';
                                            break;
                                        case 'fliesenwelten':
                                            cookie = 'partner';
                                            link = '/partner/';
                                            break;
                                        case 'baederwelten':
                                            cookie = 'partner';
                                            link = '/partner/';
                                            break;
                                    }

                                    setCookie('channel', cookie);
                                    router.push(link);
                                }}
                            >
                                <label className="text-blue cursor-pointer">
                                    {channel === 'customer' && 'Kunde'}
                                    {channel === 'partner' && 'Partner'}
                                    {channel === 'energiesparwelten' && 'Kunde'}
                                    {channel === 'fliesenwelten' && 'Kunde'}
                                    {channel === 'baederwelten' && 'Kunde'}
                                </label>
                                <div
                                    className={cn(
                                        'block relative h-8 w-14 rounded-full',
                                        channel === 'customer' && 'bg-[#E0FBFF]',
                                        channel === 'energiesparwelten' && 'bg-[#E0FBFF]',
                                        channel === 'fliesenwelten' && 'bg-[#E0FBFF]',
                                        channel === 'baederwelten' && 'bg-[#E0FBFF]',
                                        channel === 'partner' && 'bg-[#FFF7F3]'
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'absolute top-1/2 -translate-y-1/2 size-6 rounded-full block transition-all',
                                            channel === 'customer' && 'bg-customer left-1',
                                            channel === 'energiesparwelten' && 'bg-customer left-1',
                                            channel === 'fliesenwelten' && 'bg-customer left-1',
                                            channel === 'baederwelten' && 'bg-customer left-1',
                                            channel === 'partner' && 'bg-partner left-7',
                                            changeChannel && channel === 'customer' && 'left-7',
                                            changeChannel && channel === 'partner' && 'left-1'
                                        )}
                                    ></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <div className="mobile-menu -translate-y-full bg-gray-light overflow-auto max-h-screen border-b border-b-gray/30 pt-[80px] z-10 fixed top-0 left-0 w-full">
                <nav className="container">
                    <ul className="flex flex-col divide-y divide-gray/30">
                        {menu?.length > 0 && (
                            <>
                                {menu?.map((menuItem, index) => {
                                    return (
                                        <li className="children" key={index}>
                                            <Link
                                                href={menuItem?.link?.url}
                                                className="flex items-center gap-1 py-3"
                                                onClick={(e) => {
                                                    if (menuItem?.submenu?.length > 0) {
                                                        e.preventDefault();
                                                        setCurrentMenuItem(currentMenuItem === index ? -1 : index);
                                                    }
                                                }}
                                            >
                                                {menuItem?.link?.title}
                                                {menuItem?.submenu?.length > 0 && (
                                                    <div className={cn('transition-all', currentMenuItem === 0 && 'rotate-180')}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="size-4"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </Link>
                                            {menuItem?.submenu?.length > 0 && (
                                                <AnimatePresence>
                                                    {currentMenuItem === 0 && (
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: 'auto' }}
                                                            exit={{ height: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="max-w-full bg-light/80 lg:backdrop-blur p-6 rounded-xl mb-5"
                                                            >
                                                                <div className="flex flex-col lg:flex-row gap-6">
                                                                    {menuItem?.submenu?.map((subMenuItem, index) => {
                                                                        return (
                                                                            <Link href={subMenuItem?.link?.url} key={index}>
                                                                                <div className="text-headline leading-tight text-large text-blue mb-1">
                                                                                    {subMenuItem?.link?.title}
                                                                                </div>
                                                                                <div className="text-blue text-small">
                                                                                    <p>{subMenuItem?.description}</p>
                                                                                </div>
                                                                            </Link>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </motion.div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            )}
                                        </li>
                                    );
                                })}
                            </>
                        )}
                    </ul>
                    <div className="mt-4 py-4 border-t border-dashed border-t-gray/30">
                        <div className="font-bold text-small mb-2">Kanal auswählen</div>
                        <button
                            className="hidden lg:flex items-center gap-2 ml-4"
                            onClick={() => {
                                setChangeChannel(true);

                                let cookie = 'customer';
                                let link = '/kunden/';

                                switch (channel) {
                                    case 'customer':
                                        cookie = 'partner';
                                        link = '/partner/';
                                        break;
                                    case 'partner':
                                        cookie = 'customer';
                                        link = '/kunden/';
                                        break;
                                    case 'energiesparwelten':
                                        cookie = 'partner';
                                        link = '/partner/';
                                        break;
                                    case 'fliesenwelten':
                                        cookie = 'partner';
                                        link = '/partner/';
                                        break;
                                    case 'baederwelten':
                                        cookie = 'partner';
                                        link = '/partner/';
                                        break;
                                }

                                setCookie('channel', cookie);
                                router.push(link);
                            }}
                        >
                            <label className="text-blue cursor-pointer">
                                {channel === 'customer' && 'Kunde'}
                                {channel === 'partner' && 'Partner'}
                                {channel === 'energiesparwelten' && 'Kunde'}
                                {channel === 'fliesenwelten' && 'Kunde'}
                                {channel === 'baederwelten' && 'Kunde'}
                            </label>
                            <div
                                className={cn(
                                    'block relative h-8 w-14 rounded-full',
                                    channel === 'customer' && 'bg-[#E0FBFF]',
                                    channel === 'energiesparwelten' && 'bg-[#E0FBFF]',
                                    channel === 'fliesenwelten' && 'bg-[#E0FBFF]',
                                    channel === 'baederwelten' && 'bg-[#E0FBFF]',
                                    channel === 'partner' && 'bg-[#FFF7F3]'
                                )}
                            >
                                <span
                                    className={cn(
                                        'absolute top-1/2 -translate-y-1/2 size-6 rounded-full block transition-all',
                                        channel === 'customer' && 'bg-customer left-1',
                                        channel === 'energiesparwelten' && 'bg-customer left-1',
                                        channel === 'fliesenwelten' && 'bg-customer left-1',
                                        channel === 'baederwelten' && 'bg-customer left-1',
                                        channel === 'partner' && 'bg-partner left-7',
                                        changeChannel && channel === 'customer' && 'left-7',
                                        changeChannel && channel === 'partner' && 'left-1'
                                    )}
                                ></span>
                            </div>
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
}
