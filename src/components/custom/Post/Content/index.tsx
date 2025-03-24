'use client';

import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { Post } from '@/lib/types';
import Image from 'next/image';
import parse from 'html-react-parser';
import { Element, Link } from 'react-scroll';
import { InView } from 'react-intersection-observer';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Content = {
    post: Post;
};

export default function PostContent({ post }: Content) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <Section dataComponent="PostContent" settings={{ padding: { top: 'off', bottom: 'medium' }, preventAnimation: true }}>
            <div className="container">
                <div className="grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-3">
                        <div className="sticky top-20">
                            <div className="text-h5 font-headline text-blue leading-tight mb-4 font-light">Inhalt</div>
                            <nav>
                                <ul>
                                    {post?.acf?.content?.map((content, index) => {
                                        return (
                                            <li>
                                                <Link
                                                    to={`section-${index}`}
                                                    className={cn(
                                                        'block text-blue p-3 hover:bg-gray-medium transition-all rounded-lg cursor-pointer',
                                                        currentIndex === index && 'bg-gray-medium'
                                                    )}
                                                    key={index}
                                                >
                                                    {content?.title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="lg:col-span-8 lg:col-start-5">
                        <div className="space-y-12">
                            {post?.acf?.content?.map((content, index) => {
                                return (
                                    <Element name={`section-${index}`} as="section" key={index} className="space-y-12">
                                        <InView
                                            as="section"
                                            threshold={1}
                                            rootMargin="20% 0% -20% 0%"
                                            onChange={(inView) => {
                                                if (inView) {
                                                    setCurrentIndex(index);
                                                }
                                            }}
                                        >
                                            {content?.content?.map((block, index) => {
                                                return (
                                                    <div key={index}>
                                                        {block?.acf_fc_layout === 'text' && <Text>{parse(block?.text)}</Text>}
                                                        {block?.acf_fc_layout === 'image' && (
                                                            <>
                                                                <Image
                                                                    src={block?.image?.url}
                                                                    alt={block?.image?.alt}
                                                                    width={block?.image.width}
                                                                    height={block?.image.height}
                                                                    className="w-full rounded-xl"
                                                                />
                                                                {block?.description && (
                                                                    <div className="border-l-2 border-l-blue text-small pl-3 mt-3">
                                                                        {block?.description}
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </InView>
                                    </Element>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
