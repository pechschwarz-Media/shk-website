import getPosts from '@/lib/queries/posts/getPosts';
import PostListInner from './inner';
import getPostCategories from '@/lib/queries/posts/getPostCategories';

export type Content = {
    headline: string;
    text: string;
};

export default async function PostList({ content }: { content: Content }) {
    const categories = await getPostCategories();
    const { data: featuredPost } = await getPosts({ limit: 1, page: 1, offset: 0 });
    const { data: posts } = await getPosts({ limit: 100, page: 1, offset: 1 });

    return <PostListInner featuredPost={featuredPost} posts={posts} categories={categories} content={content} />;
}
