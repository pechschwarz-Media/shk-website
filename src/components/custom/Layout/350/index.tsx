'use client';

import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { AcfLink, ImageSettings, Media, Settings } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { Link, Element, scroller } from 'react-scroll';
import parse from 'html-react-parser';
import { InView } from 'react-intersection-observer';
import Button from '@/components/static/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Content = {
    text: string;
    button: AcfLink;
    sections: {
        anchor: string;
        topline: string;
        title: string;
        text: string;
        button: AcfLink;
        button2: AcfLink;
        image: Media;
        imageSettings: ImageSettings;
    }[];
    settings: Settings;
};

export default function Layout_350({ content, channel }: { content: Content; channel: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <Section dataComponent="Layout_350" settings={{ ...content?.settings, preventAnimation: true }}>
            {content?.text && (
                <div>
                    <div className="container">
                        <Text>{parse(content.text)}</Text>
                    </div>
                </div>
            )}
            <div className={cn('sticky top-0 pt-24 pb-5 bottom-0 bg-white', channel === 'partner' && 'bg-partner-bg')}>
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
                                <>
                                    <select
                                        className="hidden h-10 bg-transparent outline-none w-full md:w-100"
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
                                    <Select
                                        onValueChange={(value) => {
                                            scroller.scrollTo(value, {
                                                offset: -180,
                                            });
                                        }}
                                    >
                                        <SelectTrigger className="w-full md:w-[380px] border-none !text-white !shadow-none !ring-0">
                                            <SelectValue placeholder="Thema auswählen" className="!text-white !ring-0" />
                                        </SelectTrigger>
                                        <SelectContent
                                            sideOffset={10}
                                            className={cn(
                                                '!w-full min-w-0 max-w-full border-none',
                                                channel === 'customer' && 'bg-customer/25 text-white',
                                                channel === 'partner' && 'bg-partner text-white',
                                                channel === 'energiesparwelten' && 'bg-energiesparwelt text-white',
                                                channel === 'fliesenwelten' && 'bg-fliesenwelt text-white',
                                                channel === 'baederwelten' && 'bg-baederwelt text-white'
                                            )}
                                        >
                                            {content?.sections?.map((section, index) => {
                                                return (
                                                    <SelectItem value={`layout350-${index}`} key={index}>
                                                        {section?.title}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </>
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
                            threshold={0.6}
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
                                                style={{ maxHeight: section?.imageSettings?.height ? `${section?.imageSettings?.height}px` : 'auto' }}
                                                className={cn(
                                                    'rounded-2xl object-cover',
                                                    section?.imageSettings?.height && 'aspect-auto',
                                                    section?.imageSettings?.position === 'top' && 'object-top',
                                                    section?.imageSettings?.position === 'center' && 'object-center',
                                                    section?.imageSettings?.position === 'bottom' && 'object-bottom',
                                                    section?.imageSettings?.position === 'topLeft' && 'object-left-top',
                                                    section?.imageSettings?.position === 'topRight' && 'object-right-top',
                                                    section?.imageSettings?.position === 'centerLeft' && 'object-right',
                                                    section?.imageSettings?.position === 'centerRight' && 'object-left',
                                                    section?.imageSettings?.position === 'bottomLeft' && 'object-left-bottom',
                                                    section?.imageSettings?.position === 'bottomRight' && 'object-right-bottom'
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-4 text-blue">{section?.topline}</div>
                                            <h2 className="text-h2 leading-tight font-headline mb-6 text-blue">{section?.title}</h2>
                                            <Text className="prose-p:text-gray prose-ul:text-gray">{parse(section?.text)}</Text>
                                            <div className="flex flex-wrap gap-x-2">
                                                {section?.button && (
                                                    <Button as="link" variant="blueFilled" link={section?.button} className="mt-8">
                                                        {section?.button?.title}
                                                    </Button>
                                                )}
                                                {section?.button2 && (
                                                    <Button as="link" variant="blueFilled" link={section?.button2} className="mt-8">
                                                        {section?.button2?.title}
                                                    </Button>
                                                )}
                                            </div>
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
