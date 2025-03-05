import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formData = await req.json();

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}gf/v2/forms/${formData?.form}/submissions`,
            {
                method: "POST",
                headers: {
                    Authorization: `Basic ${btoa(
                        `${process.env.API_PUBLIC}:${process.env.API_SECRET}`
                    )}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData.data),
            }
        );

        if (!response.ok) {
            throw "Error";
        }

        return NextResponse.json({ status: response.ok }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
