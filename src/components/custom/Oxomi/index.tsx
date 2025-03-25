//@ts-nocheck

'use client';

import Section from '@/components/static/Section';
import { Settings } from '@/lib/types';
import Script from 'next/script';
import { useEffect } from 'react';

type Content = {
    headline: string;
    settings: Settings;
};

export default function Oxomi({ content }: { content: Content }) {
    useEffect(() => {
        setTimeout(function () {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src =
                (window.location.protocol == 'https:' ? 'https:' : 'http:') +
                '//' +
                (typeof oxomi_server == 'undefined' ? 'oxomi.com' : oxomi_server) +
                '/assets/frontend/oxomi.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        }, 0);
    }, []);

    return (
        <Section dataComponent="Oxomi" settings={content?.settings}>
            <Script id="oxomi-ready" strategy="afterInteractive">
                {`
                    function oxomi_ready() {
                        oxomi.init({ portal: '3000576' });

                        oxomi.portalSearch({
                        target: '#universal-search-output',
                        input: '#universal-search-input',
                        showDetails: true,
                        responsiveFilterBox: '#universal-search-filter',
                        topBrands: true,
                        });
                    }

                    if (typeof oxomi !== 'undefined') {
                        oxomi_ready();
                    } else {
                        window.addEventListener('oxomi-ready', oxomi_ready);
                    }
                `}
            </Script>
            <div className="pt-[80px] mb-14">
                <div className="container">
                    <h1 className="text-h1 leading-tight font-headline font-light">{content?.headline}</h1>
                </div>
            </div>
            <div>
                <div className="container">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-4">
                            <div id="universal-search-filter"></div>
                        </div>
                        <div className="col-span-8">
                            <div id="universal-search-input"></div>
                            <div id="universal-search-output">Im Moment gibts noch nichts zu sehen...</div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
