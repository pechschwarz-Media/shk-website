import RoundCheck from '@/components/icons/roundCheck';
import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { Media, Settings } from '@/lib/types';
import Image from 'next/image';
import parse from 'html-react-parser';

type Content = {
    media: Media;
    list: { text: string; subText: string }[];
    settings: Settings;
};

export default async function Layout_223({ content }: { content: Content }) {
    return (
        <Section dataComponent="Layout_223" settings={content?.settings}>
            <div className="container">
                <div className="grid md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-6 xl:col-span-5">
                        <div className="w-full aspect-square rounded-normal overflow-hidden">
                            {content?.media?.type === 'image' && (
                                <Image
                                    src={content?.media?.url}
                                    alt={content?.media?.alt}
                                    width={content?.media?.width}
                                    height={content?.media?.height}
                                    className="object-cover size-full"
                                />
                            )}
                            {content?.media?.type === 'video' && (
                                <video autoPlay muted loop playsInline className="size-full object-cover block">
                                    <source src={content?.media?.url} />
                                </video>
                            )}
                        </div>
                    </div>
                    <div className="md:col-span-6 md:col-start-7 flex flex-col gap-4 lg:gap-10">
                        {content?.list?.map((item, index) => (
                            <div className="grid grid-cols-[2.25rem_auto] gap-x-6 gap-y-4" key={index}>
                                <RoundCheck className="size-9 text-energiesparwelt" />
                                <h6 key={index} className="text-h6 font-headline leading-tight text-blue items-center self-center">
                                    {item?.text}
                                </h6>
                                {item?.subText && <Text className="prose-p:text-gray w-full lg:w-1/2 col-start-2">{parse(item?.subText)}</Text>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
