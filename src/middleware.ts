import { NextResponse, NextRequest } from 'next/server';
import { getAccessTokenFromURL } from '@/utils/url';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const token = getAccessTokenFromURL(req.url) as string;
  if (url.pathname.startsWith('/redirects/signin')) {
    if (!req.cookies.get('token')) {
      const response = NextResponse.redirect(url);
      response.cookies.set('token', token);
      return response;
    } else {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }

  if (shouldRedirectToLogin(url.pathname) || url.pathname === '/log') {
    if (!req.cookies.get('token')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}

function shouldRedirectToLogin(pathname: string) {
  return ['/feed', '/my', '/place', '/home'].some((path) => pathname.startsWith(path));
}
