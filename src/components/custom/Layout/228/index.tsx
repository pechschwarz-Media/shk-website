import Section from '@/components/static/Section';
import { Media, Settings } from '@/lib/types';
import Image from 'next/image';

type Content = {
    box: { icon: Media; text: string }[];
    settings: Settings;
};

export default async function layout_228({ content }: { content: Content }) {
    return (
        <Section dataComponent="layout_228" settings={content?.settings}>
            <div className="container">
                <div className="grid gap-8 xl:gap-10  grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:w-5/6 xl:mx-auto">
                    {content?.box?.map((box, index) => (
                        <div key={index} className="flex flex-col gap-6 items-center">
                            <div className="size-16 xl:size-20">
                                <Image
                                    src={box?.icon?.url ?? ''}
                                    alt={box?.icon?.alt ?? ''}
                                    width={box?.icon?.width ?? ''}
                                    height={box?.icon?.height ?? ''}
                                    className="size-full overflow-hidden"
                                />
                            </div>
                            <h6 className="text-h6 text-center">{box?.text}</h6>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
