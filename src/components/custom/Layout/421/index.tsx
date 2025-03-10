'use client';

import Section from '@/components/static/Section';
import { AcfLink, Media, Settings } from '@/lib/types';
import parse from 'html-react-parser';
import Button from '@/components/static/Button';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useMediaQuery } from 'react-responsive';
import Text from '@/components/static/Text';
import { cn } from '@/lib/utils';
type Content = {
    topline: string;
    headline: string;
    text: string;
    button: AcfLink;
    images: { image: Media }[];
    settings: Settings;
};

export default function Layout_421({ content }: { content: Content }) {
    const ref = useRef<HTMLDivElement>(null);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const { scrollYProgress } = useScroll({ target: ref });

    const containerMotion = {
        opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
        scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.95]),
    };

    const CreateTransform = (x: string[], y: string[]) => ({
        translateX: useTransform(scrollYProgress, [0, 1], x),
        translateY: useTransform(scrollYProgress, [0, 1], y),
    });

    const imageTransforms = [
        {},
        isMobile ? CreateTransform(['13%', '90%'], ['12%', '80%']) : CreateTransform(['0%', '100%'], ['0%', '60%']),
        isMobile ? CreateTransform(['-12%', '-80%'], ['-12%', '-80%']) : CreateTransform(['0%', '-50%'], ['0%', '-90%']),
        isMobile ? CreateTransform(['17.5%', '120%'], ['-6%', '-40%']) : CreateTransform(['0%', '140%'], ['0%', '-40%']),
        isMobile ? CreateTransform(['-17.5%', '-120%'], ['9%', '60%']) : CreateTransform(['0%', '-140%'], ['0%', '60%']),
    ];

    return (
        <Section dataComponent="Layout_421" settings={content?.settings}>
            <div ref={ref}>
                <motion.div
                    className="sticky top-[20%] z-20 mx-auto flex min-h-0 items-center justify-center md:min-h-[auto]"
                    style={containerMotion}
                >
                    <div className="container flex flex-col items-center text-center w-1/2">
                        <div className="mb-4">{content?.topline}</div>
                        <h2 className="text-h2 leading-tight font-headline mb-8 text-blue">{content?.headline}</h2>
                        <Text className="prose-p:text-gray text-center">{parse(content?.text)}</Text>
                        <Button as="link" variant="blueFilled" link={content?.button}>
                            {content?.button?.title}
                        </Button>
                    </div>
                </motion.div>

                <div className="sticky top-0 z-10 -mt-20 flex h-[100svh] flex-col justify-center sm:mt-0 md:h-[100svh] lg:h-[120vh] lg:justify-normal">
                    <div className="relative flex size-full items-center justify-center overflow-hidden">
                        {content?.images?.map((image, index) => (
                            <motion.div
                                key={index}
                                className={cn('absolute size-[500px] rounded-normal overflow-hidden', imageTransforms[index])}
                                style={imageTransforms[index]}
                            >
                                <Image
                                    src={image?.image?.url}
                                    alt={image?.image?.alt}
                                    width={image?.image?.width}
                                    height={image?.image?.height}
                                    className="object-cover size-full"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="absolute inset-0 -z-10 mt-[80vh] sm:mt-[100vh]" />
            </div>
        </Section>
    );
}
