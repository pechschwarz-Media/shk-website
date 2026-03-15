import Button from '@/components/static/Button';
import Section from '@/components/static/Section';
import Text from '@/components/static/Text';
import { AcfLink, Media } from '@/lib/types';
import { cn } from '@/lib/utils';
import parse from 'html-react-parser';
import Image from 'next/image';

type Content = {
    media: Media;
    headline: string;
    text: string;
    buttons: {
        button_1: AcfLink;
        button_2: AcfLink;
    };
    small: boolean;
    opacity: string;
};

export default function Header_5({ content }: { content: Content }) {
    return (
        <Section dataComponent="Header_5" settings={{ padding: { top: 'off', bottom: 'off' }, preventAnimation: true }}>
            <div className="lg:-mt-20">
                <div className={cn('md:min-h-[80vh] sm:min-h-screen w-full max-md:pb-20 pt-20 relative flex items-center', content?.small && 'sm:min-h-[60vh]')}>
                    <div className="absolute inset-0 bg-black z-10 opacity-0" style={{ opacity: `${content.opacity}%` }}></div>
                    <div className="absolute size-full top-0 left-0">
                        {content?.media?.type === 'image' && <Image src={content?.media?.url} alt={content?.media?.alt} fill sizes="100vw" priority fetchPriority="high" className="object-cover" />}
                        {content?.media?.type === 'video' && (
                            <video autoPlay muted loop playsInline className="size-full object-cover block">
                                <source src={content?.media?.url} />
                            </video>
                        )}
                    </div>
                    <div className="relative text-white w-full z-20 py-24">
                        <div className="container">
                            <div className="max-w-xl">
                                <h1 className="text-h1 font-headline leading-tight font-light mb-8">{content?.headline}</h1>
                                <Text className="text-large prose-p:text-white">{parse(content?.text)}</Text>
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
            </div>
        </Section>
    );
}
