# FormCraft — Conversational Forms, Reimagined

**Build interactive forms. Collect meaningful responses. Embed conversational experiences anywhere.**

FormCraft is a full-stack, chatbot-powered form builder that transforms traditional forms into interactive conversations. Create and customize forms, publish shareable URLs, embed a floating chatbot widget on external websites, and manage submissions through a dedicated dashboard.

Built with **Next.js, React, TypeScript, Tailwind CSS, and Supabase**, FormCraft provides a modern foundation for conversational data collection.

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
- [Production Hardening](#production-hardening)
- [Project Status](#project-status)

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
  - **Short text** — collect written answers.
  - **Email** — collect email addresses.
  - **Multiple choice** — let visitors choose from predefined options.
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
- Submission policies designed to prevent anonymous access to private responses.

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
| Vercel | Recommended deployment platform |

**Runtime requirement:** Node.js 20 or later.

## Getting Started

### Prerequisites

Before setting up the project, make sure you have:

- Node.js 20+
- npm
- A Supabase account and project
- Git
- A GitHub repository, if you plan to deploy through Vercel

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_DIRECTORY
```

Replace the placeholders with your actual repository URL and directory name.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root. You can start by copying `.env.example` if it exists.

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace the placeholder values with your actual Supabase project credentials.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable/anon client key used by the application |
| `NEXT_PUBLIC_SITE_URL` | Base URL used to construct application and public form links |

**Security note:** Never expose a Supabase `service_role` key in a `NEXT_PUBLIC_` variable or commit secrets to Git.

### 4. Configure the Database

1. Open your Supabase project.
2. Navigate to **SQL Editor**.
3. Open the project's `supabase-schema.sql` file.
4. Execute the complete SQL script.
5. Confirm that the required tables and policies were created successfully.

### 5. Configure Supabase Authentication

In Supabase, navigate to **Authentication → URL Configuration**.

For local development, configure:

- **Site URL:** `http://localhost:3000`
- **Redirect URL:** `http://localhost:3000/auth/callback`, if required by your email-confirmation flow.

Use the appropriate production URLs when deploying the application.

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

FormCraft includes a JavaScript embed loader at:

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

FormCraft exposes the following application routes.

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/forms` | Create a form |
| `PATCH` | `/api/forms/:id` | Update an owned form |
| `DELETE` | `/api/forms/:id` | Delete an owned form and its submissions |
| `POST` | `/api/forms/:id/publish` | Publish or unpublish a form |
| `GET` | `/api/public/forms/:slug` | Retrieve published form metadata |
| `POST` | `/api/public/forms/:slug/responses` | Validate and save a public submission |

### API Behavior

- Form creation and updates use the authenticated user's identity.
- Form management endpoints check ownership.
- Public form retrieval is intended for published forms.
- Public submissions are validated on the server before being stored.
- Database policies provide an additional access-control layer.

The exact request and response schemas are defined by the application's route handlers and validation logic.

## Database Architecture

FormCraft uses Supabase PostgreSQL with two primary tables.

### `forms`

Stores form definitions and publishing information.

| Field | Purpose |
|---|---|
| Owner / user ID | Associates the form with its creator |
| Title | Form name |
| Description | Optional introductory text |
| Slug | Unique public identifier |
| Questions | JSON representation of question definitions |
| Theme | JSON representation of chatbot settings |
| Publication state | Indicates whether the form is published |
| Timestamps | Creation and update tracking |

### `submissions`

Stores responses collected from published forms.

| Field | Purpose |
|---|---|
| Form ID | Associates the submission with a form |
| Answers | JSON representation of submitted answers |
| Created timestamp | Records when the response was submitted |

Question and theme JSON are validated through the server API using Zod. Supabase RLS policies help enforce access rules for owners and public submissions.

The authoritative schema is the project's `supabase-schema.sql` file.

## Security

Security controls included in the MVP:

- Supabase authentication for user accounts.
- Server-side validation using Zod.
- Form ownership checks.
- Row Level Security policies for database access.
- Public submissions restricted to published forms.
- No intended anonymous read access to private submission records.

### Handling Credentials

- Keep private secrets out of client-side code.
- Never commit `.env.local`.
- Never expose a service-role key through browser-visible environment variables.
- Use the least-privileged credentials needed for each operation.

Review the database policies before changing access rules or introducing new endpoints.

---

## Production Deployment

FormCraft can be deployed to Vercel.

### 1. Push the Project to GitHub

Commit your latest changes and push them to your repository.

```bash
git add .
git commit -m "Prepare FormCraft for deployment"
git push
```

Make sure secrets and local environment files are excluded from Git.

### 2. Import the Repository into Vercel

1. Open the Vercel dashboard.
2. Import your GitHub repository.
3. Confirm the framework is detected as Next.js.
4. Configure the required environment variables.

### 3. Configure Production Environment Variables

In Vercel, add:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL=https://YOUR_DEPLOYED_DOMAIN
```

Replace `YOUR_DEPLOYED_DOMAIN` with your actual deployed origin, without adding a path.

Set the variables for the appropriate deployment environments, then deploy or redeploy the application.

### 4. Update Supabase Authentication URLs

In Supabase **Authentication → URL Configuration**:

- Set the Site URL to your production domain.
- Add the production authentication callback URL to Redirect URLs if your authentication flow requires it.
- Keep local development URLs if you still need them.

### 5. Verify the Live Application

After deployment, test the following:

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

## Production Hardening

Before accepting significant public traffic or sensitive information, consider adding:

- **Rate limiting:** Protect public submission endpoints against abuse.
- **Bot protection:** Add CAPTCHA or a provider such as Cloudflare Turnstile.
- **Retention controls:** Define how long submissions are stored.
- **Export and deletion workflows:** Give authorized users appropriate data-management options.
- **Audit logging:** Track important administrative actions.
- **Content Security Policy:** Restrict resources and embedding behavior where appropriate.
- **Authentication hardening:** Configure email confirmation and a strong password policy.
- **Monitoring:** Add error reporting and production health checks.
- **Privacy documentation:** Explain what information is collected and how it is handled.

These are recommended future improvements and should not be interpreted as features already implemented in the MVP.

## Project Status

**Current scope:** Full-stack MVP.

Implemented capabilities include conversational form creation, publishing, chatbot embedding, authentication, and response management.

Potential future enhancements include analytics, response exports, advanced themes, team workspaces, additional question types, spam protection, and deeper operational monitoring.

---

**FormCraft — Turn forms into conversations.**
