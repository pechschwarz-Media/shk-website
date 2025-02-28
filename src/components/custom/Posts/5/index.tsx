import RoundCheck from "@/components/icons/roundCheck";
import Section from "@/components/static/Section";
import { Media, Settings } from "@/lib/types";
import Image from "next/image";

type Content = {
  media: Media;
  list: { text: string }[];
  settings: Settings;
};

export default async function Posts_5({ content }: { content: Content }) {
  return (
    <Section dataComponent="Posts_5" settings={content?.settings}>
      <div className="container">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 xl:col-span-5">
            <div className="w-full aspect-square rounded-normal overflow-hidden">
              {content?.media?.type === "image" && (
                <Image
                  src={content?.media?.url}
                  alt={content?.media?.alt}
                  width={content?.media?.width}
                  height={content?.media?.height}
                  className="object-cover size-full"
                />
              )}
              {content?.media?.type === "video" && (
                <video autoPlay muted loop playsInline className="size-full object-cover block">
                  <source src={content?.media?.url} />
                </video>
              )}
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-4 lg:gap-10">
            {content?.list?.map((item, index) => (
              <h6 key={index} className="text-h6 grid grid-cols-[2.25rem_auto] gap-6 items-center">
                <RoundCheck className="size-9 text-energiesparwelt" /> {item?.text}
              </h6>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
