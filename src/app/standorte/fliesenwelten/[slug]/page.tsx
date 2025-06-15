import ComponentRenderer from '@/lib/ComponentRenderer';
import Header from '@/components/layout/Header';
import getLocationsSlugs from '@/lib/queries/locations/getLocationsSlugs';
import getLocationData from '@/lib/queries/locations/getLocationData';
import getLocationMeta from '@/lib/queries/locations/getLocationMeta';
import Footer from '@/components/layout/Footer';
import getBreadcrumb from '@/lib/queries/breadcrumb/getBreadcrumb';

export const dynamic = 'force-static';
export const revalidate = 3600;

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
    const breadcrumb = await getBreadcrumb({ id: location.id });

    return (
        <main>
            <Header channel="fliesenwelten" />
            <ComponentRenderer content={location?.acf?.content} channel="fliesenwelten" locationData={location} />
            <Footer channel="fliesenwelten" />
        </main>
    );
}
