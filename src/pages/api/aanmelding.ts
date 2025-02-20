export const prerender = false;

import { APIRoute } from "astro";
import { db, RSVP } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const name = data.get("naam");
  const email = data.get("email");
  const rsvp = data.get("rsvp");
  const allergien = data.get("allergien");
  const comment = data.get("opmerkingen");

  const body = {
    name,
    email,
    rsvp,
    allergien,
    comment,
  };

  if (!name || !email || !rsvp) {
    return new Response(
      JSON.stringify({
        message: "Er missen gegevens. Controleer je aanmelding.",
      }),
      { status: 400 }
    );
  }

  await db.insert(RSVP).values(body).returning();

  return new Response(
    JSON.stringify({
      message: "Bedankt voor je aanmelding! Wij kunnen niet wachten!",
    }),
    { status: 200 }
  );
};
