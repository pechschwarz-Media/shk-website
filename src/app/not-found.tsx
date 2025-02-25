import Error from '@/components/custom/Error';
import Header from '@/components/layout/Header';

export function generateMetadata() {
    return {
        title: '404: Seite nicht gefunden',
        description: 'Die Seite wurde nicht gefunden',
    };
}

export default async function NotFound() {
    return (
        <>
            <Header channel="customer" />
            <Error />
        </>
    );
}
