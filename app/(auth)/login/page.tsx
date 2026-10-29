import { Suspense } from 'react';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f7f8ff] text-sm font-medium text-slate-500">
          Loading your workspace…
        </main>
      }
    >
      <AuthForm mode="login" />
    </Suspense>
  );
}
