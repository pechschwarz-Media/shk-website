import { Options } from '@/lib/types';

export default async function getOptions() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}wp/v2/options/`);
    const data: Options = await response.json();
    return data;
}
