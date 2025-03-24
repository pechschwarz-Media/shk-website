import { PostsSlugs } from '@/lib/types';

export default async function getPostsSlugs() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/posts?_fields=slug`);
    const data: PostsSlugs[] = await response.json();
    return data;
}
