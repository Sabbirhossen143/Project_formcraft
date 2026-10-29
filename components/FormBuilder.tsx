'use client';
import { useMemo, useState } from 'react';import { useRouter } from 'next/navigation';import Link from 'next/link';import { ArrowDown, ArrowLeft, ArrowUp, Check, ChevronDown, Eye, GripVertical, LoaderCircle, Mail, Plus, Save, TextCursorInput, Trash2, X, ListChecks, CircleCheck } from 'lucide-react';import type { Question, QuestionType, FormTheme, FormRecord } from '@/lib/types';import { DEFAULT_THEME } from '@/lib/types';import Chatbot from '@/components/Chatbot';
const questionTypes: { value: QuestionType; label: string; description: string; icon: typeof TextCursorInput }[] = [
  { value: 'text', label: 'Short text', description: 'A short written answer', icon: TextCursorInput },
  { value: 'multiple_choice', label: 'Multiple choice', description: 'Choose from a list of options', icon: ListChecks },
  { value: 'yes_no', label: 'Yes / No', description: 'A simple yes or no answer', icon: CircleCheck },
  { value: 'email', label: 'Email', description: 'Collect an email address', icon: Mail },
];

function QuestionTypeSelect({
  value,
  onChange,
}: {
  value: QuestionType;
  onChange: (value: QuestionType) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = questionTypes.find((type) => type.value === value) ?? questionTypes[0];
  const SelectedIcon = selected.icon;

  return (
    <div className="relative min-w-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
        }}
        className={`group flex min-h-[54px] w-full items-center gap-3 rounded-xl border bg-white px-3 py-2.5 text-left shadow-sm outline-none transition-all duration-200 focus:ring-4 focus:ring-indigo-100 ${
          open
            ? 'border-indigo-400 ring-4 ring-indigo-100'
            : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'
        }`}
      >
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
          open ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100'
        }`}>
          <SelectedIcon size={17} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-extrabold text-slate-800">{selected.label}</span>
          <span className="mt-0.5 block truncate text-[10px] font-medium text-slate-400">{selected.description}</span>
        </span>
        <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-indigo-600' : ''}`} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close question type menu"
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="listbox"
            aria-label="Question type"
            className="absolute left-0 top-[calc(100%+8px)] z-40 w-full min-w-[235px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-[0_18px_50px_rgba(30,27,75,0.18)] ring-1 ring-black/[0.03] sm:min-w-[255px]"
          >
            <div className="px-3 pb-2 pt-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Response type</p>
            </div>
            {questionTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = type.value === value;
              return (
                <button
                  key={type.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(type.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-all duration-150 ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-800'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    isSelected ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-indigo-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold">{type.label}</span>
                    <span className="mt-0.5 block text-[10px] leading-4 text-slate-400">{type.description}</span>
                  </span>
                  {isSelected && <Check size={15} className="shrink-0 text-indigo-600" />}
                </button>
              );
            })}
            <div className="mx-2 mt-1 border-t border-slate-100 pt-2">
              <p className="px-1 pb-1 text-[10px] text-slate-400">Choose how people will respond.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const newQuestion=(type:QuestionType='text'):Question=>({id:crypto.randomUUID(),type,label:type==='email'?'What is your email address?':type==='multiple_choice'?'Choose an option':type==='yes_no'?'Would you like to continue?':'What would you like to tell us?',required:true,...(type==='multiple_choice'?{options:['Option 1','Option 2']}:{})});
export default function FormBuilder({initial}:{initial?:FormRecord}){const router=useRouter();const [title,setTitle]=useState(initial?.title||'Untitled form');const [description,setDescription]=useState(initial?.description||'');const [questions,setQuestions]=useState<Question[]>(initial?.questions||[newQuestion()]);const [theme,setTheme]=useState<FormTheme>(initial?.theme||DEFAULT_THEME);const [active,setActive]=useState(0);const [preview,setPreview]=useState(false);const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [savedId,setSavedId]=useState(initial?.id||'');
 const update=(id:string,patch:Partial<Question>)=>setQuestions(qs=>qs.map(q=>q.id===id?{...q,...patch}:q));const move=(index:number,delta:number)=>setQuestions(qs=>{const next=[...qs];const to=index+delta;if(to<0||to>=next.length)return qs;[next[index],next[to]]=[next[to],next[index]];setActive(to);return next});const add=(type:QuestionType)=>{const q=newQuestion(type);setQuestions(qs=>[...qs,q]);setActive(questions.length);setPreview(false)};
 async function setPublication(published:boolean){if(!savedId)return;setBusy(true);setError('');try{const res=await fetch(`/api/forms/${savedId}/publish`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({published})});const data=await res.json();if(!res.ok)throw new Error(data.error||'Could not update publication');setError(published?'Published successfully.':'Form unpublished.');router.refresh()}catch(e){setError(e instanceof Error?e.message:'Could not update publication')}finally{setBusy(false)}}
 async function deleteForm(){if(!savedId||!window.confirm('Delete this form and all its submissions? This cannot be undone.'))return;setBusy(true);try{const res=await fetch(`/api/forms/${savedId}`,{method:'DELETE'});const data=await res.json();if(!res.ok)throw new Error(data.error||'Could not delete form');router.push('/dashboard');router.refresh()}catch(e){setError(e instanceof Error?e.message:'Could not delete form')}finally{setBusy(false)}}
 async function save(publish?:boolean){setBusy(true);setError('');try{const res=await fetch(savedId?`/api/forms/${savedId}`:'/api/forms',{method:savedId?'PATCH':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,description,questions,theme})});const data=await res.json();if(!res.ok)throw new Error(data.error||'Could not save form');const id=data.form.id as string;setSavedId(id);if(publish){const r=await fetch(`/api/forms/${id}/publish`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({published:true})});const rd=await r.json();if(!r.ok)throw new Error(rd.error||'Could not publish form');}router.replace(`/dashboard/forms/${id}/edit${publish?'?published=1':''}`);router.refresh();if(publish)setError('Published successfully. Your public link is available below.')}catch(e){setError(e instanceof Error?e.message:'Unexpected error')}finally{setBusy(false)}}
 const previewTheme=theme;const previewQuestions=useMemo(()=>questions.map(q=>({...q})),[questions]);const publicUrl=typeof window!=='undefined'&&savedId?`${window.location.origin}/f/${initial?.slug||'your-form-slug'}`:'';
 return <div><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><Link href="/dashboard" className="mb-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-brand"><ArrowLeft size={14}/> Back to dashboard</Link><h1 className="text-2xl font-extrabold">{initial?'Edit form':'Create a form'}</h1><p className="mt-1 text-sm text-slate-500">Design the questions, customize the chat, then publish.</p></div><div className="flex gap-2"><button onClick={()=>setPreview(!preview)} className="btn"><Eye size={16}/>{preview?'Back to editor':'Preview'}</button><button disabled={busy} onClick={()=>void save()} className="btn"><Save size={16}/>{busy?'Saving…':'Save draft'}</button><button disabled={busy} onClick={()=>void save(true)} className="btn btn-primary"><Check size={16}/> Publish</button></div></div>
 {error&&<p role="status" className={`mb-5 rounded-xl p-3 text-sm ${error.includes('successfully')?'bg-emerald-50 text-emerald-700':'bg-rose-50 text-rose-700'}`}>{error}</p>}
 {initial&&<div className={`mb-5 rounded-xl border p-4 ${initial.is_published?'border-emerald-100 bg-emerald-50':'border-slate-200 bg-white'}`}><div className="flex flex-wrap items-center justify-between gap-3"><div><p className={`text-sm font-bold ${initial.is_published?'text-emerald-800':'text-slate-800'}`}>{initial.is_published?'This form is published':'This form is a draft'}</p><p className="mt-1 break-all text-xs text-slate-600">{typeof window!=='undefined'?`${window.location.origin}/f/${initial.slug}`:`/f/${initial.slug}`}</p></div><div className="flex flex-wrap gap-2"><Link className="btn" href={`/dashboard/forms/${initial.id}/responses`}>Responses</Link><button disabled={busy} onClick={()=>void setPublication(!initial.is_published)} className="btn">{initial.is_published?'Unpublish':'Publish form'}</button><button disabled={busy} onClick={()=>void deleteForm()} className="btn text-rose-600"><Trash2 size={14}/> Delete</button></div></div>{initial.is_published&&<div className="mt-4 border-t border-emerald-200/70 pt-4"><p className="text-xs font-bold text-emerald-900">Embed on your website</p><p className="mt-1 text-xs text-emerald-800">Paste this snippet before the closing body tag. Replace the base URL if you deploy elsewhere.</p><pre className="mt-2 overflow-x-auto rounded-lg bg-white/80 p-3 text-[11px] leading-5 text-slate-700">{`<script src="${typeof window!=='undefined'?window.location.origin:''}/formcraft-embed.js" data-formcraft-slug="${initial.slug}" data-formcraft-base="${typeof window!=='undefined'?window.location.origin:''}" defer></script>`}</pre></div>}</div>}
 {preview?<div className="flex justify-center rounded-2xl border border-slate-200 bg-slate-100 p-6"><Chatbot demo previewOnly title={title} description={description} questions={previewQuestions} theme={previewTheme}/></div>:<div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]"><div className="space-y-5"><section className="card p-5 sm:p-6"><label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Form title</label><input className="field text-xl font-bold" value={title} maxLength={120} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Customer feedback"/><label className="mb-2 mt-5 block text-xs font-bold uppercase tracking-wider text-slate-500">Description / intro (optional)</label><textarea className="field min-h-20 resize-y text-sm" value={description} maxLength={500} onChange={e=>setDescription(e.target.value)} placeholder="Tell people why you're asking these questions."/></section>
 <section className="space-y-3"><div className="flex items-center justify-between"><h2 className="font-bold">Questions <span className="text-slate-400">({questions.length})</span></h2><span className="text-xs text-slate-500">Use arrows to reorder</span></div>{questions.map((q,i)=><article key={q.id} onClick={()=>setActive(i)} className={`card p-4 transition ${active===i?'border-indigo-300 ring-2 ring-indigo-100':''}`}><div className="flex items-start gap-3"><div className="mt-2 text-slate-300"><GripVertical size={18}/></div><div className="min-w-0 flex-1"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-bold uppercase tracking-wide text-slate-400">Question {i+1}</span><div className="flex items-center gap-1"><button aria-label="Move question up" disabled={i===0} onClick={e=>{e.stopPropagation();move(i,-1)}} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"><ArrowUp size={15}/></button><button aria-label="Move question down" disabled={i===questions.length-1} onClick={e=>{e.stopPropagation();move(i,1)}} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"><ArrowDown size={15}/></button><button aria-label="Delete question" disabled={questions.length===1} onClick={e=>{e.stopPropagation();setQuestions(qs=>qs.filter(x=>x.id!==q.id));setActive(Math.max(0,i-1))}} className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 disabled:opacity-30"><Trash2 size={15}/></button></div></div><input className="field font-semibold" value={q.label} maxLength={240} onChange={e=>update(q.id,{label:e.target.value})}/><div className="mt-3 grid gap-3 sm:grid-cols-[minmax(220px,260px)_1fr]"><QuestionTypeSelect value={q.type} onChange={(type) => update(q.id, { type, ...(type === 'multiple_choice' ? { options: q.options?.length ? q.options : ['Option 1', 'Option 2'] } : { options: undefined }) })} /><label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={q.required} onChange={e=>update(q.id,{required:e.target.checked})} className="h-4 w-4 accent-indigo-600"/> Required question</label></div>{q.type==='multiple_choice'&&<div className="mt-4 space-y-2"><p className="text-xs font-bold text-slate-500">ANSWER OPTIONS</p>{(q.options||[]).map((option,j)=><div className="flex gap-2" key={`${q.id}-${j}`}><input className="field text-sm" value={option} maxLength={120} onChange={e=>update(q.id,{options:(q.options||[]).map((o,k)=>k===j?e.target.value:o)})}/><button aria-label="Remove option" disabled={(q.options||[]).length<=2} onClick={()=>update(q.id,{options:(q.options||[]).filter((_,k)=>k!==j)})} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 disabled:opacity-30"><X size={16}/></button></div>)}<button onClick={()=>update(q.id,{options:[...(q.options||[]),'New option'].slice(0,20)})} disabled={(q.options||[]).length>=20} className="text-xs font-bold text-brand">+ Add option</button></div>}</div></div></article>)}</section>
 <section className="card p-5"><h3 className="font-bold">Add a question</h3><p className="mt-1 text-xs text-slate-500">Choose a response type to add it to the end.</p><div className="mt-4 flex flex-wrap gap-2">{([{type:'text',label:'Text'},{type:'email',label:'Email'},{type:'multiple_choice',label:'Multiple choice'},{type:'yes_no',label:'Yes / No'}] as {type:QuestionType;label:string}[]).map(t=><button key={t.type} onClick={()=>add(t.type)} className="btn text-xs"><Plus size={14}/>{t.label}</button>)}</div></section></div>
 <aside className="space-y-5"><section className="card p-5"><h3 className="font-bold">Chat appearance</h3><p className="mt-1 text-xs leading-5 text-slate-500">Make the widget feel like your brand.</p><label className="mt-5 block text-xs font-bold text-slate-600">Primary color</label><div className="mt-2 flex items-center gap-3"><input aria-label="Primary color" type="color" value={theme.primaryColor} onChange={e=>setTheme({...theme,primaryColor:e.target.value})} className="h-10 w-12 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"/><input className="field text-sm uppercase" value={theme.primaryColor} pattern="^#[0-9a-fA-F]{6}$" onChange={e=>setTheme({...theme,primaryColor:e.target.value})}/></div><label className="mt-4 block text-xs font-bold text-slate-600">Welcome message</label><textarea className="field mt-2 min-h-20 resize-y text-sm" maxLength={240} value={theme.welcomeMessage} onChange={e=>setTheme({...theme,welcomeMessage:e.target.value})}/><label className="mt-4 block text-xs font-bold text-slate-600">Completion message</label><textarea className="field mt-2 min-h-20 resize-y text-sm" maxLength={240} value={theme.completionMessage} onChange={e=>setTheme({...theme,completionMessage:e.target.value})}/></section><section className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5"><h3 className="text-sm font-bold text-indigo-950">A quick tip</h3><p className="mt-2 text-xs leading-5 text-indigo-800">Keep questions clear and focused. Required fields are validated before a visitor can continue.</p><div className="mt-3 flex items-center gap-2 text-xs font-semibold text-indigo-700"><Check size={14}/> {questions.length} question{questions.length===1?'':'s'} added</div></section></aside></div>}
 </div>
}
