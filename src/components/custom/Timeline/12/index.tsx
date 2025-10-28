'use client';

import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { ImageSettings, Media, Settings } from '@/lib/types';
import { cn } from '@/lib/utils';
import parse from 'html-react-parser';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Content = {
    headline: string;
    text: string;
    boxes: { year: string; headline: string; text: string; image: Media; imageSettings: ImageSettings }[];
    settings: Settings;
};

export default function Layout_478({ content }: { content: Content }) {
    const component = useRef<HTMLDivElement>(null);
    const [centerHeight, setCenterHeight] = useState(2000);

    useEffect(() => {
        if (window) {
            setCenterHeight(Math.floor(window.innerHeight / 2));
        }
    }, [window]);

    const { scrollYProgress } = useScroll({
        target: component,
        offset: ['start center', 'end center'],
    });

    const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <Section dataComponent="Timeline_12" settings={{ ...content.settings, preventAnimation: true }}>
            <div className="mb-12 md:mb-18 lg:mb-20">
                <div className="container">
                    <div className="mx-auto text-center">
                        <h2 className="text-h2 leading-tight font-headline mb-8 text-blue">{content?.headline}</h2>
                        <Text className="mx-auto">{parse(content?.text)}</Text>
                    </div>
                </div>
            </div>
            <div className="container" ref={component}>
                <div className="relative">
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 h-full w-px bg-blue">
                        <motion.div style={{ height: height }} className="absolute w-full h-0 bg-blue"></motion.div>
                    </div>
                    {content?.boxes?.map((step, index) => {
                        return (
                            <div key={index} className="grid md:grid-cols-2 gap-x-28 relative !mb-14 lg:mb-0 pl-8 sm:pl-14 md:pl-0">
                                <div className="absolute left-0 md:left-1/2 top-1/4 -translate-x-1/2 size-8 rounded-full bg-white">
                                    <motion.div
                                        whileInView={{ backgroundColor: '#7A7A7A', scale: 1.5 }}
                                        style={{ x: '-50%', y: '-50%' }}
                                        viewport={{ margin: `0px 0px -${centerHeight}px 0px` }}
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-blue"
                                    ></motion.div>
                                </div>
                                <div className={cn(index % 2 == 0 && 'md:col-start-2')}>
                                    <motion.div
                                        viewport={{ margin: `0px 0px -${centerHeight + 30}px 0px` }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        style={{ opacity: 0, y: 48 }}
                                        transition={{ duration: 0.4 }}
                                        className="bg-gray-medium rounded-normal overflow-hidden"
                                    >
                                        <div className="p-6 sm:p-8">
                                            <div className="text-blue text-base leading-none mb-4">{step?.year}</div>
                                            <h4 className="text-h4 leading-small text-blue mb-6">{step?.headline}</h4>
                                            <Text className="prose-p:text-gray">{parse(step?.text || '')}</Text>
                                        </div>
                                        {step?.image?.url && (
                                            <Image
                                                src={step?.image?.url}
                                                alt={step?.image?.alt || ''}
                                                height={step?.image?.height || 1200}
                                                width={step?.image?.width || 800}
                                                style={
                                                    {
                                                        '--image-height': step?.imageSettings?.height ? `${step?.imageSettings?.height}px` : 'auto',
                                                        '--image-height-mobile': step?.imageSettings?.height_mobile ? `${step?.imageSettings?.height_mobile}px` : 'auto',
                                                    } as React.CSSProperties
                                                }
                                                className={cn(
                                                    'dynamic-image w-full object-cover',
                                                    step?.imageSettings?.height && 'aspect-auto',
                                                    step?.imageSettings?.position === 'top' && 'object-top',
                                                    step?.imageSettings?.position === 'center' && 'object-center',
                                                    step?.imageSettings?.position === 'bottom' && 'object-bottom',
                                                    step?.imageSettings?.position === 'topLeft' && 'object-left-top',
                                                    step?.imageSettings?.position === 'topRight' && 'object-right-top',
                                                    step?.imageSettings?.position === 'centerLeft' && 'object-right',
                                                    step?.imageSettings?.position === 'centerRight' && 'object-left',
                                                    step?.imageSettings?.position === 'bottomLeft' && 'object-left-bottom',
                                                    step?.imageSettings?.position === 'bottomRight' && 'object-right-bottom'
                                                )}
                                            />
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}
