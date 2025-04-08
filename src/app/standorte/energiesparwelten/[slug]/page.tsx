import ComponentRenderer from '@/lib/ComponentRenderer';
import Header from '@/components/layout/Header';
import getLocationsSlugs from '@/lib/queries/locations/getLocationsSlugs';
import getLocationData from '@/lib/queries/locations/getLocationData';
import getLocationMeta from '@/lib/queries/locations/getLocationMeta';

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

    return (
        <main>
            <Header channel="energiesparwelten" />
            <ComponentRenderer content={location?.acf?.content} channel="energiesparwelten" locationData={location} />
        </main>
    );
}
