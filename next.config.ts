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
                deviceSizes: [576, 768, 992, 1200, 1440, 1920],
        },
};

export default nextConfig;
