'use client';

import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { AcfLink, Media, Settings } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { Link, Element, scroller } from 'react-scroll';
import parse from 'html-react-parser';
import { InView } from 'react-intersection-observer';
import Button from '@/components/static/Button';

type Content = {
    button: AcfLink;
    sections: {
        anchor: string;
        topline: string;
        title: string;
        text: string;
        button: AcfLink;
        image: Media;
    }[];
    settings: Settings;
};

export default function Layout_350({ content, channel }: { content: Content; channel: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <Section dataComponent="Layout_350" settings={{ ...content?.settings, preventAnimation: true }}>
            <div className="sticky top-24 bottom-0">
                <div className="container">
                    <div className="flex justify-between items-center">
                        <nav
                            className={cn(
                                'w-full md:w-auto inline-block bg-gray-medium overflow-hidden p-2 rounded-xl',
                                content?.sections?.length > 6 && channel === 'customer' && 'bg-customer text-white',
                                content?.sections?.length > 6 && channel === 'partner' && 'bg-partner text-white',
                                content?.sections?.length > 6 && channel === 'energiesparwelten' && 'bg-energiesparwelt text-white',
                                content?.sections?.length > 6 && channel === 'fliesenwelten' && 'bg-fliesenwelt text-white',
                                content?.sections?.length > 6 && channel === 'baederwelten' && 'bg-baederwelt text-white',
                                channel === 'customer' && 'max-xl:bg-customer text-white',
                                channel === 'partner' && 'max-xl:bg-partner text-white'
                            )}
                        >
                            {content?.sections?.length < 7 ? (
                                <>
                                    <select
                                        className="h-10 xl:hidden bg-transparent outline-none w-full md:w-80"
                                        onChange={(e) => {
                                            e.preventDefault();

                                            scroller.scrollTo(e.target.value, {
                                                offset: -180,
                                            });
                                        }}
                                    >
                                        {content?.sections?.map((section, index) => {
                                            return (
                                                <option key={index} value={`layout350-${index}`} className="text-dark">
                                                    {section?.title}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <ul className="gap-x-1 hidden xl:flex">
                                        {content?.sections?.map((section, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link
                                                        to={`layout350-${index}`}
                                                        offset={-180}
                                                        className={cn(
                                                            'flex items-center h-10 justify-center rounded-lg px-5  cursor-pointer text-black',
                                                            index === currentIndex && channel === 'customer' && 'bg-customer text-white',
                                                            index === currentIndex && channel === 'partner' && 'bg-partner text-white',
                                                            index === currentIndex &&
                                                                channel === 'energiesparwelten' &&
                                                                'bg-energiesparwelt text-white',
                                                            index === currentIndex && channel === 'fliesenwelten' && 'bg-fliesenwelt text-white',
                                                            index === currentIndex && channel === 'baederwelten' && 'bg-baederwelt text-white'
                                                        )}
                                                    >
                                                        {section?.title}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </>
                            ) : (
                                <select
                                    className="h-10 bg-transparent outline-none w-full md:w-80"
                                    onChange={(e) => {
                                        e.preventDefault();

                                        scroller.scrollTo(e.target.value, {
                                            offset: -180,
                                        });
                                    }}
                                >
                                    {content?.sections?.map((section, index) => {
                                        return (
                                            <option key={index} value={`layout350-${index}`} className="text-dark">
                                                {section?.title}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
                        </nav>
                        <Button as="link" link={content?.button} variant="blueFilled" className="hidden md:flex">
                            {content?.button?.title}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="space-y-20 md:space-y-36 lg:space-y-56 mt-14">
                {content?.sections?.map((section, index) => {
                    return (
                        <InView
                            as="section"
                            id={section?.anchor ? section?.anchor : `anchor-${index}`}
                            key={index}
                            threshold={1}
                            onChange={(inView) => {
                                if (inView) {
                                    setCurrentIndex(index);
                                }
                            }}
                        >
                            <Element name={`layout350-${index}`}>
                                <div className="container">
                                    <div className="grid md:grid-cols-2 items-center gap-8 md:gap-16">
                                        <div className={cn(index % 2 && 'md:order-2')}>
                                            <Image
                                                src={section?.image?.url}
                                                alt={section?.image?.alt}
                                                width={section?.image?.width}
                                                height={section?.image?.height}
                                                className="rounded-2xl"
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-4 text-blue">{section?.topline}</div>
                                            <h2 className="text-h2 leading-tight font-headline mb-6 text-blue">{section?.title}</h2>
                                            <Text className="prose-p:text-gray prose-ul:text-gray">{parse(section?.text)}</Text>
                                            {section?.button && (
                                                <Button as="link" variant="blueFilled" link={section?.button} className="mt-8">
                                                    {section?.button?.title}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Element>
                        </InView>
                    );
                })}
            </div>
        </Section>
    );
}
