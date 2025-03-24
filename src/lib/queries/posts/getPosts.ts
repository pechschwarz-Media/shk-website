import { Post } from '@/lib/types';

export default async function getPosts({ limit, page, offset }: { limit: number; page: number; offset: number }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}wp/v2/posts?per_page=${limit}&page=${page}&offset=${offset}&order=desc&_fields=title,acf,excerpt,link,categories,date&acf_format=standard`
    );
    const data: Post[] = await response.json();

    return { data, total: parseInt(response.headers.get('x-wp-total') || '0') };
}
