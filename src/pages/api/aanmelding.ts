export const prerender = false;

import { APIRoute } from "astro";
import { db, RSVP, GERECHT } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const name = data.get("naam");
  const email = data.get("email");
  const rsvp = data.get("rsvp");
  const allergien = data.get("allergien");
  const comment = data.get("opmerkingen");
  const muziek = data.get("muziek");
  const gerecht1 = data.get("gerecht1");
  const ontbijt1 = data.get("ontbijt1");
  const gerecht2 = data.get("gerecht2");
  const ontbijt2 = data.get("ontbijt2");

  console.log(Boolean(ontbijt1), Boolean(ontbijt2));
  const body = {
    name,
    email,
    rsvp,
    allergien,
    muziek,
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

  const insertID = await db
    .insert(RSVP)
    .values(body)
    .returning({ id: RSVP.id });

  const gerechten_body = [
    {
      keuze: gerecht1,
      ontbijt: Boolean(ontbijt1),
      rsvp_id: insertID[0].id,
    },
  ];

  if (gerecht2) {
    gerechten_body.push({
      keuze: gerecht2,
      ontbijt: Boolean(ontbijt2),
      rsvp_id: insertID[0].id,
    });
  }

  await db.insert(GERECHT).values(gerechten_body).returning();

  return new Response(
    JSON.stringify({
      message: "Bedankt voor je aanmelding! Wij kunnen niet wachten!",
    }),
    { status: 200 }
  );
};
