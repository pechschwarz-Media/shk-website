import Section from "@/components/static/Section";
import Text from "@/components/static/Text";
import { AcfLink, LocationData, Media, Settings } from "@/lib/types";
import Image from "next/image";
import parse from "html-react-parser";
import Button from "@/components/static/Button";

type Content = {
  media: Media;
  text: string;
  buttons: {
    button_1: AcfLink;
    button_2: AcfLink;
  };
};

export default function Posts_2({
  content,
  locationData,
}: {
  content: Content;
  locationData: LocationData;
}) {
  return (
    <Section dataComponent="Posts_2" settings={{ padding: { top: "off", bottom: "off" } }}>
      <div className="h-[70vh] sm:h-screen w-full relative flex items-center">
        <div className="absolute size-full top-0 left-0">
          {content?.media?.type === "image" && (
            <Image
              src={content?.media?.url}
              alt={content?.media?.alt}
              fill
              className="object-cover"
            />
          )}
          {content?.media?.type === "video" && (
            <video autoPlay muted loop playsInline className="size-full object-cover block">
              <source src={content?.media?.url} />
            </video>
          )}
        </div>
        <div className="relative text-white w-full">
          <div className="container">
            <div className="max-w-xl">
              <h1 className="text-h1 leading-tight font-light mb-8">
                {locationData?.title?.rendered}
              </h1>
              <Text className="text-large">{parse(content?.text)}</Text>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-8">
                <Button as="link" variant="blueFilled" link={content?.buttons?.button_1}>
                  {content?.buttons?.button_1?.title}
                </Button>
                <Button as="link" variant="whiteOutline" link={content?.buttons?.button_2}>
                  {content?.buttons?.button_2?.title}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
