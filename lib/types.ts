export type QuestionType = 'text' | 'email' | 'multiple_choice' | 'yes_no';
export type Question = { id: string; type: QuestionType; label: string; required: boolean; options?: string[] };
export type FormTheme = { primaryColor: string; welcomeMessage: string; completionMessage: string };
export type FormRecord = { id: string; user_id: string; title: string; description: string; slug: string; questions: Question[]; theme: FormTheme; is_published: boolean; created_at: string; updated_at: string };
export type Submission = { id: string; form_id: string; answers: Record<string,string>; created_at: string };
export const DEFAULT_THEME: FormTheme = { primaryColor:'#5b5ce2', welcomeMessage:'Hi there! Let’s get started.', completionMessage:'Thanks! Your response has been submitted.' };
