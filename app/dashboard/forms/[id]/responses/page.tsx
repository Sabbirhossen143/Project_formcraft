import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Inbox, MessageSquareText, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import type { Question } from '@/lib/types';

export default async function ResponsesPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data: form } = await supabase
    .from('forms')
    .select('id,title,slug,questions,is_published')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!form) notFound();

  const { data: submissions, error } = await supabase
    .from('submissions')
    .select('id,answers,created_at')
    .eq('form_id', form.id)
    .order('created_at', { ascending: false });

  const questions = (form.questions || []) as Question[];
  const responseList = submissions ?? [];

  return (
    <div className="space-y-7">
      <Link
        href={`/dashboard/forms/${form.id}/edit`}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
      >
        <ArrowLeft size={14} /> Back to form
      </Link>

      <section className="relative isolate overflow-hidden rounded-[26px] bg-gradient-to-br from-[#17143b] via-[#29216b] to-[#5145cd] px-6 py-7 text-white shadow-[0_20px_55px_rgba(45,38,126,0.16)] sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold tracking-wide text-violet-100">
              <MessageSquareText size={14} /> RESPONSE INSIGHTS
            </div>
            <h1 className="mt-4 break-words text-2xl font-extrabold tracking-tight sm:text-3xl">{form.title}</h1>
            <p className="mt-2 text-sm text-indigo-100/85">Review submissions and explore what people shared with you.</p>
          </div>
          <span className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ring-1 ${
            form.is_published
              ? 'bg-emerald-400/15 text-emerald-100 ring-emerald-200/20'
              : 'bg-white/10 text-white/80 ring-white/15'
          }`}>
            <span className={`h-2 w-2 rounded-full ${form.is_published ? 'bg-emerald-300' : 'bg-slate-300'}`} />
            {form.is_published ? 'Published' : 'Draft'}
          </span>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.025)] sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">Total responses</p>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100"><Inbox size={20} /></span>
          </div>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">{responseList.length}</p>
          <p className="mt-1 text-xs text-slate-400">Submissions received for this form</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.025)] sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">Questions</p>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700 ring-1 ring-violet-100"><Sparkles size={20} /></span>
          </div>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">{questions.length}</p>
          <p className="mt-1 text-xs text-slate-400">Questions included in this form</p>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          Unable to load responses. Check Supabase RLS policies.
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.035)]">
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200"><MessageSquareText size={18} /></span>
          <div>
            <h2 className="font-extrabold text-slate-900">All submissions</h2>
            <p className="mt-1 text-xs text-slate-500">Newest responses appear first</p>
          </div>
          <span className="ml-auto rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{responseList.length} total</span>
        </div>

        {responseList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {responseList.map((submission, index) => (
              <article key={submission.id} className="transition-colors hover:bg-slate-50/70">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100/80 px-5 py-4 sm:px-7">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-extrabold text-indigo-700 ring-1 ring-indigo-100">
                      {(responseList.length - index).toString().padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900">Response #{(responseList.length - index).toString().padStart(3, '0')}</p>
                      <p className="mt-1 text-xs text-slate-500">Submitted {new Date(submission.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                    <CheckCircle2 size={13} /> Complete
                  </span>
                </div>
                <div className="grid gap-3 p-5 sm:grid-cols-2 sm:gap-4 sm:px-7">
                  {questions.map((q) => (
                    <div key={q.id} className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">{q.label}</p>
                      <p className="mt-2 break-words text-sm font-medium leading-6 text-slate-800">
                        {(submission.answers as Record<string, string>)?.[q.id] || <span className="italic text-slate-400">No answer</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : !error ? (
          <div className="px-6 py-16 text-center sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-700 shadow-sm">
              <Inbox size={27} />
            </div>
            <h2 className="mt-5 text-lg font-extrabold tracking-tight text-slate-900">No responses yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Share the public form link or embed the chatbot on your website to start collecting responses.
            </p>
            <div className="mx-auto mt-5 flex max-w-xl flex-col items-stretch gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center">
              <p className="min-w-0 flex-1 break-all px-2 text-left text-xs font-medium text-slate-600">
                {typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' ? process.env.NEXT_PUBLIC_SITE_URL : ''}/f/{form.slug}
              </p>
              <Link href={`/dashboard/forms/${form.id}/edit`} className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700">
                Edit form <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
