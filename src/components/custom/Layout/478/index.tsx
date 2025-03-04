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
                    <div
                        className={cn(
                            "md:col-span-6 xl:col-span-5",
                            content?.invert === true ? "order-2 md:col-start-8" : "order-1"
                        )}
                    >
                        <Image
                            src={content?.image?.url}
                            alt={content?.image?.alt}
                            width={content?.image?.width}
                            height={content?.image?.height}
                        />
                    </div>
                    <div
                        className={cn(
                            "md:col-span-6 ",
                            content?.invert === true ? "order-1" : "order-2 md:col-start-7"
                        )}
                    >
                        <div className="mb-4">{content?.topline}</div>
                        <h2 className="text-h2 leading-tight font-headline mb-8 text-blue">
                            {content?.headline}
                        </h2>
                        <Text className="prose-p:text-gray">{parse(content?.text)}</Text>
                        <Button
                            as="link"
                            variant="blueFilled"
                            link={content?.button}
                            className="mt-6"
                        >
                            {content?.button?.title}
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    );
}
