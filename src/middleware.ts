import { NextResponse } from 'next/server';
import { auth } from './auth';

export const middleware = async (request: {
  nextUrl: { pathname: any };
  url: string | URL | undefined;
}) => {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (!session || !session.user) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
    if (session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }

  if (pathname.startsWith('/profile') && !session) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (pathname === '/signin' && session && session.user) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (pathname === '/register') {
    if (!session) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/signin', '/register'],
};
