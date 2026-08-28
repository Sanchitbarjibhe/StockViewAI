import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Admin margaansathi (routes) suraksha tapasani
    if (pathname.startsWith('/admin')) {
        // Token naslyas kinva token madhye 'ADMIN' role naslyas,
        // tyanna mukhya page var (home page) redirect kara.
        if (!token || token.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    const isPublicRoute = pathname === '/' || pathname.startsWith('/login');

    // Jar token ahe (user logged in ahe) aani to public route (login page) var janyacha prayatna kartoy,
    // tar tyala dashboard var redirect kara.
    if (token && isPublicRoute) {
        // return NextResponse.redirect(new URL('/DashboardLayout', req.url));
    }

    // Jar token nahiye (user logged in nahiye) aani to protected route access kartoy,
    // tar tyala login page var redirect kara.
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Anyatha, request पुढे जाऊ dya.
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt
         * - Any image extension (.png, .jpg, .jpeg, .gif, .svg)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
