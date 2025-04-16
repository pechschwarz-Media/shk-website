import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { AcfLink, Media, Settings } from '@/lib/types';
import parse from 'html-react-parser';
import Button from '@/components/static/Button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Content = {
    topline: string;
    headline: string;
    text: string;
    image: Media;
    button: AcfLink;
    invert: boolean;
    settings: Settings;
};

export default function Layout_478({ content }: { content: Content }) {
    return (
        <Section dataComponent="Layout_478" settings={content?.settings}>
            <div className="container">
                <div className="grid lg:grid-cols-12 gap-6 items-center">
                    {content?.invert ? (
                        <>
                            <div className="order-2 lg:order-1 lg:col-span-5">
                                <Image
                                    src={content?.image?.url}
                                    alt={content?.image?.alt}
                                    width={content?.image?.width}
                                    height={content?.image?.height}
                                    className="rounded-2xl aspect-square object-cover"
                                />
                            </div>
                            <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
                                {content?.topline && <div className="mb-4 text-blue">{content?.topline}</div>}

                                <h2 className="text-h2 leading-tight font-headline mb-8 text-blue">{content?.headline}</h2>
                                {content?.text && <Text className="prose-p:text-gray">{parse(content?.text)}</Text>}

                                {content?.button?.title && (
                                    <Button as="link" variant="blueFilled" link={content?.button} className="mt-6">
                                        {content?.button?.title}
                                    </Button>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="lg:col-span-6">
                                {content?.topline && <div className="mb-4 text-blue">{content?.topline}</div>}
                                <h2 className="text-h2 leading-tight font-headline mb-8 text-blue">{content?.headline}</h2>
                                {content?.text && <Text className="prose-p:text-gray">{parse(content?.text)}</Text>}
                                {content?.button?.title && (
                                    <Button as="link" variant="blueFilled" link={content?.button} className="mt-6">
                                        {content?.button?.title}
                                    </Button>
                                )}
                            </div>
                            <div className="lg:col-span-5 lg:col-start-8">
                                <Image
                                    src={content?.image?.url}
                                    alt={content?.image?.alt}
                                    width={content?.image?.width}
                                    height={content?.image?.height}
                                    className="rounded-2xl"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Section>
    );
}
