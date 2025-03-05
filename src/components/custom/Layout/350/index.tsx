'use client';

import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { Media, Settings } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { Link, Element } from 'react-scroll';
import parse from 'html-react-parser';
import { InView } from 'react-intersection-observer';

type Content = {
    sections: {
        topline: string;
        title: string;
        text: string;
        image: Media;
    }[];
    settings: Settings;
};

export default function Layout_350({ content }: { content: Content }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <Section dataComponent="Layout_350" settings={{ ...content?.settings, preventAnimation: true }}>
            <div className="sticky top-24 bottom-0">
                <div className="container">
                    <nav className="inline-block bg-gray-medium w-full overflow-auto p-2 rounded-xl">
                        <ul className="flex gap-x-1">
                            {content?.sections?.map((section, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            to={`layout350-${index}`}
                                            offset={-180}
                                            className={cn(
                                                'flex items-center justify-center rounded-lg h-10 px-5  cursor-pointer',
                                                index === currentIndex && 'bg-blue text-white'
                                            )}
                                        >
                                            {section?.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="space-y-20 md:space-y-36 lg:space-y-56 mt-14">
                {content?.sections?.map((section, index) => {
                    return (
                        <InView
                            as="section"
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
                                            <div className="mb-4">{section?.topline}</div>
                                            <h2 className="text-h2 leading-tight font-headline mb-6 text-blue">{section?.title}</h2>
                                            <Text className="prose-p:text-gray prose-ul:text-gray">{parse(section?.text)}</Text>
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
