'use client';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Media, Settings } from '@/lib/types';
import Image from 'next/image';
import Section from '@/components/static/Section';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import ArrowRight from '@/components/icons/arrow-right';
import Dot from '@/components/icons/dot';

type Content = {
    headline: string;
    gallery: { image: Media; text: string }[];
    settings: Settings;
};

export default function Gallery_20({ content }: { content: Content }) {
    const swiperRef = useRef<SwiperRef>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <Section dataComponent="Gallery_20" settings={content?.settings}>
            <div className="container relative">
                <h2 className="text-h2 font-headline leading-tight mb-10 lg:mb-20">{content?.headline}</h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    className="aspect-[2/1] rounded-normal"
                    ref={swiperRef}
                    onSlideChange={(swiper) => {
                        setCurrentIndex(swiper.activeIndex);
                    }}
                >
                    {content?.gallery?.map((item, index) => (
                        <SwiperSlide key={index} className="w-1/2 rounded-normal overflow-hidden h-full relative">
                            <Image
                                src={item?.image?.url}
                                alt={item?.image?.alt}
                                width={item?.image?.width}
                                height={item?.image?.height}
                                sizes="100vw"
                                quality={100}
                                className="size-full object-cover"
                            />
                            {item?.text && <div className="absolute bottom-0 left-0 z-10 bg-white/60 w-full px-5 py-1">{item?.text}</div>}
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex items-center justify-between mt-4 lg:mt-8">
                    <div className="flex gap-2">
                        {content?.gallery?.map((indicator, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (swiperRef?.current) {
                                        swiperRef?.current?.swiper?.slideTo(index);
                                    }
                                }}
                                className={cn('text-black', currentIndex !== index && 'opacity-30')}
                            >
                                <Dot className="size-3" />
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 lg:gap-4">
                        <button
                            onClick={() => {
                                if (swiperRef?.current) {
                                    swiperRef?.current?.swiper?.slidePrev();
                                }
                            }}
                            className={cn('rounded-full border border-black p-1 lg:p-3', currentIndex === 0 && 'opacity-50')}
                        >
                            <ArrowRight className="rotate-180" />
                        </button>
                        <button
                            onClick={() => {
                                if (swiperRef?.current) {
                                    swiperRef?.current?.swiper?.slideNext();
                                }
                            }}
                            className={cn(
                                'rounded-full border border-black p-1 lg:p-3',
                                currentIndex === content?.gallery?.length - 1 && 'opacity-50'
                            )}
                        >
                            <ArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </Section>
    );
}
