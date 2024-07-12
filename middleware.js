import { NextResponse } from "next/server";

const middleware = (request) => {
  const { cookies, nextUrl } = request;
  const { pathname } = nextUrl;
};

export default middleware;
