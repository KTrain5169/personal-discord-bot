import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
 
const tags = defineCollection({
  name: "tags",
  directory: "src/content/tags",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    content: z.string(),
  }),
});
 
export default defineConfig({
  content: [tags],
});
