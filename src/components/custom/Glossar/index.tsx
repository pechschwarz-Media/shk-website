import getGlossar from '@/lib/queries/glossar/getGlossar';
import { Settings } from '@/lib/types';
import GlossarInner from './inner';

type Content = {
    headline: string;
    text: string;
    settings: Settings;
};

export default async function Glossar({ content }: { content: Content }) {
    const glossar = await getGlossar();

    return <GlossarInner content={content} glossar={glossar} />;
}
