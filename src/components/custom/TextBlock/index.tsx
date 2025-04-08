import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { Media, Settings } from '@/lib/types';
import parse from 'html-react-parser';

type Content = {
    text: string;
    settings: Settings;
};

export default function TextBlock({ content }: { content: Content }) {
    return (
        <Section dataComponent="TextBlock" settings={content?.settings}>
            <div className="container">
                <div className="max-w-2xl mx-auto">
                    <Text className="prose-p:text-gray text-large">{parse(content?.text)}</Text>
                </div>
            </div>
        </Section>
    );
}
