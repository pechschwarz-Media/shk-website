import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const request = await req.json();

    try {
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${request.token}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw 'Error';
        }

        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
