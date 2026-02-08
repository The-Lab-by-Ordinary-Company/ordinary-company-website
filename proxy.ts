import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Strip port for matching
  const currentHost = hostname.replace(/:\d+$/, '');

  let subdomain: string | null = null;

  if (currentHost.endsWith('.ordinarycompany.design')) {
    subdomain = currentHost.replace('.ordinarycompany.design', '');
  } else if (currentHost.endsWith('.localhost')) {
    subdomain = currentHost.replace('.localhost', '');
  }

  if (subdomain === 'lab') {
    url.pathname = `/lab${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
};
