import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { Media, Settings } from '@/lib/types';
import parse from 'html-react-parser';
import Image from 'next/image';

type Content = {
    topline: string;
    headline: string;
    text: string;
    boxes: { icon: Media; headline: string; text: string }[];
    media: Media;
    settings: Settings;
};

export default async function Layout_10({ content }: { content: Content }) {
    return (
        <Section dataComponent="Layout_10" settings={content?.settings}>
            <div className="container">
                <div className="grid lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-6 xl:col-span-6">
                        <div className="mb-4 text-blue">{content?.topline}</div>
                        <h2 className="text-h2 leading-tight font-headline mb-6 text-blue">{content?.headline}</h2>
                        <Text className="prose-p:text-gray text-large">{parse(content?.text)}</Text>
                        <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-6 mt-6 lg:mt-14">
                            {content?.boxes?.map((box, index) => (
                                <div key={index}>
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
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-5 lg:col-start-8 rounded-normal overflow-hidden">
                        {content?.media?.type === 'image' && (
                            <Image
                                src={content?.media?.url}
                                alt={content?.media?.alt}
                                height={content?.media?.height}
                                width={content?.media?.width}
                                className="object-cover size-full"
                            />
                        )}
                        {content?.media?.type === 'video' && (
                            <video autoPlay muted loop playsInline className="size-full object-cover">
                                <source src={content?.media?.url} />
                            </video>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
}
