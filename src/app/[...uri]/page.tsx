import { notFound } from 'next/navigation';
import getPagesUris from '@/lib/queries/pages/getPagesUris';
import getPageId from '@/lib/queries/pages/getPageId';
import getPageMeta from '@/lib/queries/pages/getPageMeta';
import ComponentRenderer from '@/lib/ComponentRenderer';
import getPage from '@/lib/queries/pages/getPage';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import Legal from '@/components/custom/Legal';

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

    console.log(page);

    switch (page?.template) {
        case 'page-legal.php':
            return (
                <main className={cn(page?.acf?.channel === 'customer' && 'bg-customer-bg', page?.acf?.channel === 'partner' && 'bg-partner-bg')}>
                    <Header channel={page?.acf?.channel} />
                    <Legal text={page?.acf?.text || ''} />
                </main>
            );
        default:
            return (
                <main className={cn(page?.acf?.channel === 'customer' && 'bg-customer-bg', page?.acf?.channel === 'partner' && 'bg-partner-bg')}>
                    <Header channel={page?.acf?.channel} />
                    <ComponentRenderer content={page?.acf?.content} />
                </main>
            );
    }
}
