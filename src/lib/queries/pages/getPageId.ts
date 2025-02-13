export default async function getPageId({ uri }: { uri: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}shk/v1/page?url=${uri}`);
    const data: { ID: number } = await response.json();
    return data.ID;
}
