'use client';

import Section from '@/components/static/Section';
import { Settings } from '@/lib/types';
import IframeResizer from '@iframe-resizer/react';
import Script from 'next/script';

type Content = {
    headline: string;
    setting: Settings;
};

export default function CTA_51_3({ content }: { content: Content }) {
    return (
        <>
            <Section dataComponent="CTA_51_3" settings={content?.setting}>
                <div className="mb-14">
                    <div className="container">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-h2 font-headline leading-tight text-blue font-light">{content?.headline}</h2>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <IframeResizer
                            license="1mjb12zhxy1-1ov9n7qh0ct-263od7bccj7"
                            id="calenso-booking-widget1"
                            className="w-full"
                            src="https://smartwidget.calenso.com/?partner_uuid=0d6d25e4-aa2d-49e2-9a59-f42bab72afc9&widget_uuid=d7446074-507c-4806-abed-6ae5e5082925&refresh=1&store_zip=24941"
                        />
                    </div>
                </div>
            </Section>
        </>
    );
}
