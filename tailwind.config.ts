import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink:'#172033', brand:'#5b5ce2', mist:'#f6f7fb' }, boxShadow:{ soft:'0 16px 50px rgba(27,35,80,.08)' } } }, plugins: [] };
export default config;
