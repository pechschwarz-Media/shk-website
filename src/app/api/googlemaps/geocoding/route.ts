export async function POST(request: Request) {
    const { address } = await request.json();

    const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&components=country:DE&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        {
            method: 'GET',
        }
    );
    const data = await res.json();

    return Response.json(data);
}
