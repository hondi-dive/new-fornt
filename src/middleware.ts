import { NextResponse, NextRequest } from 'next/server';
import { getAccessTokenFromURL } from '@/utils/url';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const token = getAccessTokenFromURL(req.url) as string;

  if (!req.cookies.get('token')) {
    const response = NextResponse.redirect(url);
    response.cookies.set('token', token);
    return response;
  } else {
    return NextResponse.redirect(new URL('/home', req.url));
  }
}

export const config = {
  matcher: '/redirects/signin',
};
