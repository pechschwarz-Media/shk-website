'use client';

import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { ImageSettings, Media, Settings } from '@/lib/types';
import { cn } from '@/lib/utils';
import parse from 'html-react-parser';
import Image from 'next/image';
import { useState } from 'react';

type Content = {
    topline: string;
    headline: string;
    text: string;
    boxes: { icon: Media; headline: string; text: string; image: Media; imageSettings: ImageSettings }[];
    settings: Settings;
};

export default function Layout_10({ content }: { content: Content }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <Section dataComponent="Layout_10" settings={content?.settings}>
            <div className="container">
                <div className="grid lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-6 xl:col-span-6">
                        <div className="mb-4 text-blue">{content?.topline}</div>
                        <h2 className="text-h2 leading-tight font-headline mb-6 text-blue">{content?.headline}</h2>
                        <Text className="prose-p:text-gray text-large">{parse(content?.text)}</Text>
                        <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-6 mt-6 lg:mt-14 lg:-mx-4">
                            {content?.boxes?.map((box, index) => (
                                <>
                                    <button
                                        className={cn(
                                            'text-left text-inherit lg:border border-transparent hover:border-gray-medium rounded-normal lg:p-4',
                                            index === currentIndex && 'border-gray-medium'
                                        )}
                                        onClick={() => {
                                            setCurrentIndex(index);
                                        }}
                                        key={index}
                                    >
                                        <div className="size-12 bg-gray-medium p-2 rounded-xl mb-4">
                                            <Image
                                                src={box?.icon?.url}
                                                alt={box?.icon?.alt}
                                                width={box?.icon?.width}
                                                height={box?.icon?.height}
                                                className="size-full object-cover"
                                            />
                                        </div>
                                        <h6 className="text-h6 font-headline leading-tight text-bold text-blue mb-4">{box?.headline}</h6>
                                        <Text className="prose-p:text-gray">{parse(box?.text)}</Text>
                                    </button>
                                    <Image
                                        src={box?.image?.url}
                                        alt={box?.image?.alt}
                                        height={box?.image?.height}
                                        width={box?.image?.width}
                                        style={{ height: box?.imageSettings?.height ? `${box?.imageSettings?.height}px` : 'auto' }}
                                        className={cn(
                                            'object-cover size-full lg:hidden rounded-normal overflow-hidden -mt-4',
                                            box?.imageSettings?.height && 'aspect-auto',
                                            box?.imageSettings?.position === 'top' && 'object-top',
                                            box?.imageSettings?.position === 'center' && 'object-center',
                                            box?.imageSettings?.position === 'bottom' && 'object-bottom',
                                            box?.imageSettings?.position === 'topLeft' && 'object-left-top',
                                            box?.imageSettings?.position === 'topRight' && 'object-right-top',
                                            box?.imageSettings?.position === 'centerLeft' && 'object-right',
                                            box?.imageSettings?.position === 'centerRight' && 'object-left',
                                            box?.imageSettings?.position === 'bottomLeft' && 'object-left-bottom',
                                            box?.imageSettings?.position === 'bottomRight' && 'object-right-bottom'
                                        )}
                                        key={index}
                                    />
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-5 lg:col-start-8 rounded-normal overflow-hidden hidden lg:block">
                        {content?.boxes?.map((box, index) => {
                            if (index === currentIndex) {
                                return (
                                    <Image
                                        src={box?.image?.url}
                                        alt={box?.image?.alt}
                                        height={box?.image?.height}
                                        width={box?.image?.width}
                                        style={{ height: box?.imageSettings?.height ? `${box?.imageSettings?.height}px` : 'auto' }}
                                        className={cn(
                                            'object-cover size-full',
                                            box?.imageSettings?.height && 'aspect-auto',
                                            box?.imageSettings?.position === 'top' && 'object-top',
                                            box?.imageSettings?.position === 'center' && 'object-center',
                                            box?.imageSettings?.position === 'bottom' && 'object-bottom',
                                            box?.imageSettings?.position === 'topLeft' && 'object-left-top',
                                            box?.imageSettings?.position === 'topRight' && 'object-right-top',
                                            box?.imageSettings?.position === 'centerLeft' && 'object-right',
                                            box?.imageSettings?.position === 'centerRight' && 'object-left',
                                            box?.imageSettings?.position === 'bottomLeft' && 'object-left-bottom',
                                            box?.imageSettings?.position === 'bottomRight' && 'object-right-bottom'
                                        )}
                                        key={index}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </Section>
    );
}
