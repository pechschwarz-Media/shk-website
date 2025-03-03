import Button from "@/components/static/Button";
import Section from "@/components/static/Section";

type Content = {
  headline: string;
};

export default function Posts_8({ content }: { content: Content }) {
  return (
    <Section dataComponent="Posts_8">
      <div className="container">
        <h2 className="text-left lg:text-center text-h2">{content?.headline}</h2>
      </div>
    </Section>
  );
}
