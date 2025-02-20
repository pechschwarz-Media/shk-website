'use client';

import Button from '@/components/static/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { animate, AnimatePresence, motion, stagger } from 'motion/react';

export default function Header({ channel }: { channel: string }) {
    const [currentMenuItem, setCurrentMenuItem] = useState(-1);
    const [toggle, setToggle] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 w-full z-50 bg-light/80 h-20 border-t-8 border-b border-b-gray/30 lg:border-b-0',
                    channel === 'customer' && 'border-t-customer',
                    channel === 'partner' && 'border-t-partner'
                )}
            >
                <div className="absolute top-0 left-0 size-full backdrop-blur -z-10"></div>
                <div className="container h-full">
                    <div className="flex justify-between h-full items-center">
                        <Link href="/">
                            <Image src="/logo.png" width="83" height="30" alt="SHK Logo" />
                        </Link>
                        <div className="max-h-screen hidden lg:block">
                            <nav className="container max-w-full">
                                <ul className="flex items-center gap-10">
                                    <li>
                                        <Link
                                            href="#"
                                            className="flex items-center gap-1"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentMenuItem(currentMenuItem === 0 ? -1 : 0);
                                            }}
                                        >
                                            Welten
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
                                        </Link>
                                        <AnimatePresence>
                                            {currentMenuItem === 0 && (
                                                <motion.div
                                                    initial={{ y: '30px', opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    exit={{ y: '30px', opacity: 0 }}
                                                    style={{ x: '-50%' }}
                                                    className="absolute top-full max-w-full left-1/2 mt-4 -translate-x-1/2 bg-light/80 backdrop-blur p-6 lg:p-8 rounded-xl"
                                                >
                                                    <div className="flex flex-col lg:flex-row gap-8">
                                                        <Link href="#" className="lg:w-56 group">
                                                            <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-5">
                                                                <Image
                                                                    src="/placeholder.webp"
                                                                    fill
                                                                    alt=""
                                                                    className="group-hover:scale-110 transition-all"
                                                                />
                                                            </div>
                                                            <div className="text-headline leading-tight text-h5 text-blue mb-1">Bäder</div>
                                                            <div className="text-blue">
                                                                <p>Finden Sie die passende Heizungs und Lüftungstechnik für Ihr Bauvorhaben.</p>
                                                            </div>
                                                        </Link>
                                                        <Link href="#" className="lg:w-56 group">
                                                            <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-5">
                                                                <Image
                                                                    src="/placeholder.webp"
                                                                    fill
                                                                    alt=""
                                                                    className="group-hover:scale-110 transition-all"
                                                                />
                                                            </div>
                                                            <div className="text-headline leading-tight text-h5 text-blue mb-1">Bäder</div>
                                                            <div className="text-blue">
                                                                <p>Finden Sie die passende Heizungs und Lüftungstechnik für Ihr Bauvorhaben.</p>
                                                            </div>
                                                        </Link>
                                                        <Link href="#" className="lg:w-56 group">
                                                            <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-5">
                                                                <Image
                                                                    src="/placeholder.webp"
                                                                    fill
                                                                    alt=""
                                                                    className="group-hover:scale-110 transition-all"
                                                                />
                                                            </div>
                                                            <div className="text-headline leading-tight text-h5 text-blue mb-1">Bäder</div>
                                                            <div className="text-blue">
                                                                <p>Finden Sie die passende Heizungs und Lüftungstechnik für Ihr Bauvorhaben.</p>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                    <li>
                                        <Link href="#">Eigenmarke</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Services</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Über Uns</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="flex item-center gap-2">
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
                            <Link
                                href="#"
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
                            <Button as="link" link={{ url: '#', target: '_self', title: '' }} variant="blueFilled">
                                Besichtigung
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
            <div className="mobile-menu -translate-y-full bg-gray-light overflow-auto max-h-screen border-b border-b-gray/30 pt-[80px] z-10 fixed top-0 left-0 w-full">
                <nav className="container">
                    <ul className="flex flex-col divide-y divide-gray/30">
                        <li className="children">
                            <Link
                                href="#"
                                className="flex items-center gap-1 py-3"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentMenuItem(currentMenuItem === 0 ? -1 : 0);
                                }}
                            >
                                Welten
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
                            </Link>
                            <AnimatePresence>
                                {currentMenuItem === 0 && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="max-w-full bg-light/80 lg:backdrop-blur p-6 rounded-xl mb-5"
                                        >
                                            <div className="flex flex-col lg:flex-row gap-8">
                                                <Link href="#">
                                                    <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-5">
                                                        <Image src="/placeholder.webp" fill alt="" />
                                                    </div>
                                                    <div className="text-headline leading-tight text-h5 text-blue mb-1">Bäder</div>
                                                    <div className="text-blue">
                                                        <p>Finden Sie die passende Heizungs und Lüftungstechnik für Ihr Bauvorhaben.</p>
                                                    </div>
                                                </Link>
                                                <Link href="#">
                                                    <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-5">
                                                        <Image src="/placeholder.webp" fill alt="" />
                                                    </div>
                                                    <div className="text-headline leading-tight text-h5 text-blue mb-1">Bäder</div>
                                                    <div className="text-blue">
                                                        <p>Finden Sie die passende Heizungs und Lüftungstechnik für Ihr Bauvorhaben.</p>
                                                    </div>
                                                </Link>
                                                <Link href="#">
                                                    <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-5">
                                                        <Image src="/placeholder.webp" fill alt="" />
                                                    </div>
                                                    <div className="text-headline leading-tight text-h5 text-blue mb-1">Bäder</div>
                                                    <div className="text-blue">
                                                        <p>Finden Sie die passende Heizungs und Lüftungstechnik für Ihr Bauvorhaben.</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                        <li className="children">
                            <Link href="#" className="py-3 block">
                                Eigenmarke
                            </Link>
                        </li>
                        <li className="children">
                            <Link href="#" className="py-3 block">
                                Services
                            </Link>
                        </li>
                        <li className="children">
                            <Link href="#" className="py-3 block">
                                Über Uns
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
