import { PostMeta } from '@/lib/types';

export default async function getPostMeta({ id }: { id: number }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/posts/${id}?_fields=yoast_head_json`);
    const data: PostMeta = await response.json();
    return data.yoast_head_json;
}
