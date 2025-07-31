import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // if (token) return true; // is there is a token the user is authenticated
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        )
          return true;

        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    // '/api/*',
    // match all request paths except:
    // _next/static (static files)
    // _next/image (image optimization files)
    // favicon.ico (favicon file)
    // public folder
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};


// 2 47