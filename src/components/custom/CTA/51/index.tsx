import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { AcfLink, Settings } from '@/lib/types';
import parse from 'html-react-parser';
import Button from '@/components/static/Button';

type Content = {
    headline: string;
    subline: string;
    text: string;
    buttons: {
        button_1: AcfLink;
        button_2: AcfLink;
    };
    settings: Settings;
};

export default function CTA_51({ content }: { content: Content }) {
    return (
        <Section dataComponent="CTA_51" settings={content?.settings}>
            <div className="container">
                <div className="rounded-xl bg-blue text-white p-8 md:p-12">
                    <h2 className="text-h3 font-headline leading-tight mb-8">
                        {content?.headline}
                        <div className="text-h4 text-gray">{content?.subline}</div>
                    </h2>
                    <div className="max-w-md">
                        <Text>{parse(content?.text)}</Text>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-8">
                        <Button as="link" variant="whiteFilled" link={content?.buttons?.button_1}>
                            {content?.buttons?.button_1?.title}
                        </Button>
                        <Button as="link" variant="whiteOutline" link={content?.buttons?.button_2}>
                            {content?.buttons?.button_2?.title}
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    );
}
