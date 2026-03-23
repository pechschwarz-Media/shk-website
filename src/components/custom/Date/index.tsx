'use client';

import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import useCalensoTracking from '@/lib/useCalensoTracking';
import { Settings } from '@/lib/types';
import IframeResizer from '@iframe-resizer/react';
import parse from 'html-react-parser';

type Content = {
    topline: string;
    headline: string;
    text: string;
    iframe: string;
    setting: Settings;
};

export default function Date({ content }: { content: Content }) {
    useCalensoTracking();

    return (
        <Section dataComponent="Date" settings={content?.setting}>
            <div className="mb-14 pt-20">
                <div className="container">
                    <div className="max-w-2xl">
                        <div className="mb-4 text-blue">{content?.topline}</div>
                        <h1 className="text-h2 font-headline leading-tight text-blue mb-4">{content?.headline}</h1>
                        <Text className="prose-p:text-gray">{parse(content?.text)}</Text>
                    </div>
                </div>
            </div>
            <div>
                <div className="container">
                    <div className="bg-white rounded-2xl p-8">
                        <IframeResizer license="1mjb12zhxy1-1ov9n7qh0ct-263od7bccj7" id="calenso-booking-widget1" className="w-full" src={content?.iframe ? content?.iframe : 'https://book.calenso.com/shk-deutschland'} />
                    </div>
                </div>
            </div>
        </Section>
    );
}
