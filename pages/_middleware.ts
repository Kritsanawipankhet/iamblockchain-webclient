import type { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(
  req: NextRequest,
  ev: NextFetchEvent,
  res: NextResponse
) {
  // return new Response("Hello, world!");
  return res;
}
