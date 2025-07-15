import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/private')) {
    return NextResponse.next()
  }

  const auth = request.headers.get('authorization')
  if (auth) {
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic') {
      const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':')
      const expectedUser = process.env.BASIC_AUTH_USER ?? 'admin'
      const expectedPass = process.env.BASIC_AUTH_PASS ?? 'password'
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Restricted"'
    }
  })
}

export const config = {
  matcher: ['/private/:path*']
}
