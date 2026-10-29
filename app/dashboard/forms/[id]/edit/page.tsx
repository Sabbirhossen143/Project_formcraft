import { notFound } from 'next/navigation';
import { FilePenLine, Sparkles } from 'lucide-react';
import FormBuilder from '@/components/FormBuilder';
import { createClient } from '@/lib/supabase/server';

export default async function EditFormPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) notFound();

  const { data: form, error } = await supabase
    .from('forms')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !form) notFound();

  return (
    <div className="space-y-6">
      <section className="relative isolate overflow-hidden rounded-[24px] border border-indigo-100 bg-gradient-to-r from-white via-indigo-50/80 to-violet-50/80 px-5 py-6 sm:px-7">
        <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-[11px] font-extrabold tracking-wide text-indigo-700">
              <Sparkles size={13} /> FORM STUDIO
            </div>
            <h1 className="mt-3 break-words text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Edit your form</h1>
            <p className="mt-2 max-w-xl break-words text-sm leading-6 text-slate-500">
              Update <span className="font-semibold text-slate-700">{form.title}</span>, refine your questions, and keep your form experience polished.
            </p>
          </div>
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100 sm:flex">
            <FilePenLine size={25} />
          </div>
        </div>
      </section>
      <div className="min-w-0">
        <FormBuilder initial={form} />
      </div>
    </div>
  );
}
