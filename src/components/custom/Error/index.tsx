import Button from '@/components/static/Button';
import Section from '@/components/static/Section';

export default function Error() {
    return (
        <Section dataComponent="Error" settings={{ padding: { top: 'medium', bottom: 'medium' }, preventAnimation: true }}>
            <div className="mt-[72px] min-h-[40vh] flex items-center">
                <div className="container">
                    <h1 className="text-h2 leading-tight font-headline text-blue mb-8">404: Seite nicht gefunden</h1>
                    <p>Die aufgerufene Seite konnte nicht gefunden werden.</p>
                    <Button as="link" variant="blueFilled" link={{ url: '/', title: 'Zur Startseite', target: '_self' }} className="mt-8">
                        Zur Startseite
                    </Button>
                </div>
            </div>
        </Section>
    );
}
