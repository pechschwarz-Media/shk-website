import Marker from '@/components/static/Marker/Marker';
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
            </head>
            <body className={cn(hongkong.variable, panton.variable, 'text-base text-dark font-body pt-20')}>
                <Script src="https://cloud.ccm19.de/app.js?apiKey=1fa07ed09355d056614058f87d142228edbba2d785876b9f&amp;domain=6978af6f882a491ec4012962" strategy="beforeInteractive" referrerPolicy="origin" />
                {children}
                <Marker />
                <Script id="hubspot" strategy="afterInteractive" src="https://js-eu1.hs-scripts.com/144284637.js" />
                {isEnabled && <div className="bg-blue fixed bottom-0 left-0 z-[100] text-small px-8 py-2 rounded-tr-lg text-white">Du befindest dich im Draft-Mode!</div>}
            </body>
        </html>
    );
}
