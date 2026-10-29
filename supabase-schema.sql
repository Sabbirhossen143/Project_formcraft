-- Run this entire file in Supabase Dashboard > SQL Editor.
create extension if not exists pgcrypto;
create table if not exists public.forms (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  description text not null default '' check (char_length(description) <= 500),
  slug text not null unique check (slug ~ '^[a-zA-Z0-9_-]{8,80}$'),
  questions jsonb not null default '[]'::jsonb check (jsonb_typeof(questions) = 'array' and jsonb_array_length(questions) between 1 and 50),
  theme jsonb not null default '{"primaryColor":"#5b5ce2","welcomeMessage":"Hi there! Let’s get started.","completionMessage":"Thanks! Your response has been submitted."}'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists forms_user_id_updated_at_idx on public.forms(user_id, updated_at desc);
create index if not exists forms_published_slug_idx on public.forms(slug) where is_published = true;
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.forms(id) on delete cascade,
  answers jsonb not null default '{}'::jsonb check (jsonb_typeof(answers) = 'object'),
  created_at timestamptz not null default now()
);
create index if not exists submissions_form_id_created_at_idx on public.submissions(form_id, created_at desc);
alter table public.forms enable row level security;
alter table public.submissions enable row level security;
-- Forms: owners can manage their own forms. Public visitors can only read published form metadata.
drop policy if exists "Owners can view their forms" on public.forms;
create policy "Owners can view their forms" on public.forms for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Anyone can read published forms" on public.forms;
create policy "Anyone can read published forms" on public.forms for select to anon, authenticated using (is_published = true);
drop policy if exists "Owners can insert their forms" on public.forms;
create policy "Owners can insert their forms" on public.forms for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Owners can update their forms" on public.forms;
create policy "Owners can update their forms" on public.forms for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Owners can delete their forms" on public.forms;
create policy "Owners can delete their forms" on public.forms for delete to authenticated using (auth.uid() = user_id);
-- Submission inserts are intentionally done by the public API only after validation. The anon role gets no direct insert/read policy.
drop policy if exists "Owners can view submissions for their forms" on public.submissions;
create policy "Owners can view submissions for their forms" on public.submissions for select to authenticated using (exists (select 1 from public.forms f where f.id = form_id and f.user_id = auth.uid()));
drop policy if exists "Owners can delete submissions for their forms" on public.submissions;
create policy "Owners can delete submissions for their forms" on public.submissions for delete to authenticated using (exists (select 1 from public.forms f where f.id = form_id and f.user_id = auth.uid()));
-- The server-side API uses the caller's anon-key client, so public submissions need a narrow insert policy.
-- It permits inserting only when the related form is currently published. Validation also occurs in the API route.
drop policy if exists "Public can submit to published forms" on public.submissions;
create policy "Public can submit to published forms" on public.submissions for insert to anon, authenticated with check (exists (select 1 from public.forms f where f.id = form_id and f.is_published = true));
