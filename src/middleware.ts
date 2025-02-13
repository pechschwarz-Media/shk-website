import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const channel = cookieStore.get('channel');

    if (channel?.value === 'customer') {
        return NextResponse.redirect(new URL('/kunden', request.url));
    }

    if (channel?.value === 'partner') {
        return NextResponse.redirect(new URL('/partner', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/',
};
