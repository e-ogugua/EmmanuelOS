# Zereth Foods — Cake Commerce Platform

Modern digital storefront and order management for Zereth cakes. Next.js App Router + Supabase + Cloudinary.

## Tech
- Next.js 14 (app router, TS)
- Tailwind CSS
- Supabase (auth, DB)
- Cloudinary (media)
- Optional: OpenAI (AI Cake Assistant), WhatsApp Cloud API, Resend/SendGrid

## Local Dev
1. Install deps at monorepo root: `npm install --workspaces`
2. Run dev: `npm run dev -w apps/zereth-foods`
3. Env vars (create `.env.local`):
   - NEXT_PUBLIC_SUPABASE_URL=
   - NEXT_PUBLIC_SUPABASE_ANON_KEY=
   - SUPABASE_SERVICE_ROLE_KEY=
   - CLOUDINARY_URL= (or CLOUDINARY_CLOUD_NAME/KEY/SECRET)
   - OPENAI_API_KEY=
   - WHATSAPP_TOKEN=, WHATSAPP_PHONE_ID=
   - RESEND_API_KEY= (or SENDGRID_API_KEY)

## DB
- SQL in `infra/supabase/zereth-foods/001_init.sql` and `seed.sql`
- Apply via Supabase SQL editor or CLI

## API Endpoints
- GET /api/cakes
- GET /api/cakes/[slug]
- POST /api/orders
- GET /api/orders/[id]
- PATCH /api/orders/[id]/status
- POST /api/upload
- POST /api/ai/suggest
- POST /api/subscribe

## Deploy
- Netlify: uses `netlify.toml` + `@netlify/plugin-nextjs`
- Vercel: import app and set env vars

## License
MIT
