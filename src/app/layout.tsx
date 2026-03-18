import { cn } from '@/lib/utils';
import localFont from 'next/font/local';
import { draftMode } from 'next/headers';
import Script from 'next/script';
import './globals.css';

const hongkong = localFont({
    src: [
        {
            path: '../../public/fonts/hongkong-light.woff2',
            weight: '300',
        },
        {
            path: '../../public/fonts/hongkong-regular.woff2',
            weight: '400',
        },
    ],
    display: 'swap',
    variable: '--font-hongkong',
});

const panton = localFont({
    src: [
        {
            path: '../../public/fonts/panton-regular.woff2',
            weight: '400',
        },
        {
            path: '../../public/fonts/panton-bold.woff2',
            weight: '700',
        },
    ],
    display: 'swap',
    variable: '--font-panton',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const { isEnabled } = await draftMode();
    return (
        <html lang="de" className="scroll-smooth bg-background-gray">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('consent', 'default', {
                                ad_storage: 'denied',
                                analytics_storage: 'denied',
                                ad_user_data: 'denied',
                                ad_personalization: 'denied',
                                wait_for_update: 500
                            });
                            `,
                    }}
                />
                <Script
                    id="Cookiebot"
                    src="https://consent.cookiebot.com/uc.js"
                    data-cbid="6fa2209f-3255-469c-ac2d-25e094246554"
                    data-blockingmode="auto"
                    strategy="beforeInteractive"
                />
            </head>
            <body className={cn(hongkong.variable, panton.variable, 'text-base text-dark font-body pt-20')}>
                {children}
                <Script id="hubspot" strategy="afterInteractive" src="https://js-eu1.hs-scripts.com/144284637.js" />
                {isEnabled && (
                    <div className="bg-blue fixed bottom-0 left-0 z-[100] text-small px-8 py-2 rounded-tr-lg text-white">
                        Du befindest dich im Draft-Mode!
                    </div>
                )}
            </body>
        </html>
    );
}
