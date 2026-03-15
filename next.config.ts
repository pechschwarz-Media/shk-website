import type { NextConfig } from 'next';

interface RedirectEntry {
    old: string;
    new: string;
}

const nextConfig: NextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'backend.shk-deutschland.de',
                port: '',
            },
        ],
        deviceSizes: [576, 768, 992, 1200, 1440, 1920],
    },
    experimental: {
        inlineCss: true,
        cssChunking: true,
    },
    async redirects() {
        return [
            {
                source: '/ausstellungen/',
                destination: '/kunden/ausstellungen/',
                permanent: true,
            },
            {
                source: '/calenso-intern/',
                destination: '/',
                permanent: true,
            },
            {
                source: '/lksg/',
                destination: '/',
                permanent: true,
            },
            {
                source: '/links/',
                destination: '/',
                permanent: true,
            },
            {
                source: '/stanley-cup-messe-gewinnspiel/',
                destination: '/',
                permanent: true,
            },
            {
                source: '/concept-entwaesserung/',
                destination: '/',
                permanent: true,
            },
            {
                source: '/standortuebersicht/',
                destination: '/kunden/ausstellungen/',
                permanent: true,
            },
            {
                source: '/concept-heizungswasseraufbereitung/',
                destination: '/',
                permanent: true,
            },
            {
                source: '/author/mkeilpaulsen-online-de/',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
