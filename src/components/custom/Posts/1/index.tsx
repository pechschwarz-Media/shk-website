import Section from "@/components/static/Section";
import Text from "@/components/static/Text";
import { Settings } from "@/lib/types";
import parse from "html-react-parser";

type Content = {
  text: string;
  settings: Settings;
};

export default function Posts_1({ content }: { content: Content }) {
  return (
    <Section dataComponent="Posts_1" settings={content?.settings}>
      <div className="container">
        <Text>{parse(content.text)}</Text>
      </div>
    </Section>
  );
}
