export async function POST(request: Request) {
    const { address } = await request.json();

    const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&components=country:DE&key=${
            process.env.GOOGLE_MAPS_SERVER_API_KEY
        }`,
        {
            method: 'GET',
        }
    );
    const data = await res.json();

    console.log(data);

    return Response.json(data);
}
