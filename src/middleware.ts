import { NextRequest, NextResponse } from 'next/server';

/**
 * Terminal labs (buffer overflow, Linux privesc) serve a ttyd web terminal, which needs
 * a WebSocket. Route handlers can't proxy WebSockets, so for these labs we rewrite
 * /api/lab-proxy/<id>/... straight to the container's ttyd. Next.js then proxies both
 * the page and the WebSocket upgrade on the SAME public URL, which is what makes it work
 * through a tunnel (random high ports are not reachable from the internet).
 *
 * Web labs are untouched: they continue to use the route handlers in api/lab-proxy.
 */
export async function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split('/'); // ['', 'api', 'lab-proxy', '<id>', ...rest]
  const labId = segments[3];
  if (!labId) return NextResponse.next();

  try {
    const port = process.env.PORT || '3075';
    const lookup = await fetch(`http://127.0.0.1:${port}/api/labs/proxy-target/${encodeURIComponent(labId)}`, {
      headers: { 'x-internal-lab-proxy': '1' },
      cache: 'no-store',
    });
    if (!lookup.ok) return NextResponse.next();

    const info = (await lookup.json()) as { kind?: string; target?: string };
    if (info.kind === 'terminal' && info.target) {
      const rest = segments.slice(4).join('/');
      return NextResponse.rewrite(new URL(`${info.target}/${rest}${request.nextUrl.search}`));
    }
  } catch (error) {
    console.error('lab-proxy middleware lookup failed:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/lab-proxy/:labId/:path*'],
};
