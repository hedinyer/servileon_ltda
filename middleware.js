import { NextResponse } from 'next/server'

// Estado de mantenimiento - cambiar a false cuando se termine el mantenimiento
const isMaintenanceMode = true

export function middleware(request) {
  // Si está en modo mantenimiento, redirigir todas las rutas a la página principal
  if (isMaintenanceMode && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}
