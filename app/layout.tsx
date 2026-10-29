import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'FormCraft — Forms that feel like conversations',description:'Build conversational forms, embed a chatbot, and manage every response in one workspace.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
