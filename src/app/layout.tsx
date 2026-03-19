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
                <Script data-cookieconsent="ignore" id="cookie-consent-script">{`
                        window.dataLayer = window.dataLayer || [];
                        function gtag() {
                            dataLayer.push(arguments);
                        }
                        gtag("consent", "default", {
                            ad_personalization: "denied",
                            ad_storage: "denied",
                            ad_user_data: "denied",
                            analytics_storage: "denied",
                            functionality_storage: "denied",
                            personalization_storage: "denied",
                            security_storage: "granted",
                            wait_for_update: 500,
                        });
                        gtag("set", "ads_data_redaction", true);
                        gtag("set", "url_passthrough", true);
                    `}</Script>
                <Script
                    id="Cookiebot"
                    src="https://consent.cookiebot.com/uc.js"
                    data-cbid="6fa2209f-3255-469c-ac2d-25e094246554"
                    data-blockingmode="auto"
                    type="text/javascript"
                    strategy="beforeInteractive"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MTCT9SRG');`,
                    }}
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
