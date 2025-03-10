import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { AcfLink, Media, Settings } from '@/lib/types';
import Image from 'next/image';
import parse from 'html-react-parser';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Content = {
    headline: string;
    text: string;
    tiles: {
        image: Media;
        link: AcfLink;
        fullwidth: boolean;
    }[];
    partner: boolean;
    settings: Settings;
};

export default function Gallery_1({ content }: { content: Content }) {
    return (
        <Section dataComponent="Gallery_1" settings={content?.settings}>
            <div className="mb-14">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <div className="max-w-lg">
                                <h2 className="text-h2 leading-tight text-blue font-headline">{content?.headline}</h2>
                            </div>
                        </div>
                        <div>
                            <Text className="prose-p:text-large prose-p:text-gray">{parse(content?.text)}</Text>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {content?.tiles?.map((tile, index) => {
                            return (
                                <div className={cn(tile?.fullwidth && 'lg:col-span-2')} key={index}>
                                    <Link
                                        href={tile?.link?.url}
                                        className={cn(
                                            'h-[300px] sm:h-[480px] md:h-[540px] xxl:h-[740px] relative block overflow-hidden rounded-xl text-white p-8 md:p-12 group',
                                            content?.partner && '!text-dark bg-light'
                                        )}
                                        key={index}
                                    >
                                        <Image
                                            src={tile?.image?.url}
                                            fill
                                            alt={tile?.image?.alt}
                                            className={cn(
                                                'object-cover group-hover:scale-110 transition-all',
                                                content?.partner && '!w-2/3 !h-auto !top-auto !left-auto !bottom-0 !right-0 group-hover:scale-100'
                                            )}
                                        />
                                        <div className="relative z-10 flex flex-col h-full justify-between">
                                            <div className="text-h3 leading-tight font-headline">{tile?.link?.title}</div>
                                            <button className="flex items-center gap-2">
                                                Jetzt entdecken
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-4"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Section>
    );
}
