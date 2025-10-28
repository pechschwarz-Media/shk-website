import Channel from '@/components/custom/Channel';
import getHomepage from '@/lib/queries/homepage/getHomepage';
import getHomepageMeta from '@/lib/queries/homepage/getHomepageMeta';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ uri: string[] }> }) {
    const uri = (await params).uri ? `/${(await params).uri.join('/')}/` : '/';

    const metadata = await getHomepageMeta();
    return {
        title: metadata.title,
        description: metadata.description || '',
        robots: {
            index: metadata.robots.index,
            follow: metadata.robots.follow,
        },
    };
}

export default async function Page() {
    const page = await getHomepage();

    return <Channel channels={page?.acf} />;
}
