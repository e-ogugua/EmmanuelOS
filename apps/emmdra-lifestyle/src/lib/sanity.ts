import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// When Sanity envs are not set (e.g., local/CI/Netlify preview), export a fallback
// that provides `fetch` but rejects calls. Callers should catch and fallback to sample data.
export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion: '2024-06-01', useCdn: true })
  : ({
      fetch: async () => {
        throw new Error('Sanity projectId not configured')
      },
    } as unknown as ReturnType<typeof createClient>)
