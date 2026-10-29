# FormCraft — Conversational Forms, Reimagined

**Build interactive forms. Collect meaningful responses. Embed conversational experiences anywhere.**

FormCraft is a full-stack, chatbot-powered form builder that transforms traditional forms into interactive conversations. Create and customize forms, publish shareable URLs, embed a floating chatbot widget on external websites, and manage submissions through a dedicated dashboard.

**Live Demo:** https://project-formcraft.vercel.app/  
**GitHub Repository:** https://github.com/Sabbirhossen143/Project_formcraft

![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?logo=next.js)
![React](https://img.shields.io/badge/React-UI-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Typed-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth_%26_Database-3FCF8E?logo=supabase&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Supabase Setup](#supabase-setup)
- [Running Locally](#running-locally)
- [Creating and Publishing a Form](#creating-and-publishing-a-form)
- [Embedding the Chatbot](#embedding-the-chatbot)
- [API Reference](#api-reference)
- [Database Architecture](#database-architecture)
- [Security](#security)
- [Production Deployment](#production-deployment)
- [Future Improvements](#future-improvements)

---

## Overview

Traditional forms can feel static and disconnected. FormCraft offers a conversational alternative through a chatbot-style interface that guides visitors through questions and collects their answers.

With FormCraft, users can:

- Create and manage conversational forms.
- Configure question types and required fields.
- Customize chatbot appearance and messages.
- Publish forms through public URLs.
- Embed a floating chatbot widget on external websites.
- Review submissions and individual answers from a dashboard.

The project is designed as a full-stack MVP and can serve as a foundation for further product development.

## Features

### Interactive Form Builder

- Create new forms and edit existing forms.
- Configure a form title and optional introduction.
- Support four question types:
  - **Short Text** — collect written answers.
  - **Email** — collect email addresses.
  - **Multiple Choice** — let visitors choose from predefined options.
  - **Yes / No** — collect binary responses.
- Mark questions as required.
- Add and remove multiple-choice options.
- Reorder questions.
- Preview the conversational experience before publishing.

### Chatbot Customization

Customize the chatbot experience to match your form or brand:

- Primary accent color.
- Welcome message.
- Completion message.
- Interactive chatbot preview.

### Form Publishing and Embedding

- Publish and unpublish forms.
- Generate a public form URL.
- Embed the chatbot on external websites using a JavaScript loader.
- Display the chat interface in a floating iframe.

### Dashboard and Submissions

- Authenticated dashboard.
- Total forms and response statistics.
- Published form overview.
- Form editing and management.
- Submission counts and timestamps.
- Individual answer details.
- Account settings and sign-out.

### Validation and Data Protection

- Server-side request validation with Zod.
- Supabase authentication.
- PostgreSQL Row Level Security (RLS).
- Ownership checks for form management.
- Database policies for access control.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js App Router | Application routing and server-side functionality |
| React | Interactive user interfaces |
| TypeScript | Type safety |
| Tailwind CSS | Responsive styling |
| Supabase Auth | User authentication |
| Supabase PostgreSQL | Persistent application data |
| Supabase RLS | Database access control |
| Zod | Server-side input validation |
| Lucide React | Interface icons |
| Vercel | Application deployment |

**Runtime requirement:** Node.js 20 or later.

## Getting Started

### Prerequisites

Before setting up the project, make sure you have:

- Node.js 20+
- npm
- A Supabase account and project
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Sabbirhossen143/Project_formcraft.git
cd Project_formcraft
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root.

Add the environment variables required by your application:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace the placeholder values with your actual Supabase project details. Use the key names required by the corresponding files in your project.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key used by the middleware, if retained in the code |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key used by the Supabase server client |
| `NEXT_PUBLIC_SITE_URL` | Base URL for the application and public form links |

**Important:** If you standardize on one Supabase public key variable in your code, remove the unused variable from this example. Never expose a Supabase service-role or secret key in a `NEXT_PUBLIC_` variable. Never commit `.env.local` to GitHub.

## Supabase Setup

1. Create a project in the Supabase Dashboard.
2. Copy the project URL and the appropriate public client key.
3. Add the required environment variables to `.env.local`.
4. Open your Supabase project's **SQL Editor**.
5. Open the `supabase-schema.sql` file in this repository.
6. Execute the complete SQL script.
7. Confirm that the `forms` and `submissions` tables and their Row Level Security policies have been created.

### Configure Authentication

In Supabase, navigate to **Authentication → URL Configuration**.

For local development, use:

- **Site URL:** `http://localhost:3000`
- Add the required local redirect URLs for your authentication flow.

For production, configure your deployed domain and the appropriate redirect URLs.

## Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Then:

1. Create an account.
2. Sign in to your workspace.
3. Create a form.
4. Configure questions and chatbot appearance.
5. Save the form and publish it.
6. Open the public form URL and test the conversation.
7. Review submitted answers in the dashboard.

### Production Build

Check the production build before deploying:

```bash
npm run build
```

Run the production server locally:

```bash
npm start
```

---

## Creating and Publishing a Form

The typical FormCraft workflow is:

1. **Create:** Start a new form from the dashboard.
2. **Configure:** Add questions, select response types, and set required fields.
3. **Customize:** Choose an accent color and configure welcome and completion messages.
4. **Preview:** Test the chatbot before publishing.
5. **Publish:** Make the form available through its public URL.
6. **Share:** Distribute the URL or embed the chatbot on another website.
7. **Review:** Inspect collected submissions through the dashboard.

You can unpublish a form when you no longer want it to accept public submissions.

## Embedding the Chatbot

FormCraft includes a JavaScript embed loader:

```text
/formcraft-embed.js
```

After publishing a form, copy the embed snippet shown on its edit screen.

Example for local development:

```html
<script
  src="http://localhost:3000/formcraft-embed.js"
  data-formcraft-slug="YOUR_FORM_SLUG"
  data-formcraft-base="http://localhost:3000"
  defer
></script>
```

### How It Works

The embed loader opens the published form inside a floating iframe using the public embed route:

```text
/embed/YOUR_FORM_SLUG
```

### Using the Embed on Another Website

1. Publish a form.
2. Copy the generated embed snippet.
3. Replace the sample URLs and slug with your actual values.
4. Add the snippet to the target website's HTML.
5. Load the website through a local or hosted HTTP server.
6. Test the widget and submit a response.

For production, use your deployed HTTPS origin for both URL attributes.

**Note:** Avoid opening the test HTML file directly through `file://` if browser restrictions interfere with iframe behavior. Use a local HTTP server instead.

---

## API Reference

The application includes the following API routes:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/forms` | Create a form |
| `PATCH` | `/api/forms/:id` | Update an owned form |
| `DELETE` | `/api/forms/:id` | Delete an owned form |
| `POST` | `/api/forms/:id/publish` | Publish or unpublish a form |
| `GET` | `/api/public/forms/:slug` | Retrieve published form metadata |
| `POST` | `/api/public/forms/:slug/responses` | Validate and save a public submission |

The exact request and response schemas are defined by the application's route handlers and validation logic.

## Database Architecture

FormCraft uses Supabase PostgreSQL with two primary tables.

### `forms`

Stores form definitions and publishing information.

| Field | Purpose |
|---|---|
| `user_id` | Associates the form with its creator |
| `title` | Form name |
| `description` | Optional introductory text |
| `slug` | Unique public identifier |
| `questions` | JSON representation of question definitions |
| `theme` | JSON representation of chatbot settings |
| `is_published` | Indicates whether the form is published |
| Timestamps | Creation and update tracking |

### `submissions`

Stores responses collected from published forms.

| Field | Purpose |
|---|---|
| `form_id` | Associates the submission with a form |
| `answers` | JSON representation of submitted answers |
| `created_at` | Records when the response was submitted |

The authoritative database schema is `supabase-schema.sql`.

## Security

Security controls in the MVP include:

- Supabase authentication for user accounts.
- Server-side validation using Zod.
- Form ownership checks.
- Row Level Security policies for database access.
- Public submission handling for published forms.

### Handling Credentials

- Keep private secrets out of client-side code.
- Never commit `.env.local`.
- Never expose a service-role key through browser-visible environment variables.
- Use the least-privileged credentials needed for each operation.
- Review database policies before changing access rules or adding endpoints.

---

## Production Deployment

FormCraft is deployed at:

**Live Application:** https://project-formcraft.vercel.app/

### Deploy with Vercel

1. Push the project to GitHub.
2. Open the [Vercel Dashboard](https://vercel.com/dashboard).
3. Import the repository: `Sabbirhossen143/Project_formcraft`.
4. Confirm that Vercel detects Next.js.
5. Add the required environment variables under **Project Settings → Environment Variables**.
6. Set the production site URL:

```dotenv
NEXT_PUBLIC_SITE_URL=https://project-formcraft.vercel.app
```

7. Set the Supabase project URL and the public key variables required by your code.
8. Deploy or redeploy the application.

### Update Supabase Authentication URLs

In Supabase **Authentication → URL Configuration**:

- Set the Site URL to `https://project-formcraft.vercel.app` if this is your primary production domain.
- Add any required production authentication redirect URLs.
- Keep local development URLs if you still need them.

### Verify the Live Application

After deployment, test:

- Landing page and navigation.
- Signup and login.
- Dashboard access.
- Form creation and editing.
- Save, publish, and unpublish operations.
- Public form URL.
- Submission creation and response review.
- Chatbot embed on an external website.
- Logout and access control.

A successful deployment does not by itself guarantee that authentication redirects, database policies, or embed URLs are configured correctly.

## Future Improvements

Potential enhancements for future versions include:

- Rate limiting for public submission endpoints.
- CAPTCHA or bot protection.
- Response exports and improved data-management tools.
- Advanced chatbot themes.
- Team workspaces and collaboration.
- Analytics and reporting.
- Audit logging, monitoring, and additional production safeguards.
- Privacy and data-retention controls.

These are potential improvements, not claims that all such features are already implemented.

---

## Project Links

- **Live Demo:** https://project-formcraft.vercel.app/
- **GitHub Repository:** https://github.com/Sabbirhossen143/Project_formcraft

**FormCraft — Turn forms into conversations.**
