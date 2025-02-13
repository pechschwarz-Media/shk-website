import { notFound } from 'next/navigation';
import getPagesUris from '@/lib/queries/pages/getPagesUris';
import getPageId from '@/lib/queries/pages/getPageId';
import getPageMeta from '@/lib/queries/pages/getPageMeta';
import ComponentRenderer from '@/lib/ComponentRenderer';
import getPage from '@/lib/queries/pages/getPage';

export async function generateStaticParams() {
    const pages = await getPagesUris();

    const params = pages.map((page) => {
        return {
            uri: page.uri,
        };
    });

    console.log(params);

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

    switch (page?.template) {
        case 'page-legal.php':
            return <>Hier folgt das Legal-Template!</>;
        case 'page-blog.php':
            return <>Hier folgt das Blog-Template!</>;
        default:
            return (
                <>
                    <ComponentRenderer content={page?.acf?.content} />
                </>
            );
    }
}
