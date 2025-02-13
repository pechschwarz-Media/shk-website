import Channel from '@/components/custom/Channel';
import getHomepage from '@/lib/queries/homepage/getHomepage';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function Page() {
    const page = await getHomepage();

    return <Channel channels={page?.acf} />;
}
