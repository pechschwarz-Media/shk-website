import Section from "@/components/static/Section";
import getLogos from "@/lib/queries/logos/getLogos";
import { Settings } from "@/lib/types";
import Image from "next/image";

type Content = {
  logos: number[];
};

export default async function Posts_3({ content }: { content: Content }) {
  const logoIds = content?.logos;

  const logos = await getLogos(logoIds);

  return (
    <Section dataComponent="Posts_3">
      <div className="container">
        <div className="flex flex-row flex-wrap gap-4 justify-around ">
          {logos?.map((logo, index) => (
            <div className="h-[50px]" key={index}>
              <Image
                src={logo?.acf?.logo?.url ?? ""}
                alt={logo?.acf?.logo?.alt ?? ""}
                width={logo?.acf?.logo?.width ?? ""}
                height={logo?.acf?.logo?.height ?? ""}
                className="object-cover size-full"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
