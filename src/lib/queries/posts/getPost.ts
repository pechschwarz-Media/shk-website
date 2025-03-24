import { Post } from '@/lib/types';

export default async function getPost({ id }: { id: number }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}wp/v2/posts/${id}?_fields=title,acf,excerpt,link,categories,date&acf_format=standard`
    );
    const data: Post = await response.json();

    return data;
}
