import { Category } from '@/lib/types';

export default async function getPostCategories() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/categories?_fields=name,slug,id`);
    const data: Category[] = await response.json();

    return data;
}
