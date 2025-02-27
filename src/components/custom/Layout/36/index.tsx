import Section from '@/components/static/Section';
import { AcfLink, Media, Settings } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

type Content = {
    text: string;
    settings: Settings;
};

export default function Layout_36({ content }: { content: Content }) {
    return <Section dataComponent="Layout_396" settings={content?.settings}></Section>;
}
