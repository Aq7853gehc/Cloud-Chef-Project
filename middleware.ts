import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  
  // Protected routes
  const protectedRoutes = [
    '/chef',
    '/user',
    '/customer',
    '/checkout',
    'thankyou'
  ];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    url.pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check role-based access
  if (url.pathname.startsWith('/chef') && token.role !== 'chef') {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  if ((url.pathname.startsWith('/user') || url.pathname.startsWith('/customer')) && token.role !== 'customer') {
    return NextResponse.redirect(new URL('/chef/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/chef/:path*',
    '/user/:path*',
    '/customer/:path*'
  ],
};