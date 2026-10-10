// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//     matcher: '/((?!api|_next|_vercel|studio|.*\\..*).*)',
// };


import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { isSiteSuspended, SUSPENDED_HTML } from './lib/suspended';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isApi = pathname === '/api' || pathname.startsWith('/api/');

    if (isSiteSuspended()) {
        const headers = {
            'Retry-After': '86400',
            'X-Robots-Tag': 'noindex, nofollow',
            'Cache-Control': 'no-store',
        };

        if (isApi) {
            return NextResponse.json(
                { error: 'Service temporarily unavailable.' },
                { status: 503, headers }
            );
        }

        return new NextResponse(SUSPENDED_HTML, {
            status: 503,
            headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' },
        });
    }

    // API routes aren't localized, so they must not go through next-intl.
    if (isApi) {
        return NextResponse.next();
    }

    return intlMiddleware(request);
}

export const config = {
    // `api` is no longer excluded, so the suspend check can block /api/book
    // and /api/contact. Studio, Next internals and static files stay excluded.
    matcher: '/((?!_next|_vercel|studio|.*\\..*).*)',
};