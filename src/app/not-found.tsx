export function generateMetadata() {
    return {
        title: '404: Seite nicht gefunden',
        description: 'Die Seite wurde nicht gefunden',
    };
}

export default async function NotFound() {
    return <>404: Seite nicht gefunden</>;
}
