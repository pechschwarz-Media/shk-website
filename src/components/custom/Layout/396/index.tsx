import Section from '@/components/static/Section';
import { AcfLink, Media, Settings } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

type Content = {
    topline: string;
    headline: string;
    boxes: {
        icon: Media;
        title: string;
        text: string;
        button: AcfLink;
    }[];
    settings: Settings;
};

export default function Layout_396({ content }: { content: Content }) {
    return (
        <Section dataComponent="Layout_396" settings={content?.settings}>
            <div className="mb-14">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="mb-4 text-blue">{content?.topline}</div>
                        <h2 className="text-h2 leading-tight font-headline mb-8 text-blue">{content?.headline}</h2>
                    </div>
                </div>
            </div>
            <div>
                <div className="container">
                    <div className="grid lg:auto-cols-fr gap-6 lg:grid-flow-col">
                        {content?.boxes?.map((box, index) => {
                            return (
                                <div className="bg-gray-medium p-8 rounded-xl flex justify-between flex-col" key={index}>
                                    <div>
                                        <Image
                                            src={box?.icon?.url}
                                            alt={box?.icon?.alt}
                                            width={box?.icon?.width}
                                            height={box?.icon?.height}
                                            className="h-20 w-auto mb-8"
                                        />
                                        <h4 className="text-h4 leading-tight font-headline text-blue mb-8 hyphens-auto">{box?.title}</h4>
                                        <p className="text-gray">{box?.text}</p>
                                    </div>
                                    <Link
                                        href={box?.button?.url}
                                        className="inline-flex items-center text-blue gap-2 mt-8 transition-all hover:gap-3"
                                    >
                                        {box?.button?.title}
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
