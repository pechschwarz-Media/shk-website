import { Breadcrumb, Glossar } from '@/lib/types';

export default async function getBreadcrumb({ id }: { id: number }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}shk/v1/breadcrumb?id=${id}`);
    const data: Breadcrumb = await response.json();
    return data;
}
