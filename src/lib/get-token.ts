import "server-only";

import { headers } from "next/headers";
import { getToken as getJwt } from "next-auth/jwt";

export async function getToken(): Promise<string | null> {
  const headersList = await headers();

  const jwt = await getJwt({
    req: {
      headers: Object.fromEntries(headersList.entries()),
    },
    secret: process.env.AUTH_SECRET!,
    secureCookie: process.env.NODE_ENV === "production",
  });

  return (jwt?.accessToken as string | undefined) ?? null;
}

export async function getDecodedToken<
  T = Record<string, unknown>
>(): Promise<T | null> {
  const token = await getToken();

  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const payload = Buffer.from(parts[1], "base64url").toString("utf8");
    return JSON.parse(payload) as T;
  } catch {
    return null;
  }
}