import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth')
  const isChatRoute = req.nextUrl.pathname.startsWith('/chat')

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/chat', req.nextUrl))
    }
    return NextResponse.next()
  }

  if (isChatRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/auth', req.nextUrl))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
