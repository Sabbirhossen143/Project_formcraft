'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Layers3,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const params = useSearchParams();
  const isLogin = mode === 'login';

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');

    try {
      const supabase = createClient();

      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        });

        if (signUpError) throw signUpError;

        if (data.session) {
          router.push('/dashboard');
          router.refresh();
        } else {
          setMessage('Account created! Check your inbox to confirm your email, then log in.');
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        router.push(params.get('next') || '/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8ff] text-slate-900">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-28 h-[28rem] w-[28rem] rounded-full bg-blue-200/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-10">
        <header className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">
              <Layers3 size={20} strokeWidth={2.4} />
            </span>
            <span className="text-xl font-black tracking-tight text-slate-900">
              formcraft<span className="text-indigo-600">.</span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-x-0.5 hover:border-indigo-200 hover:text-indigo-700 sm:px-4"
          >
            <ArrowLeft size={16} />
            <span>Back to home</span>
          </Link>
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:py-14">
          <section className="hidden lg:block">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-10 text-white shadow-2xl shadow-indigo-200/70 xl:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-violet-500/20 blur-2xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-bold tracking-wide text-indigo-100">
                  <Sparkles size={14} /> YOUR WORKSPACE, REIMAGINED
                </span>
                <h1 className="mt-8 max-w-lg text-4xl font-black leading-tight tracking-tight xl:text-5xl">
                  Forms that start conversations.
                </h1>
                <p className="mt-5 max-w-md text-base leading-7 text-indigo-100/80">
                  Build beautiful conversational forms, publish in a click, and keep every response organized in one calm workspace.
                </p>

                <div className="mt-9 space-y-4">
                  {[
                    'Create forms without the busywork',
                    'Give every visitor a friendly experience',
                    'Review responses from one dashboard',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-medium text-white/90">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                        <CheckCircle2 size={15} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-indigo-200">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <p className="font-bold">Your workspace, protected</p>
                      <p className="mt-1 text-sm text-indigo-100/65">Secure sign-in for your forms and responses.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-md">
            <div className="mb-7 text-center lg:text-left">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 lg:hidden">
                <Layers3 size={24} />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                {isLogin ? 'Welcome back' : 'Get started for free'}
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {isLogin ? 'Sign in to FormCraft' : 'Create your account'}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                {isLogin
                  ? 'Pick up where you left off. Your forms are waiting.'
                  : 'Your next great form starts with a few simple details.'}
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_80px_rgba(51,65,120,0.12)] backdrop-blur-xl sm:p-8">
              <form onSubmit={submit} className="space-y-5">
                {!isLogin && (
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">Full name</span>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={80}
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Enter your full name"
                    />
                  </label>
                )}

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">Email address</span>
                  <span className="relative block">
                    <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">Password</span>
                  <span className="relative block">
                    <LockKeyhole size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
                      required
                      minLength={8}
                      maxLength={128}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder={isLogin ? 'Enter your password' : 'At least 8 characters'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </span>
                  {isLogin && (
                    <span className="mt-2 block text-right text-xs text-slate-400">
                      Use the password associated with your account.
                    </span>
                  )}
                </label>

                {error && (
                  <p role="alert" className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-5 text-rose-700">
                    {error}
                  </p>
                )}
                {message && (
                  <div role="status" className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-5 text-emerald-800">
                    <p className="font-bold">You’re almost there!</p>
                    <p className="mt-1">{message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {busy ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" />
                      Please wait…
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Sign in to your workspace' : 'Create my account'}
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs font-medium text-slate-400">OR</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <p className="text-center text-sm text-slate-500">
                {isLogin ? 'New to FormCraft?' : 'Already have an account?'}{' '}
                <Link
                  className="font-extrabold text-indigo-600 underline-offset-4 transition hover:text-violet-700 hover:underline"
                  href={isLogin ? '/signup' : '/login'}
                >
                  {isLogin ? 'Create an account' : 'Sign in'}
                </Link>
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 text-xs text-slate-400 sm:flex-row">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} /> Secure authentication
              </span>
              <span className="hidden text-slate-300 sm:inline">•</span>
              <Link href="/" className="font-semibold transition hover:text-indigo-600">
                Return to the main page
              </Link>
            </div>
          </section>
        </div>

        <footer className="pb-2 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} FormCraft. Made for better conversations.
        </footer>
      </div>
    </main>
  );
}
