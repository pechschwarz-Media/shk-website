import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { AcfLink, Media } from '@/lib/types';
import Image from 'next/image';
import parse from 'html-react-parser';
import Button from '@/components/static/Button';

type Content = {
    media: Media;
    headline: string;
    text: string;
    buttons: {
        button_1: AcfLink;
        button_2: AcfLink;
    };
    opacity: string;
};

export default function Header_5({ content }: { content: Content }) {
    return (
        <Section dataComponent="Header_5" settings={{ padding: { top: 'off', bottom: 'off' }, preventAnimation: true }}>
            <div className="h-[70vh] sm:h-screen w-full relative flex items-center">
                <div className="absolute inset-0 bg-black z-10 opacity-0" style={{ opacity: `${content.opacity}%` }}></div>
                <div className="absolute size-full top-0 left-0">
                    {content?.media?.type === 'image' && <Image src={content?.media?.url} alt={content?.media?.alt} fill className="object-cover" />}
                    {content?.media?.type === 'video' && (
                        <video autoPlay muted loop playsInline className="size-full object-cover block">
                            <source src={content?.media?.url} />
                        </video>
                    )}
                </div>
                <div className="relative text-white w-full z-20">
                    <div className="container">
                        <div className="max-w-xl">
                            <h1 className="text-h1 font-headline leading-tight font-light mb-8">{content?.headline}</h1>
                            <Text className="text-large">{parse(content?.text)}</Text>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-8">
                                <Button as="link" variant="blueFilled" link={content?.buttons?.button_1}>
                                    {content?.buttons?.button_1?.title}
                                </Button>
                                {content?.buttons?.button_2 && (
                                    <Button as="link" variant="whiteOutline" link={content?.buttons?.button_2}>
                                        {content?.buttons?.button_2?.title}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
