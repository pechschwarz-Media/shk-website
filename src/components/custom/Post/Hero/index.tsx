import IconChevronLeft from '@/components/icons/IconChevronLeft';
import Section from '@/components/static/Section';
import { Post } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import dateFormat from 'dateformat';
import getPostCategories from '@/lib/queries/posts/getPostCategories';

type Content = {
    post: Post;
};

export default async function PostHero({ post }: Content) {
    const date = new Date(post.date);

    const categories = await getPostCategories();

    const currentCategories = categories.filter((category) => {
        return post.categories.includes(category.id);
    });

    return (
        <Section dataComponent="PostHero" settings={{ padding: { top: 'medium', bottom: 'medium' }, preventAnimation: true }}>
            <div className="pt-20">
                <div className="container">
                    <div className="space-y-12">
                        <Link href="/news/" className="flex items-center gap-2">
                            <IconChevronLeft className="size-4" />
                            Alle Beiträge
                        </Link>
                        <div>
                            <div className="flex items-center gap-6 mb-4">
                                {currentCategories?.map((category, index) => {
                                    return (
                                        <div className="bg-gray-medium h-8 rounded-full px-4 flex items-center text-blue" key={index}>
                                            {category?.name}
                                        </div>
                                    );
                                })}
                                <div>{post?.acf?.readingTime} Min. Lesezeit</div>
                            </div>
                            <h1 className="text-h2 font-headline leading-tight text-blue">{post?.title?.rendered}</h1>
                        </div>
                        <div>
                            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={post?.acf?.thumbnail?.url}
                                    alt={post?.acf?.thumbnail?.alt}
                                    width={post?.acf?.thumbnail?.width}
                                    height={post?.acf?.thumbnail?.height}
                                    className="size-full object-cover"
                                />
                            </div>
                            <div className="flex gap-6">
                                <div>
                                    <div>Datum</div>
                                    <div className="font-bold">{dateFormat(date, 'dd.mm.yyyy')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
