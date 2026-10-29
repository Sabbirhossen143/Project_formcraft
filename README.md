# FormCraft — Interactive Form Builder with Chatbot Widget

A full-stack MVP built with Next.js App Router, React, TypeScript, Tailwind CSS and Supabase PostgreSQL/Auth. Users can create conversational forms, publish public URLs, embed the chat widget on another site, and manage submissions.

## Features

- Responsive landing page with interactive demo
- Supabase email/password sign up and login
- Authenticated dashboard with form and response totals
- Form creation/editing, question types (text, email, multiple choice, yes/no), required fields and reordering
- Custom chatbot accent color, welcome message and completion message
- Public form URL and publish/unpublish controls
- JavaScript embed loader (`public/formcraft-embed.js`) that opens the chat in a floating iframe
- Server-side validation for forms and submissions with Zod
- Supabase Row Level Security policies for form ownership and submission privacy
- Response dashboard with answer details and timestamps

## Requirements

- Node.js 20+
- npm
- A Supabase project

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root (copy `.env.example`) and fill in your Supabase project URL and anon/public key. Find them in Supabase Dashboard → Project Settings → API.

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   Never put a Supabase `service_role` key in a `NEXT_PUBLIC_` variable or commit secrets.

3. In Supabase Dashboard → SQL Editor, run the complete contents of `supabase-schema.sql`.

4. In Supabase Dashboard → Authentication → URL Configuration, set the Site URL to `http://localhost:3000`. Add `http://localhost:3000/auth/callback` to Redirect URLs if email confirmation is enabled.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Visit `http://localhost:3000`, create an account, then create and publish a form.

## Test the external embed

Once a form is published, copy the snippet shown on its edit screen. It looks like this:

```html
<script src="http://localhost:3000/formcraft-embed.js"
  data-formcraft-slug="YOUR_FORM_SLUG"
  data-formcraft-base="http://localhost:3000" defer></script>
```

Paste it into a separate HTML page served from any local static server or another website. The embed opens `/embed/YOUR_FORM_SLUG` in a floating iframe. For production, replace both URLs with your deployed HTTPS origin. Do not open the HTML page as `file://` if the browser blocks cross-origin iframe behavior; use a local server.

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_SITE_URL` to Vercel environment variables. `NEXT_PUBLIC_SITE_URL` should be the deployed origin, e.g. `https://your-app.vercel.app`.
4. Update Supabase Auth Site URL and Redirect URLs to the deployed domain.
5. Redeploy, create a form, publish it and test the public link and embed script.

## Security notes and production hardening

- Keep the Supabase service-role key out of the browser. This MVP uses the anon key plus RLS.
- Public submission data is validated on the server and the insert policy only permits submissions to published forms.
- Add a rate limit / bot protection provider (e.g. Upstash Redis or Turnstile) before production traffic. The MVP intentionally avoids adding paid or external integrations.
- Consider CAPTCHA, retention controls, export/deletion workflows, audit logging, and stricter CSP before handling sensitive data.
- Configure email confirmation and strong password policy in Supabase Auth.
- Review the SQL policies before changing database access requirements. Anonymous users should never get a select policy for submissions.

## API routes

- `POST /api/forms` — create a form
- `PATCH /api/forms/:id` — update an owned form
- `DELETE /api/forms/:id` — delete an owned form and its submissions
- `POST /api/forms/:id/publish` — publish or unpublish
- `GET /api/public/forms/:slug` — retrieve published form metadata
- `POST /api/public/forms/:slug/responses` — validate and save a submission

## Data model

- `forms`: owner, title, description, unique public slug, questions JSON, theme JSON, publication state and timestamps
- `submissions`: form ID, answers JSON and timestamp

Question and theme JSON are validated in the server API. Supabase RLS protects owner data.
