import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  ArrowUpRight,
  FileText,
  Layers3,
  MessageSquareText,
  Plus,
  Sparkles,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();

  // Make sure a user is signed in before querying their forms.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  const { data: forms, error } = await supabase
    .from('forms')
    .select('id, title, slug, is_published, created_at, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  const formList = forms ?? [];
  const ids = formList.map((form) => form.id);

  let responseCount = 0;
  const counts: Record<string, number> = {};

  if (ids.length > 0) {
    const { data: submissions } = await supabase
      .from('submissions')
      .select('id, form_id')
      .in('form_id', ids);

    responseCount = submissions?.length ?? 0;

    for (const submission of submissions ?? []) {
      counts[submission.form_id] = (counts[submission.form_id] ?? 0) + 1;
    }
  }

  return (
    <div className="space-y-8">
      <section className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-[#17143b] via-[#29216b] to-[#5145cd] px-6 py-8 text-white shadow-[0_22px_60px_rgba(45,38,126,0.20)] sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-100px] right-1/3 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-violet-100 backdrop-blur">
              <Sparkles size={14} /> WORKSPACE OVERVIEW
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Good to see you again.
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-indigo-100/85 sm:text-base">
              Build better conversations, collect meaningful feedback, and keep every response in one place.
            </p>
          </div>
          <Link
            href="/dashboard/forms/new"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg shadow-indigo-950/15 transition hover:-translate-y-0.5 hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-white/25"
          >
            <Plus size={17} /> Create a form <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="relative mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-xs font-medium text-indigo-100/80">
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-300" /> Your workspace is ready</span>
          <span>Everything you create, organized in one place</span>
        </div>
      </section>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-100">!</span>
          <div>
            <p className="font-bold">Could not load your forms</p>
            <p className="mt-1 leading-5">Check your Supabase SQL setup, environment variables, and forms table permissions.</p>
          </div>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_3px_14px_rgba(15,23,42,0.025)] transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_16px_34px_rgba(46,38,112,0.08)] sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Total forms</p>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">{formList.length}</p>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 ring-1 ring-violet-100 transition group-hover:bg-violet-100">
              <FileText size={21} />
            </span>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400">Forms in your workspace</p>
          <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 opacity-70" /></div>
        </div>

        <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_3px_14px_rgba(15,23,42,0.025)] transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_34px_rgba(46,38,112,0.08)] sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Total responses</p>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">{responseCount}</p>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition group-hover:bg-blue-100">
              <MessageSquareText size={21} />
            </span>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400">Submissions collected</p>
          <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-80" /></div>
        </div>

        <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_3px_14px_rgba(15,23,42,0.025)] transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_16px_34px_rgba(46,38,112,0.08)] sm:col-span-2 sm:p-6 xl:col-span-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Published forms</p>
              <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">{formList.filter((form) => form.is_published).length}</p>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 transition group-hover:bg-emerald-100">
              <Sparkles size={21} />
            </span>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400">Live and ready to share</p>
          <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 opacity-80" /></div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.035)]">
        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200"><Layers3 size={20} /></span>
            <div>
              <h2 className="text-base font-extrabold tracking-tight text-slate-900">Your forms</h2>
              <p className="mt-1 text-xs text-slate-500">Manage forms and review submissions</p>
            </div>
          </div>
          <Link href="/dashboard/forms/new" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
            <Plus size={15} /> New form
          </Link>
        </div>

        {error ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-slate-500">Your forms could not be loaded. Please check the database setup and try again.</p>
          </div>
        ) : formList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {formList.map((form) => (
              <div key={form.id} className="group flex flex-col gap-4 px-5 py-5 transition-colors hover:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-700 transition group-hover:border-indigo-200">
                    <FileText size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">{form.title}</p>
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                      <span className="font-semibold text-slate-600">{counts[form.id] ?? 0} responses</span>
                      <span className="text-slate-300">•</span>
                      <span>Updated {new Date(form.updated_at ?? form.created_at).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ring-1 ${
                    form.is_published
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
                      : 'bg-amber-50 text-amber-700 ring-amber-100'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${form.is_published ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {form.is_published ? 'Published' : 'Draft'}
                  </span>
                  <Link href={`/dashboard/forms/${form.id}/responses`} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
                    Responses <ArrowUpRight size={14} />
                  </Link>
                  <Link href={`/dashboard/forms/${form.id}/edit`} className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-indigo-700">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-16 text-center sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-700 shadow-sm">
              <FileText size={27} />
            </div>
            <h3 className="mt-5 text-lg font-extrabold tracking-tight text-slate-900">Your first form starts here</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Create a few questions, preview your chatbot, then publish a link or embed it on your website.
            </p>
            <Link href="/dashboard/forms/new" className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700">
              <Plus size={16} /> Create your first form <ArrowUpRight size={15} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
