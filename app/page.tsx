'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Check,
  Code2,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MessageCircle,
  MousePointer2,
  ShieldCheck,
  Sparkles,
  Twitter,
  Zap,
} from 'lucide-react';
import Chatbot from '@/components/Chatbot';
import { DEFAULT_THEME, type Question } from '@/lib/types';

const demoQuestions: Question[] = [
  { id: 'name', type: 'text', label: 'What should we call you?', required: true },
  { id: 'email', type: 'email', label: 'What is your email address?', required: true },
  {
    id: 'goal',
    type: 'multiple_choice',
    label: 'What would you like to do today?',
    required: true,
    options: ['Collect leads', 'Get customer feedback', 'Run a survey'],
  },
  { id: 'updates', type: 'yes_no', label: 'Can we send you product updates?', required: true },
];

const navItems = [
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'demo', label: 'Live demo' },
];

const features = [
  {
    icon: Layers3,
    title: 'Visual form builder',
    desc: 'Create and arrange questions in minutes. Set required fields and preview before publishing.',
    tone: 'bg-violet-50 text-violet-600',
  },
  {
    icon: MessageCircle,
    title: 'Conversational widget',
    desc: 'Make forms feel human with one-question-at-a-time chat, custom colors and welcome messages.',
    tone: 'bg-blue-50 text-blue-600',
  },
  {
    icon: BarChart3,
    title: 'Response dashboard',
    desc: 'See form performance, review individual answers and keep submissions organized.',
    tone: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Code2,
    title: 'Embed anywhere',
    desc: 'Add your published chatbot to a website with a small JavaScript snippet.',
    tone: 'bg-amber-50 text-amber-600',
  },
  {
    icon: ShieldCheck,
    title: 'Private by design',
    desc: 'Owner-only management backed by authentication and database access policies.',
    tone: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Zap,
    title: 'Publish in a click',
    desc: 'Share a unique public link or unpublish whenever you need to pause responses.',
    tone: 'bg-indigo-50 text-indigo-600',
  },
];

const steps = [
  {
    n: '01',
    title: 'Build your questions',
    desc: 'Choose text, email, multiple choice or yes/no. Arrange them in the order that makes sense.',
  },
  {
    n: '02',
    title: 'Publish your chatbot',
    desc: 'Customize the accent color and welcome message, then publish a shareable form URL.',
  },
  {
    n: '03',
    title: 'Collect and learn',
    desc: 'Embed the widget on your site and review every submitted answer in your dashboard.',
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('features');
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function navigateToSection(event: MouseEvent<HTMLAnchorElement>, sectionId: string) {
    event.preventDefault();
    isScrollingRef.current = true;
    setActiveSection(sectionId);

    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800); // 800ms porjonto manual scroll listener active state override korbe na
  }

  useEffect(() => {
    const updateActiveSection = () => {
      if (isScrollingRef.current) return;

      const activationLine = 150;
      const currentSection = navItems
        .map((item) => document.getElementById(item.id))
        .filter((section): section is HTMLElement => {
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          return rect.top <= activationLine && rect.bottom > activationLine;
        })
        .sort(
          (a, b) =>
            b.getBoundingClientRect().top - a.getBoundingClientRect().top,
        )[0];

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  return (
    <main className="relative">
      <style jsx global>{`
        @keyframes fc-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fc-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fc-glow {
          0%, 100% { box-shadow: 0 12px 36px rgba(79, 70, 229, .10); }
          50% { box-shadow: 0 20px 56px rgba(79, 70, 229, .20); }
        }
        .fc-float { animation: fc-float 5s ease-in-out infinite; }
        .fc-float-delay { animation: fc-float 5.8s ease-in-out 1.2s infinite; }
        .fc-enter { animation: fc-fade-up .75s cubic-bezier(.2,.7,.2,1) both; }
        .fc-enter-delay-1 { animation: fc-fade-up .75s .15s cubic-bezier(.2,.7,.2,1) both; }
        .fc-enter-delay-2 { animation: fc-fade-up .75s .3s cubic-bezier(.2,.7,.2,1) both; }
        .fc-glow { animation: fc-glow 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .fc-float, .fc-float-delay, .fc-enter, .fc-enter-delay-1, .fc-enter-delay-2, .fc-glow {
            animation: none !important;
          }
          html { scroll-behavior: auto !important; }
        }
        html { scroll-behavior: smooth; scroll-padding-top: 90px; }
      `}</style>

      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="container flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2 text-lg font-extrabold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
              <Layers3 size={19} />
            </span>
            formcraft<span className="text-brand">.</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 text-sm font-semibold md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => navigateToSection(event, item.id)}
                aria-current={activeSection === item.id ? 'location' : undefined}
                className={`rounded-full px-4 py-2 transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-brand text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:bg-indigo-50 hover:text-brand'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link className="btn border-transparent text-sm hover:bg-slate-100" href="/login">
              Log in
            </Link>
            <Link className="btn btn-primary text-sm shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-lg" href="/signup">
              Get started <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
                onClick={(event) => navigateToSection(event, item.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeSection === item.id
                  ? 'bg-brand text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-brand'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="relative border-y border-slate-100 bg-[#fafaff]">
        <div className="grid-dots pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -right-28 -top-24 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="container relative grid min-h-[590px] items-center gap-10 py-16 lg:grid-cols-[1.04fr_.96fr]">
          <div className="fc-enter">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-2 text-xs font-bold text-brand shadow-sm transition hover:-translate-y-0.5">
              <Sparkles size={14} className="animate-pulse" /> FORMS, REIMAGINED AS CONVERSATIONS
            </div>
            <h1 className="max-w-[640px] text-5xl font-black leading-[1.07] tracking-[-.055em] text-ink sm:text-6xl">
              Forms that feel like a <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-500 bg-clip-text text-transparent">conversation.</span>
            </h1>
            <p className="mt-6 max-w-[530px] text-lg leading-8 text-slate-600">
              Build beautiful forms, turn them into friendly chat experiences, and collect every response in one simple workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn btn-primary fc-glow px-5 py-3 transition duration-200 hover:-translate-y-1">
                Build your first form <ArrowRight size={17} />
              </Link>
              <a href="#demo" className="btn border border-slate-200 bg-white px-5 py-3 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:text-brand">
                Try live demo <MousePointer2 size={16} />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-500" /> No code required</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-500" /> Share or embed anywhere</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-500" /> See responses instantly</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] fc-enter-delay-2">
            <div className="fc-float absolute -left-7 top-12 z-10 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-soft sm:block">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Response received</div>
              <div className="text-2xl font-black">+1 <span className="text-sm font-medium text-slate-400">just now</span></div>
            </div>
            <div className="fc-float-delay absolute -right-5 bottom-10 z-10 hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-soft sm:block">
              <div className="flex items-center gap-2 text-xs font-semibold"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-brand"><Zap size={14} /></span> One question at a time</div>
            </div>
            <div className="relative z-0 isolate rounded-[28px] border border-slate-200/80 bg-white p-3 shadow-[0_28px_90px_rgba(43,48,100,.14)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_35px_100px_rgba(43,48,100,.2)]">
              <div className="flex items-center justify-between border-b border-slate-100 px-3 pb-3 pt-1">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-300" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-300" /></div>
                <span className="text-[11px] text-slate-400">formcraft.app/demo</span><Code2 size={15} className="text-slate-400" />
              </div>
              <div className="flex min-h-[410px] items-center justify-center bg-slate-50/60 p-2">
                <Chatbot demo questions={demoQuestions} theme={DEFAULT_THEME} previewOnly title="A quick hello" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container scroll-mt-28 py-24">
        <div className="fc-enter mx-auto max-w-2xl text-center">
          <p className="eyebrow">Everything in one place</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">From first question to final response.</h2>
          <p className="mt-4 leading-7 text-slate-600">Everything you need to build a better way to ask, without stitching together multiple tools.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {features.map((item, index) => (
            <article key={item.title} style={{ animationDelay: `${index * 70}ms` }} className="fc-enter group card p-6 transition duration-300 hover:-translate-y-2 hover:border-indigo-100 hover:shadow-[0_20px_50px_rgba(79,70,229,.12)]">
              <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-110 ${item.tone}`}><item.icon size={21} /></div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-28 bg-[#f8f9ff] py-20">
        <div className="container">
          <div className="max-w-xl"><p className="eyebrow">Simple by design</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Three steps. One smarter form.</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n} className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-soft">
                <span className="text-sm font-extrabold text-brand">STEP {step.n}</span><h3 className="mt-4 text-xl font-bold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p><ArrowDownRight className="absolute right-5 top-6 text-slate-200 transition group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-brand" size={22} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="container relative isolate scroll-mt-32 grid items-center gap-10 py-24 md:grid-cols-2">
        <div className="fc-enter">
          <p className="eyebrow">Try before you build</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">A form can feel this easy.</h2>
          <p className="mt-4 max-w-lg leading-7 text-slate-600">Try the live demo. Answer a few questions and see how a conversational flow feels from your visitor’s point of view.</p>
          <div className="mt-6 space-y-3 text-sm text-slate-600"><p className="flex gap-2"><Check className="mt-0.5 text-emerald-500" size={17} /> One question at a time</p><p className="flex gap-2"><Check className="mt-0.5 text-emerald-500" size={17} /> Simple email validation</p><p className="flex gap-2"><Check className="mt-0.5 text-emerald-500" size={17} /> Clear completion message</p></div>
          <Link href="/signup" className="btn btn-primary mt-7 transition hover:-translate-y-0.5">Create your own <ArrowRight size={16} /></Link>
        </div>
        <div className="relative z-0 isolate flex min-w-0 justify-center rounded-[28px] border border-slate-200 bg-[#f8f9ff] p-4 transition duration-500 hover:shadow-[0_24px_70px_rgba(43,48,100,.12)] sm:p-8"><Chatbot demo questions={demoQuestions} theme={DEFAULT_THEME} previewOnly title="Product feedback" /></div>
      </section>

      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-12 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-bold text-indigo-300">READY WHEN YOU ARE</p><h2 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Make your next form your best one.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300">Build your first conversational form and start collecting responses with FormCraft.</p>
            <Link href="/signup" className="btn mt-7 bg-white px-5 py-3 text-ink transition hover:-translate-y-1 hover:shadow-lg">Get started for free <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="container py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-lg font-extrabold text-ink">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white"><Layers3 size={17} /></span>
                formcraft<span className="text-brand">.</span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">Forms that feel like conversations. Build, publish, and understand your audience with less friction.</p>
              <div className="mt-5 flex items-center gap-2">
                <a aria-label="GitHub" href="https://github.com" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-brand"><Github size={17} /></a>
                <a aria-label="LinkedIn" href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-brand"><Linkedin size={17} /></a>
                <a aria-label="Twitter" href="https://twitter.com" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-brand"><Twitter size={17} /></a>
                <a aria-label="Email" href="mailto:hello@formcraft.app" className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-brand"><Mail size={17} /></a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Explore</h3>
              <div className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-500">
                <a href="#features" className="transition hover:translate-x-1 hover:text-brand">Features</a>
                <a href="#how-it-works" className="transition hover:translate-x-1 hover:text-brand">How it works</a>
                <a href="#demo" className="transition hover:translate-x-1 hover:text-brand">Live demo</a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Get started</h3>
              <div className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-500">
                <Link href="/signup" className="transition hover:translate-x-1 hover:text-brand">Create an account</Link>
                <Link href="/login" className="transition hover:translate-x-1 hover:text-brand">Log in</Link>
                <a href="mailto:hello@formcraft.app" className="transition hover:translate-x-1 hover:text-brand">Contact us</a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} FormCraft. All rights reserved.</span>
            <span>Thoughtfully built for better conversations.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}