import { notFound } from 'next/navigation';
import getPostsSlugs from '@/lib/queries/posts/getPostsSlugs';
import getPostMeta from '@/lib/queries/posts/getPostMeta';
import getPost from '@/lib/queries/posts/getPost';
import getPostId from '@/lib/queries/posts/getPostId';
import PostHero from '@/components/custom/Post/Hero';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import PostContent from '@/components/custom/Post/Content';

export async function generateStaticParams() {
    const posts = await getPostsSlugs();

    const params = posts.map((post) => {
        return {
            slug: post.slug,
        };
    });

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    const id = await getPostId({ slug });

    if (id) {
        const metadata = await getPostMeta({ id });
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;

    const id = await getPostId({ slug });

    if (!id) {
        return notFound();
    }

    const post = await getPost({ id });

    return (
        <main className={cn('bg-customer-bg')}>
            <Header channel="customer" />
            <PostHero post={post} />
            <PostContent post={post} />
        </main>
    );
}
