export default async function getPostId({ slug }: { slug: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}shk/v1/post?slug=${slug}`);
    const data: { ID: number } = await response.json();
    return data.ID;
}
