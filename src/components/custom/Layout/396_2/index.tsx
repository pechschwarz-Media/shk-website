import Button from "@/components/static/Button";
import Section from "@/components/static/Section";
import { AcfLink, Media, Settings } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type Content = {
    icon: Media;
    topline: string;
    headline: string;
    boxes: {
        icon: Media;
        title: string;
        text: string;
        button: AcfLink;
    }[];
    button: AcfLink;
    settings: Settings;
};

export default function Layout_396_2({ content }: { content: Content }) {
    return (
        <Section dataComponent="Layout_396_2" settings={content?.settings}>
            <div className="mb-14">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="mb-4 text-blue">{content?.topline}</div>
                        <h2 className="text-h2 leading-tight font-headline mb-8 text-blue">
                            {content?.headline}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="flex flex-row flex-wrap justify-center xl:justify-center -mx-3">
                    {content?.boxes?.map((box, index) => {
                        return (
                            <div className="px-3 md:w-1/2 xl:w-1/3 mb-6" key={index}>
                                <div className="bg-gray-medium p-8 rounded-xl flex flex-col w-full h-full">
                                    <div>
                                        <div className="text-boxNumber bg-blue text-white size-12 inline-flex items-center justify-center rounded-xl leading-none mb-6">
                                            {box?.icon?.url ? (
                                                <Image
                                                    src={box?.icon?.url}
                                                    alt={box?.icon?.alt}
                                                    width={box?.icon?.width}
                                                    height={box?.icon?.height}
                                                    className="size-full p-1"
                                                />
                                            ) : (
                                                index + 1
                                            )}
                                        </div>
                                        <h6 className="text-h6 leading-tight font-headline text-blue mb-4 hyphens-auto">
                                            {box?.title}
                                        </h6>
                                    </div>

                                    <p className="text-gray">{box?.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {content?.button && (
                    <div className="flex justify-center">
                        <Button as="link" variant="blueFilled" link={content?.button}>
                            {content?.button.title}
                        </Button>
                    </div>
                )}
            </div>
        </Section>
    );
}
