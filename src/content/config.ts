import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    type: z.string().optional(),
    year: z.number(),
    excerpt: z.string().optional(),
    media: z
      .array(
        z.object({
          kind: z.enum(["image", "video"]),
          src: z.string(),
          thumb: z.string().optional()
        })
      )
      .default([])
  }),
});

export const collections = { projects };
