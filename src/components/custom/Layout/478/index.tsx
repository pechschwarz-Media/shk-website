import Section from "@/components/static/Section";
import Text from "@/components/static/Text";
import { AcfLink, Media, Settings } from "@/lib/types";
import parse from "html-react-parser";
import Button from "@/components/static/Button";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Content = {
    invert: boolean;
    topline: string;
    headline: string;
    text: string;
    image: Media;
    button: AcfLink;
    settings: Settings;
};

export default function Layout_478({ content }: { content: Content }) {
    return (
        <Section dataComponent="Layout_478" settings={content?.settings}>
            <div className="container">
                <div className="grid md:grid-cols-12 gap-6 items-center">
                    {content?.invert === true && (
                        <>
                            <div className="md:col-span-6 xl:col-span-5 rounded-normal overflow-hidden aspect-square">
                                <Image
                                    src={content?.image?.url}
                                    alt={content?.image?.alt}
                                    width={content?.image?.width}
                                    height={content?.image?.height}
                                    className="size-full object-cover"
                                />
                            </div>
                            <div className="md:col-span-6 md:col-start-7">
                                <div className="mb-4">{content?.topline}</div>
                                <h2 className="text-h2 leading-tight font-headline mb-8 text-blue">
                                    {content?.headline}
                                </h2>
                                <Text className="prose-p:text-gray">{parse(content?.text)}</Text>
                                {content?.button?.title && (
                                    <Button
                                        as="link"
                                        variant="blueFilled"
                                        link={content?.button}
                                        className="mt-6"
                                    >
                                        {content?.button?.title}
                                    </Button>
                                )}
                            </div>
                        </>
                    )}

                    {content?.invert === false && (
                        <>
                            <div className="md:col-span-6">
                                <div className="mb-4">{content?.topline}</div>
                                <h2 className="text-h2 leading-tight font-headline mb-8 text-blue">
                                    {content?.headline}
                                </h2>
                                <Text className="prose-p:text-gray">{parse(content?.text)}</Text>
                                {content?.button?.title && (
                                    <Button
                                        as="link"
                                        variant="blueFilled"
                                        link={content?.button}
                                        className="mt-6"
                                    >
                                        {content?.button?.title}
                                    </Button>
                                )}
                            </div>
                            <div className="md:col-span-6 md:col-start-8 rounded-normal overflow-hidden aspect-square">
                                <Image
                                    src={content?.image?.url}
                                    alt={content?.image?.alt}
                                    width={content?.image?.width}
                                    height={content?.image?.height}
                                    className="size-full object-cover"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Section>
    );
}
