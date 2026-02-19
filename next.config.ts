import type { NextConfig } from 'next';
import fs from 'fs';
import path from 'path';

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
                hostname: 'shk-backend.pechschwarz.dev',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'backend.shk-deutschland.de',
                port: '',
            },
        ],
        deviceSizes: [576, 768, 992, 1200, 1440, 1920],
    },
    async redirects() {
        const filePath = path.join(process.cwd(), 'public', 'redirects.json');
        let jsonRedirects: { source: string; destination: string; permanent: boolean }[] = [];

        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const entries: RedirectEntry[] = JSON.parse(fileContent);
            jsonRedirects = entries.map((entry) => ({
                source: entry.old,
                destination: entry.new,
                permanent: true,
            }));
        } catch (error) {
            console.error('Fehler beim Laden der redirects.json:', error);
        }

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
            // Redirects aus redirects.json
            ...jsonRedirects,
        ];
    },
};

export default nextConfig;
