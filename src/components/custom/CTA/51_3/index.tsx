'use client';

import Section from '@/components/static/Section';
import useCalensoTracking from '@/lib/useCalensoTracking';
import { Location, Settings } from '@/lib/types';
import IframeResizer from '@iframe-resizer/react';

export type Content = {
    headline: string;
    service: string;
    setting: Settings;
};

export default function CTA_51_3({ content, locationData }: { content: Content; locationData: Location }) {
    useCalensoTracking();

    return (
        <>
            <Section dataComponent="CTA_51_3" id="termin" settings={content?.setting}>
                <div className="mb-14">
                    <div className="container">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-h2 font-headline leading-tight text-blue">{content?.headline}</h2>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <IframeResizer
                            license="1mjb12zhxy1-1ov9n7qh0ct-263od7bccj7"
                            id="calenso-booking-widget1"
                            className="w-full"
                            src={`https://widget.calenso.com/?partner=shk-deutschland&type=appointment&isFrame=true&lang=de_CH&store_zip=${locationData?.acf?.zip}&category[]=${content?.service}`}
                        />
                    </div>
                </div>
            </Section>
        </>
    );
}
