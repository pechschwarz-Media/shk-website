"use client";

import Section from "@/components/static/Section";
import { AcfLink, Media, Settings } from "@/lib/types";
import parse from "html-react-parser";
import Button from "@/components/static/Button";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "react-responsive";
import Text from "@/components/static/Text";

type Content = {
    topline: string;
    headline: string;
    text: string;
    button: AcfLink;
    images: { image: Media }[];
    settings: Settings;
};

export default function Layout_421({ content }: { content: Content }) {
    const component = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: component,
        offset: ["start center", "center center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);

    const translateX1Mobile = useTransform(scrollYProgress, [0, 1], ["0%", "130%"]);
    const translateY1Mobile = useTransform(scrollYProgress, [0, 1], ["0%", "125%"]);
    const translateX2Mobile = useTransform(scrollYProgress, [0, 1], ["0%", "-130%"]);
    const translateY2Mobile = useTransform(scrollYProgress, [0, 1], ["0%", "13%"]);
    const translateX3Mobile = useTransform(scrollYProgress, [0, 1], ["0%", "130%"]);
    const translateY3Mobile = useTransform(scrollYProgress, [0, 1], ["0%", "13%"]);
    const translateX4Mobile = useTransform(scrollYProgress, [0, 1], ["0%", "-130%"]);
    const translateY4Mobile = useTransform(scrollYProgress, [0, 1], ["0%", "125%"]);

    const translateX1Desktop = useTransform(scrollYProgress, [0, 1], ["70%", "160%"]);
    const translateY1Desktop = useTransform(scrollYProgress, [0, 1], ["140%", "180%"]);
    const translateX2Desktop = useTransform(scrollYProgress, [0, 1], ["-120%", "-150%"]);
    const translateY2Desktop = useTransform(scrollYProgress, [0, 1], ["40%", "60%"]);
    const translateX3Desktop = useTransform(scrollYProgress, [0, 1], ["120%", "150%"]);
    const translateY3Desktop = useTransform(scrollYProgress, [0, 1], ["40%", "60%"]);
    const translateX4Desktop = useTransform(scrollYProgress, [0, 1], ["-70%", "-160%"]);
    const translateY4Desktop = useTransform(scrollYProgress, [0, 1], ["140%", "180%"]);

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const imageTransforms = isMobile
        ? [
              {},
              { translateX: translateX1Mobile, translateY: translateY1Mobile },
              { translateX: translateX2Mobile, translateY: translateY2Mobile },
              { translateX: translateX3Mobile, translateY: translateY3Mobile },
              { translateX: translateX4Mobile, translateY: translateY4Mobile },
          ]
        : [
              {},
              { translateX: translateX1Desktop, translateY: translateY1Desktop },
              { translateX: translateX2Desktop, translateY: translateY2Desktop },
              { translateX: translateX3Desktop, translateY: translateY3Desktop },
              { translateX: translateX4Desktop, translateY: translateY4Desktop },
          ];

    return (
        <Section dataComponent="Layout_421" settings={content?.settings}>
            <div ref={component}>
                <motion.div className="sticky z-10 top-1/2" style={{ scale, opacity }}>
                    <div className="container flex flex-col items-center text-center">
                        <div className="mb-4">{content?.topline}</div>
                        <h2 className="text-h2 leading-tight font-headline mb-8 text-blue">
                            {content?.headline}
                        </h2>
                        <Text className="prose-p:text-gray text-center">
                            {parse(content?.text)}
                        </Text>
                        <Button as="link" variant="blueFilled" link={content?.button}>
                            {content?.button?.title}
                        </Button>
                    </div>
                </motion.div>
                <div className="relative z-0 -mt-12 lg:-mt-[20rem] top-[100%] flex flex-col justify-center h-[90vh] sm:h-[80vh] md:h-[80vh] lg:h-[100vh] xl:h-[100vh] lg:justify-normal overflow-hidden">
                    <div className="relative flex size-full items-start justify-center">
                        {content?.images?.map((image, index) => {
                            return (
                                <motion.div
                                    className="absolute w-full h-[20vw] max-w-[15vw] md:max-w-[25vw] lg:max-w-[18vw] translate-x-0 translate-y-[100%]"
                                    style={imageTransforms[index]}
                                    key={index}
                                >
                                    <Image
                                        src={image?.image?.url || ""}
                                        width={image?.image?.width || 500}
                                        height={image?.image?.height || 800}
                                        alt={image?.image?.alt || ""}
                                        className="size-full object-cover rounded-[20px]"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Section>
    );
}
