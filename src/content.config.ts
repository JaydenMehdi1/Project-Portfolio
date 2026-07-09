import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
	// Load Markdown and MDX files in the updated `src/content/projects/` directory.
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema tailored for a developer portfolio
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Added tags array to make categorization (e.g., Python, Cybersecurity) easy later
			tags: z.array(z.string()).optional(),
		}),
});

// Export the collection as 'projects' instead of 'projects'
export const collections = { projects };