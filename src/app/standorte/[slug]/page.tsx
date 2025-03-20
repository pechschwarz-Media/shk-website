import ComponentRenderer from '@/lib/ComponentRenderer';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import getLocationsSlugs from '@/lib/queries/locations/getLocationsSlugs';
import getLocationData from '@/lib/queries/locations/getLocationData';
import getLocationMeta from '@/lib/queries/locations/getLocationMeta';
import { cookies } from 'next/headers';
import CTA_51_2 from '@/components/custom/CTA/51_2';
import { LocationData } from '@/lib/types';

export async function generateStaticParams() {
    const pages = await getLocationsSlugs();

    const params = pages
        .filter((p) => p.slug.at(0))
        .map((page) => {
            return {
                slug: page.slug,
            };
        });

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    const location = await getLocationData({ slug });

    if (location) {
        const metadata = await getLocationMeta({ slug });
        return {
            title: metadata.title,
            description: metadata.description || '',
            robots: {
                index: metadata.robots.index,
                follow: metadata.robots.follow,
            },
        };
    }
}

export default async function Location({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    const location = await getLocationData({ slug });

    const cookieStore = await cookies();
    const cookie = cookieStore.get('channel');
    const channel = cookie?.value || 'customer';

    return (
        <main className={cn(channel === 'partner' && 'bg-partner-bg')}>
            <Header channel={channel || 'customer'} />
            {channel === 'customer' ? (
                <ComponentRenderer content={location?.acf?.content} channel="customer" locationData={location} />
            ) : (
                <CTA_51_2 content={{ settings: { padding: { top: 'medium', bottom: 'medium' } } }} channel="partner" locationData={location as any} />
            )}
        </main>
    );
}
