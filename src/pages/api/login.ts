// src/pages/api/login.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { password } = await request.json();

  const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;

  console.log(ADMIN_PASSWORD, password);

  if (password === ADMIN_PASSWORD) {
    // Create a fake token (you should use JWT for real authentication)
    const fakeToken = "alqo29wy1mb";

    return new Response(JSON.stringify({ token: fakeToken }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Invalid credentials" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
};
