import RoundCheck from '@/components/icons/roundCheck';
import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { ImageSettings, Media, Settings } from '@/lib/types';
import Image from 'next/image';
import parse from 'html-react-parser';
import { cn } from '@/lib/utils';

type Content = {
    media: Media;
    text: string;
    list: { text: string; subText: string }[];
    imageSettings: ImageSettings;
    settings: Settings;
};

export default async function Layout_223({ content, channel }: { content: Content; channel: string }) {
    return (
        <Section dataComponent="Layout_223" settings={content?.settings}>
            <div className="container">
                <div className="grid md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-6 xl:col-span-5">
                        <div className="w-full">
                            {content?.media?.type === 'image' && (
                                <Image
                                    src={content?.media?.url}
                                    alt={content?.media?.alt}
                                    width={content?.media?.width}
                                    height={content?.media?.height}
                                    style={{ maxHeight: content?.imageSettings?.height ? `${content?.imageSettings?.height}px` : 'auto' }}
                                    className={cn(
                                        'rounded-normal object-cover size-full',
                                        content?.imageSettings?.height && 'aspect-auto',
                                        content?.imageSettings?.position === 'top' && 'object-top',
                                        content?.imageSettings?.position === 'center' && 'object-center',
                                        content?.imageSettings?.position === 'bottom' && 'object-bottom',
                                        content?.imageSettings?.position === 'topLeft' && 'object-left-top',
                                        content?.imageSettings?.position === 'topRight' && 'object-right-top',
                                        content?.imageSettings?.position === 'centerLeft' && 'object-right',
                                        content?.imageSettings?.position === 'centerRight' && 'object-left',
                                        content?.imageSettings?.position === 'bottomLeft' && 'object-left-bottom',
                                        content?.imageSettings?.position === 'bottomRight' && 'object-right-bottom'
                                    )}
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
                        {content?.text && <Text className="prose-p:text-gray">{parse(content?.text)}</Text>}
                        {content?.list?.map((item, index) => (
                            <div className="grid grid-cols-[2.25rem_auto] gap-x-6 gap-y-4" key={index}>
                                <RoundCheck
                                    className={cn(
                                        'size-9',
                                        channel === 'customer' && 'text-customer',
                                        channel === 'partner' && 'text-partner',
                                        channel === 'energiesparwelten' && 'text-energiesparwelt',
                                        channel === 'fliesenwelten' && 'text-fliesenwelt',
                                        channel === 'baederwelten' && 'text-baederwelt'
                                    )}
                                />
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
