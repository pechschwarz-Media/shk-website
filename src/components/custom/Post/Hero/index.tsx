import IconChevronLeft from '@/components/icons/IconChevronLeft';
import Section from '@/components/static/Section';
import { Post } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import dateFormat from 'dateformat';
import getPostCategories from '@/lib/queries/posts/getPostCategories';

type Content = {
    post: Post;
    slug: string;
};

export default async function PostHero({ post, slug }: Content) {
    const date = new Date(post.date);

    const categories = await getPostCategories();

    const currentCategories = categories.filter((category) => {
        return post.categories.includes(category.id);
    });

    const url = `https://shk-deutschland.de/news/${slug}`;

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
                            <div className="flex gap-6 justify-between items-start">
                                <div>
                                    <div>Datum</div>
                                    <div className="font-bold">{dateFormat(date, 'dd.mm.yyyy')}</div>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`https://x.com/share?url=${url}&text=${post.title.rendered}`}
                                        className="size-8 rounded-full bg-gray-medium flex items-center justify-center"
                                        target="_blank"
                                    >
                                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M14.1761 0.242188H16.9362L10.9061 7.01959L18 16.2422H12.4456L8.0951 10.6488L3.11723 16.2422H0.35544L6.80517 8.99299L0 0.242188H5.69545L9.6279 5.35481L14.1761 0.242188ZM13.2073 14.6176H14.7368L4.86441 1.78147H3.2232L13.2073 14.6176Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </Link>
                                    <Link
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                                        className="size-8 rounded-full bg-gray-medium flex items-center justify-center"
                                        target="_blank"
                                    >
                                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20 10.3033C20 4.7467 15.5229 0.242188 10 0.242188C4.47715 0.242188 0 4.7467 0 10.3033C0 15.325 3.65684 19.4874 8.4375 20.2422V13.2116H5.89844V10.3033H8.4375V8.08671C8.4375 5.56515 9.9305 4.17231 12.2146 4.17231C13.3088 4.17231 14.4531 4.36882 14.4531 4.36882V6.8448H13.1922C11.95 6.8448 11.5625 7.62041 11.5625 8.41609V10.3033H14.3359L13.8926 13.2116H11.5625V20.2422C16.3432 19.4874 20 15.3252 20 10.3033Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </Link>
                                    <Link
                                        href={`https://www.linkedin.com/shareArticle?url=${url}&title=${post.title.rendered}`}
                                        className="size-8 rounded-full bg-gray-medium flex items-center justify-center"
                                        target="_blank"
                                    >
                                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M1.5 0.242188C0.67157 0.242188 0 0.913758 0 1.74219V16.7422C0 17.5706 0.67157 18.2422 1.5 18.2422H16.5C17.3284 18.2422 18 17.5706 18 16.7422V1.74219C18 0.913758 17.3284 0.242188 16.5 0.242188H1.5ZM5.52076 4.24491C5.52639 5.20116 4.81061 5.79038 3.96123 5.78616C3.16107 5.78194 2.46357 5.14491 2.46779 4.24632C2.47201 3.40116 3.13998 2.72194 4.00764 2.74163C4.88795 2.76132 5.52639 3.40679 5.52076 4.24491ZM9.2797 7.00395H6.75971H6.7583V15.5638H9.4217V15.3641C9.4217 14.9842 9.4214 14.6042 9.4211 14.2241C9.4203 13.2103 9.4194 12.1954 9.4246 11.1819C9.426 10.9358 9.4372 10.6799 9.5005 10.445C9.7381 9.56749 10.5271 9.00079 11.4074 9.14009C11.9727 9.22859 12.3467 9.55629 12.5042 10.0893C12.6013 10.4225 12.6449 10.7811 12.6491 11.1285C12.6605 12.1761 12.6589 13.2237 12.6573 14.2714C12.6567 14.6412 12.6561 15.0112 12.6561 15.381V15.5624H15.328V15.3571C15.328 14.9051 15.3278 14.4532 15.3275 14.0013C15.327 12.8718 15.3264 11.7423 15.3294 10.6124C15.3308 10.1019 15.276 9.59849 15.1508 9.10489C14.9638 8.37079 14.5771 7.76329 13.9485 7.32459C13.5027 7.01238 13.0133 6.81129 12.4663 6.78879C12.404 6.7862 12.3412 6.78281 12.2781 6.7794C11.9984 6.76428 11.7141 6.74892 11.4467 6.80285C10.6817 6.95613 10.0096 7.30629 9.5019 7.92359C9.4429 7.99439 9.3852 8.06629 9.2991 8.17359L9.2797 8.19789V7.00395ZM2.68164 15.5666H5.33242V7.00952H2.68164V15.5666Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
