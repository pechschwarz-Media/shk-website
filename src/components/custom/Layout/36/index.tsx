'use client';

import Section from '@/components/static/Section';
import { Settings } from '@/lib/types';
import { MotionStyle, motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

type Content = {
    text: string;
    settings: Settings;
};

export default function Layout_36({ content }: { content: Content }) {
    const headingRef = useRef<HTMLHeadingElement>(null);

    const { scrollYProgress } = useScroll({
        target: headingRef,
        offset: ['end end', 'start start'],
    });

    const words = content.text.split(' ');

    return (
        <Section dataComponent="Layout_36" settings={content?.settings}>
            <div className="container h-full flex justify-center flex-col" ref={headingRef}>
                <p className="text-scrolltext">
                    {words.map((word, index) => {
                        const start = index * 0.015;
                        const end = start + 0.015;
                        // eslint-disable-next-line
                        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
                        return (
                            <React.Fragment key={index}>
                                <motion.span className="inline-block" style={{ opacity }}>
                                    {word}
                                </motion.span>
                                {index < words.length - 1 && ' '}
                            </React.Fragment>
                        );
                    })}
                </p>
            </div>
        </Section>
    );
}
