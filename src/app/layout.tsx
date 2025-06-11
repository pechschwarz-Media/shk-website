import Footer from '@/components/layout/Footer';
import './globals.css';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';
import { draftMode } from 'next/headers';

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
            <body className={cn(hongkong.variable, panton.variable, 'text-base text-dark font-body pt-20')}>
                {children}
                {isEnabled && (
                    <div className="bg-blue fixed bottom-0 left-0 z-[100] text-small px-8 py-2 rounded-tr-lg text-white">
                        Du befindest dich im Draft-Mode!
                    </div>
                )}
            </body>
        </html>
    );
}
