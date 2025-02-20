import { defineConfig } from "astro/config";

import db from "@astrojs/db";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [db(), vue({ jsx: true })],
});
