import { createClient } from '@/lib/supabase/server';
import { AtSign, Fingerprint, ShieldCheck, Settings2, UserRound } from 'lucide-react';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-7">
      <section className="relative isolate overflow-hidden rounded-[26px] bg-gradient-to-br from-[#17143b] via-[#29216b] to-[#5145cd] px-6 py-7 text-white shadow-[0_20px_55px_rgba(45,38,126,0.16)] sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold tracking-wide text-violet-100">
            <Settings2 size={14} /> WORKSPACE PREFERENCES
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Account settings</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100/85">
            Manage your account identity and view the details connected to your FormCraft workspace.
          </p>
        </div>
      </section>

      <section className="max-w-3xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.035)]">
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">
            <UserRound size={20} />
          </span>
          <div>
            <h2 className="font-extrabold text-slate-900">Account information</h2>
            <p className="mt-1 text-xs text-slate-500">Your signed-in identity and account identifier</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
            <ShieldCheck size={13} /> Verified session
          </span>
        </div>

        <div className="space-y-4 p-5 sm:p-7">
          <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
              <AtSign size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Email address</p>
              <p className="mt-2 break-words text-sm font-bold text-slate-800">{user?.email || 'No email available'}</p>
              <p className="mt-1 text-xs text-slate-500">Used to identify your FormCraft account.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
              <Fingerprint size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">User ID</p>
              <p className="mt-2 break-all font-mono text-xs leading-5 text-slate-700">{user?.id || 'Unavailable'}</p>
              <p className="mt-1 text-xs text-slate-500">Your unique Supabase account identifier.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
