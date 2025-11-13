import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import getLogos from '@/lib/queries/logos/getLogos';
import { Settings } from '@/lib/types';
import parse from 'html-react-parser';
import Image from 'next/image';

type Content = {
    headline: string;
    text: string;
    logos: number[];
    settings: Settings;
};

export default async function Logo_3({ content }: { content: Content }) {
    const logoIds = content?.logos;

    const logos = await getLogos(logoIds);

    return (
        <Section dataComponent="Logo_3" settings={content?.settings}>
            {content?.headline && (
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
            )}
            <div className="flex items-center overflow-hidden">
                <div className="flex shrink-0 animate-logos w-[150%] justify-between items-center">
                    {Array(2)
                        .fill(logos)
                        .flat()
                        .map((logo, index) => {
                            return (
                                <Image
                                    key={index}
                                    src={logo?.acf?.logo?.url ?? ''}
                                    alt={logo?.acf?.logo?.alt ?? ''}
                                    width={logo?.acf?.logo?.width || 500}
                                    height={logo?.acf?.logo?.height || 500}
                                    className="mx-12 h-24 lg:h-32 w-auto shrink-0 md:mx-14 md:max-h-32"
                                />
                            );
                        })}
                </div>
            </div>
        </Section>
    );
}
