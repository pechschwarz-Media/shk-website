import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import parse from 'html-react-parser';

export default function Legal({ text }: { text: string }) {
    return (
        <Section dataComponent="Legal" settings={{ padding: { top: 'medium', bottom: 'medium' }, preventAnimation: true }}>
            <div className="container pt-20">
                <div className="max-w-4xl mx-center overflow-hidden hyphens-auto">
                    <Text>{parse(text)}</Text>
                </div>
            </div>
        </Section>
    );
}
