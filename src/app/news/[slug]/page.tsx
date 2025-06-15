import { notFound } from 'next/navigation';
import getPostsSlugs from '@/lib/queries/posts/getPostsSlugs';
import getPostMeta from '@/lib/queries/posts/getPostMeta';
import getPost from '@/lib/queries/posts/getPost';
import getPostId from '@/lib/queries/posts/getPostId';
import PostHero from '@/components/custom/Post/Hero';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import PostContent from '@/components/custom/Post/Content';
import Footer from '@/components/layout/Footer';
import getBreadcrumb from '@/lib/queries/breadcrumb/getBreadcrumb';
import { Breadcrumb } from '@/components/static/Breadcrumb/Breadcrumb';

export const dynamic = 'force-static';
export const revalidate = 3600;

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
    const breadcrumb = await getBreadcrumb({ id });

    return (
        <main className={cn('bg-customer-bg')}>
            <Breadcrumb breadcrumb={breadcrumb} />
            <Header channel="customer" />
            <PostHero post={post} slug={slug} />
            <PostContent post={post} />
            <Footer channel="customer" />
        </main>
    );
}
