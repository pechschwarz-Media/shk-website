import { Form } from '@/lib/types';

export default async function getForm({ id }: { id: number }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}gf/v2/forms/${id}`, {
        headers: {
            Authorization: `Basic ${btoa(`${process.env.API_PUBLIC}:${process.env.API_SECRET}`)}`,
            'Content-Type': 'application/json',
        },
    });
    const data: Form = await response.json();
    return data;
}
