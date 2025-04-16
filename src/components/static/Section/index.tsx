'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Settings } from '@/lib/types';
import { cva } from 'class-variance-authority';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
    dataComponent: string;
    className?: string;
    settings?: Settings | null;
};

export const sectionVariants = cva('', {
    variants: {
        paddingTop: {
            off: 'pt-0',
            small: 'pt-8 md:pt-12',
            medium: 'pt-16 md:pt-20 lg:pt-28',
            large: 'pt-20 md:pt-28 lg:pt-36',
        },
        paddingBottom: {
            off: 'pb-0',
            small: 'pb-8 md:pb-12',
            medium: 'pb-16 md:pb-20 lg:pb-28',
            large: 'pb-20 md:pb-28 lg:pb-36',
        },
    },
    defaultVariants: {
        paddingTop: 'medium',
        paddingBottom: 'medium',
    },
});

export default function Section({ dataComponent, className, settings, children, ...props }: SectionProps) {
    const element = useRef(null);
    const preventAnimation = settings?.preventAnimation;

    if (settings?.hide) {
        return null;
    }

    return (
        <section
            data-component={dataComponent}
            className={cn(
                sectionVariants({
                    paddingTop: settings?.padding?.top,
                    paddingBottom: settings?.padding?.bottom,
                }),
                className
            )}
            ref={element}
            {...props}
        >
            <motion.div
                className="h-full"
                initial={{ opacity: preventAnimation ? 1 : 0, y: preventAnimation ? 0 : 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
            >
                {children}
            </motion.div>
        </section>
    );
}
