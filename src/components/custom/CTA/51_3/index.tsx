import Section from "@/components/static/Section";
import { Settings } from "@/lib/types";

type Content = {
  headline: string;
  setting: Settings;
};

export default function CTA_51_3({ content }: { content: Content }) {
  return (
    <Section dataComponent="CTA_51_3" settings={content?.setting}>
      <div className="container">
        <h2 className="text-left lg:text-center text-h2">{content?.headline}</h2>
      </div>
    </Section>
  );
}
