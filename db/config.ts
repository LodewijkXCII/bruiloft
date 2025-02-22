import { defineDb, column, defineTable, NOW } from "astro:db";

const RSVP = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text(),
    rsvp: column.text(),
    allergien: column.text({ optional: true }),
    comment: column.text({ optional: true }),
    created_at: column.date({ default: NOW }),
    updated_at: column.date({ default: NOW }),
    deleted_at: column.date({ optional: true }),
  },
});

const GERECHT = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    rsvp_id: column.number({
      references: () => RSVP.columns.id,
      optional: false,
    }),
    keuze: column.text(),
    created_at: column.date({ default: NOW }),
    updated_at: column.date({ default: NOW }),
    deleted_at: column.date({ optional: true }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    RSVP,
    GERECHT,
  },
});
