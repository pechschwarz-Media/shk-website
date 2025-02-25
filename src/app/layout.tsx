import Footer from '@/components/layout/Footer';
import './globals.css';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de" className="scroll-smooth">
            <body className={cn(hongkong.variable, panton.variable, 'text-base text-dark font-body')}>
                {children}
                <Footer />
            </body>
        </html>
    );
}
