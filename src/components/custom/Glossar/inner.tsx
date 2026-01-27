'use client';

import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { Glossar as GlossarType, Settings } from '@/lib/types';
import { cn } from '@/lib/utils';
import parse from 'html-react-parser';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';
import { Element, Link } from 'react-scroll';

type Content = {
    headline: string;
    text: string;
    settings: Settings;
};

export default function GlossarInner({ glossar, content }: { glossar: GlossarType[]; content: Content }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const entries: { [key: string]: GlossarType[] } = {};

    for (const entry of glossar) {
        const letter = entry?.title?.rendered.charAt(0);

        if (!entries[letter]) {
            entries[letter] = [];
        }

        entries[letter].push(entry);
    }

    return (
        <Section dataComponent="Glossar" settings={content?.settings}>
            <div className="pt-[80px] mb-14">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-h1 text-blue font-headline leading-tight font-light mb-4">{content?.headline}</h1>
                        <Text className="prose-p:text-gray">{parse(content?.text)}</Text>
                    </div>
                </div>
            </div>
            <div className="mb-14 sticky top-24">
                <div className="container">
                    <nav className="inline-block bg-gray-medium p-2 rounded-xl">
                        <ul className="flex flex-wrap gap-x-1">
                            {Object.keys(entries)?.map((entry, index) => {
                                return (
                                    <li key={index} className="">
                                        <Link
                                            to={`scroll-${entry}`}
                                            offset={-180}
                                            className={cn('flex items-center justify-center rounded-lg size-8 md:size-10 cursor-pointer', index === currentIndex && 'bg-blue text-white')}
                                        >
                                            {entry}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
            <div>
                <div className="container">
                    <div className="space-y-14">
                        {Object.keys(entries)?.map((entry, index) => {
                            return (
                                <Element name={`scroll-${entry}`} key={index}>
                                    <InView
                                        as="section"
                                        key={index}
                                        threshold={1}
                                        rootMargin="62% 0% -62% 0%"
                                        onChange={(inView) => {
                                            if (inView) {
                                                setCurrentIndex(index);
                                            }
                                        }}
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <div className="md:w-80 text-blue font-headline leading-none text-h1 font-light mb-8 md:mb-0 flex-shrink">
                                                <span className="uppercase">{entry}</span>
                                                <span className="lowercase">{entry}</span>
                                            </div>
                                            <div className="space-y-10 flex-1">
                                                {entries[entry].map((entry, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className="text-h3 text-blue font-headline leading-tight mb-4">{entry?.title?.rendered}</div>
                                                            <Text className="prose-p:text-gray">{parse(entry?.acf?.description)}</Text>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </InView>
                                </Element>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Section>
    );
}
