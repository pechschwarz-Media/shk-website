import type { NextConfig } from 'next';

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
        ],
        deviceSizes: [576, 768, 992, 1200, 1400, 1920, 2500],
        imageSizes: [576, 768, 992, 1200, 1400, 1920, 2500],
    },
};

export default nextConfig;
