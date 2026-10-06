import { NextResponse } from 'next/server';
import os from 'os';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  try {
    // Use NEXT_PUBLIC_BASE_URL if set (highest priority)
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      const url = new URL(process.env.NEXT_PUBLIC_BASE_URL);
      return NextResponse.json({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        hostIp: url.hostname,
        port: url.port || '3075'
      });
    }

    // Use request Host header to detect external access (e.g., tunnelto.me)
    const headersList = headers();
    const hostHeader = headersList.get('host');

    if (hostHeader) {
      // If accessed via a domain/tunnel, use that
      const protocol = headersList.get('x-forwarded-proto') || 'http';
      const baseUrl = `${protocol}://${hostHeader}`;
      const url = new URL(baseUrl);
      return NextResponse.json({
        baseUrl,
        hostIp: url.hostname,
        port: url.port || '3075'
      });
    }

    // Fallback: detect local IP
    const interfaces = os.networkInterfaces();
    let hostIp = 'localhost';

    for (const name of Object.keys(interfaces)) {
      const iface = interfaces[name];
      if (!iface) continue;
      for (const alias of iface) {
        if (alias.family === 'IPv4' && !alias.internal) {
          hostIp = alias.address;
          break;
        }
      }
      if (hostIp !== 'localhost') break;
    }

    const port = process.env.PORT || '3075';
    const baseUrl = `http://${hostIp}:${port}`;

    return NextResponse.json({ baseUrl, hostIp, port });
  } catch (error) {
    return NextResponse.json({ baseUrl: 'http://localhost:3075', hostIp: 'localhost', port: '3075' });
  }
}
