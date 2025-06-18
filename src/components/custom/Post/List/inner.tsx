'use client';

import Section from '@/components/static/Section';
import { Content } from '.';
import Text from '@/components/static/Text';
import parse from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';
import { Category, Post } from '@/lib/types';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import IconChevronRight from '@/components/icons/IconChevronRight';
import Button from '@/components/static/Button';
import useSWR from 'swr';

export default function PostListInner({
    content,
    featuredPost,
    posts,
    categories,
}: {
    content: Content;
    featuredPost: Post[];
    posts: Post[];
    categories: Category[];
}) {
    const [currentCategory, setCurrentCategory] = useState<'*' | number>('*');
    const [currentPosts, setCurrentPosts] = useState(posts);
    const [init, setInit] = useState(false);

    const { data, error, isLoading } = useSWR<Post[]>(
        init
            ? `wp/v2/posts?per_page=100&page=1&offset=${
                  currentCategory === '*' ? 1 : 0
              }&order=desc&_fields=title,acf,excerpt,link,categories,date&acf_format=standard${
                  currentCategory !== '*' ? `&categories=${currentCategory}` : ''
              }`
            : null,
        async (url: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, { cache: 'no-store' });
            const data = await response.json();
            return data;
        }
    );

    useEffect(() => {
        if (init) {
            setCurrentPosts([]);
        }
    }, [currentCategory]);

    useEffect(() => {
        if (data) {
            setCurrentPosts((prev) => [...prev, ...data]);
        }
    }, [data]);

    return (
        <Section dataComponent="PostList" settings={{ padding: { top: 'medium', bottom: 'medium' }, preventAnimation: true }}>
            <div className="pt-20 pb-16 md:pb-20 lg:pb-28">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-h1 leading-tight font-light font-headline text-blue mb-8">{content?.headline}</h1>
                        <Text className="text-gray prose-p:text-large">{parse(content?.text)}</Text>
                    </div>
                </div>
            </div>
            <div className="mb-20">
                <div className="container">
                    <Link href={featuredPost?.at(0)?.link || '#'} className="grid md:grid-cols-2 items-center gap-y-6 gap-x-12">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden">
                            <Image
                                src={featuredPost?.at(0)?.acf?.thumbnail?.url || ''}
                                alt={featuredPost?.at(0)?.acf?.thumbnail?.alt || ''}
                                width={featuredPost?.at(0)?.acf?.thumbnail?.width}
                                height={featuredPost?.at(0)?.acf?.thumbnail?.height}
                                className="object-cover size-full"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-6 mb-4 text-small">
                                {categories
                                    .filter((category, index) => {
                                        return featuredPost?.at(0)?.categories.includes(category.id);
                                    })
                                    .map((category, index) => {
                                        return (
                                            <div className="bg-gray-medium h-8 rounded-full px-4 flex items-center text-blue" key={index}>
                                                {category?.name}
                                            </div>
                                        );
                                    })}
                                <div>{featuredPost?.at(0)?.acf?.readingTime} Min. Lesezeit</div>
                            </div>
                            <div className="text-h5 text-blue leading-tight font-headline">{featuredPost?.at(0)?.title?.rendered}</div>
                            {featuredPost?.at(0)?.excerpt?.rendered && (
                                <div className="text-gray mt-8">{parse(featuredPost?.at(0)?.excerpt?.rendered || '')}</div>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
            <div className="mb-14">
                <div className="container">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 text-small">
                        <button
                            className={cn(
                                'bg-gray-medium h-8 rounded-full px-4 flex items-center text-blue',
                                currentCategory === '*' && 'bg-blue text-white'
                            )}
                            onClick={() => {
                                setInit(true);
                                setCurrentCategory('*');
                            }}
                        >
                            Alle Kategorien
                        </button>
                        {categories.map((category, index) => {
                            return (
                                <button
                                    className={cn(
                                        'bg-gray-medium h-8 rounded-full px-4 flex items-center text-blue hover:bg-blue hover:text-white transition-all',
                                        currentCategory === category.id && 'bg-blue text-white'
                                    )}
                                    onClick={() => {
                                        setInit(true);
                                        setCurrentCategory(category.id);
                                    }}
                                    key={index}
                                >
                                    {category?.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="mb-14">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-12">
                        {currentPosts?.map((post, index) => {
                            return (
                                <Link href={post?.link || '#'} key={index}>
                                    <div className="aspect-[16/9] rounded-xl overflow-hidden relative mb-8">
                                        <Image
                                            src={post?.acf?.thumbnail?.url || ''}
                                            alt={post?.acf?.thumbnail?.alt || ''}
                                            width={post?.acf?.thumbnail?.width}
                                            height={post?.acf?.thumbnail?.height}
                                            className="object-cover size-full"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-6 mb-4 text-small">
                                            {categories
                                                .filter((category, index) => {
                                                    return post?.categories?.includes(category.id);
                                                })
                                                .map((category, index) => {
                                                    return (
                                                        <div className="bg-gray-medium h-8 rounded-full px-4 flex items-center text-blue" key={index}>
                                                            {category?.name}
                                                        </div>
                                                    );
                                                })}
                                            <div>{post?.acf?.readingTime} Min. Lesezeit</div>
                                        </div>
                                        <div className="text-h5 text-blue leading-tight font-headline">{post?.title?.rendered}</div>
                                        {post?.excerpt?.rendered && <div className="text-gray mt-2">{parse(post?.excerpt?.rendered || '')}</div>}
                                        <button className="mt-4 text-blue flex items-center gap-2">
                                            Beitrag ansehen
                                            <IconChevronRight className="size-4" />
                                        </button>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Section>
    );
}
