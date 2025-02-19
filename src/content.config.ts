import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const programCollection = defineCollection({
  loader: glob({ pattern: "**/**/*.md", base: "./src/content/program" }),
  schema: z.object({
    title: z.string(),
    time: z.string(),
    position: z.number(),
  }),
});

export const collections = {
  program: programCollection,
};
