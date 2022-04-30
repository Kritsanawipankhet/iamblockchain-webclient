import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextApiRequest) {
  // const session = await getSession({ req });
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  //console.log("session in middleware: ", session);

  if (session) {
    return NextResponse.next();
  } else {
    return new Response(JSON.stringify({ message: "Not authenticated." }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
