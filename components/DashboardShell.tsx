'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Layers3,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings2,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export default function DashboardShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  const navigation = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, active: pathname === '/dashboard' },
    { href: '/dashboard/forms/new', label: 'Create a form', icon: Plus, active: pathname.startsWith('/dashboard/forms') },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings2, active: pathname.startsWith('/dashboard/settings') },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900 md:flex">
      <aside className="relative z-20 flex w-full flex-col border-b border-slate-200/80 bg-white md:fixed md:inset-y-0 md:w-[260px] md:border-b-0 md:border-r">
        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-5 sm:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 text-white shadow-lg shadow-indigo-600/20 transition group-hover:-rotate-3">
              <Layers3 size={20} />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">formcraft<span className="text-indigo-600">.</span></span>
          </Link>
          <button
            onClick={logout}
            title="Log out"
            aria-label="Log out"
            className="rounded-xl p-2.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 md:hidden"
          >
            <LogOut size={18} />
          </button>
        </div>

        <div className="hidden px-5 pb-2 pt-7 md:block">
          <p className="px-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">Workspace menu</p>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-3 py-3 md:flex-1 md:flex-col md:px-4 md:py-2">
          {navigation.map(({ href, label, icon: Icon, active }) => (
            <Link
              key={href}
              href={href}
              className={`group relative flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 ${
                active
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {active && <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-indigo-600" />}
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                active ? 'bg-white text-indigo-700 shadow-sm' : 'bg-slate-100/80 text-slate-500 group-hover:bg-white group-hover:text-indigo-600'
              }`}>
                <Icon size={17} />
              </span>
              <span>{label}</span>
              {active && <ChevronRight size={15} className="ml-auto hidden text-indigo-400 md:block" />}
            </Link>
          ))}
        </nav>

        <div className="hidden px-4 pb-4 md:block">
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/90 to-violet-50/80 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">
              <Sparkles size={17} />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-800">Make feedback useful</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">Create a form and turn responses into insights.</p>
            <Link href="/dashboard/forms/new" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900">
              Create a form <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        <div className="hidden border-t border-slate-100 p-4 md:block">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-extrabold text-white">
              {(email?.[0] || 'A').toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Signed in as</p>
              <p className="mt-1 truncate text-xs font-semibold text-slate-700" title={email}>{email}</p>
            </div>
            <button onClick={logout} title="Log out" aria-label="Log out" className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 md:ml-[260px]">
        <header className="sticky top-0 z-10 flex h-[76px] items-center justify-between border-b border-slate-200/70 bg-white/90 px-5 backdrop-blur-xl sm:px-8">
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">FormCraft / Workspace</p>
            <p className="mt-1 truncate text-sm font-bold text-slate-800">
              {pathname === '/dashboard' ? 'Overview' : pathname.startsWith('/dashboard/forms') ? 'Forms workspace' : 'Account settings'}
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Workspace active
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 sm:hidden">
            <LogOut size={14} /> Log out
          </button>
        </header>
        <main className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-8 xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
