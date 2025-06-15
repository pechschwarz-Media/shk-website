import { notFound } from 'next/navigation';
import getPagesUris from '@/lib/queries/pages/getPagesUris';
import getPageId from '@/lib/queries/pages/getPageId';
import getPageMeta from '@/lib/queries/pages/getPageMeta';
import ComponentRenderer from '@/lib/ComponentRenderer';
import getPage from '@/lib/queries/pages/getPage';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import Legal from '@/components/custom/Legal';
import Footer from '@/components/layout/Footer';
import getBreadcrumb from '@/lib/queries/breadcrumb/getBreadcrumb';
import { Breadcrumb } from '@/components/static/Breadcrumb/Breadcrumb';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateStaticParams() {
    const pages = await getPagesUris();

    const params = pages
        .filter((p) => p.uri.at(0))
        .map((page) => {
            return {
                uri: page.uri,
            };
        });

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ uri: string[] }> }) {
    const uri = (await params).uri ? `/${(await params).uri.join('/')}/` : '/';

    const id = await getPageId({ uri });

    if (id) {
        const metadata = await getPageMeta({ id });
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

export default async function Page({ params }: { params: Promise<{ uri: string[] }> }) {
    const uri = (await params).uri ? `/${(await params).uri.join('/')}/` : '/';

    const id = await getPageId({ uri });

    if (!id) {
        return notFound();
    }

    const page = await getPage({ id });
    const breadcrumb = await getBreadcrumb({ id });

    switch (page?.template) {
        case 'page-legal.php':
            return (
                <main className={cn(page?.acf?.channel === 'customer' && 'bg-customer-bg', page?.acf?.channel === 'partner' && 'bg-partner-bg')}>
                    <Breadcrumb breadcrumb={breadcrumb} />
                    <Header channel={page?.acf?.channel} />
                    <Legal text={page?.acf?.text || ''} />
                    <Footer channel={page?.acf?.channel} />
                </main>
            );
        default:
            return (
                <main className={cn(page?.acf?.channel === 'customer' && 'bg-customer-bg', page?.acf?.channel === 'partner' && 'bg-partner-bg')}>
                    <Breadcrumb breadcrumb={breadcrumb} />
                    <Header channel={page?.acf?.channel} link={page?.link} />
                    <ComponentRenderer content={page?.acf?.content} channel={page?.acf?.channel} />
                    <Footer channel={page?.acf?.channel} />
                </main>
            );
    }
}
