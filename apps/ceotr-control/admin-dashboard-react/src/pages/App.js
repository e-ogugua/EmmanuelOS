import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
export function App() {
    const [email, setEmail] = useState('');
    const [session, setSession] = useState(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => setSession(data.session));
        const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
        return () => { sub.subscription.unsubscribe(); };
    }, []);
    if (!session) {
        return (_jsx("div", { className: "min-h-screen grid place-items-center bg-slate-50", children: _jsxs("div", { className: "card p-8 w-full max-w-md", children: [_jsx("h1", { className: "text-xl font-semibold text-brand-blue mb-4", children: "Sign in" }), _jsxs("form", { onSubmit: async (e) => { e.preventDefault(); await supabase.auth.signInWithOtp({ email }); }, className: "grid gap-3", children: [_jsx("input", { className: "border rounded-2xl px-3 py-2", placeholder: "you@example.com", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("button", { className: "btn-primary", type: "submit", children: "Send magic link" })] })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-slate-50", children: [_jsx("header", { className: "bg-white border-b", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 py-4 flex items-center justify-between", children: [_jsxs("a", { href: "/", className: "flex items-center gap-3", children: [_jsx("img", { src: "/logo.svg", alt: "CEOTR Ltd", className: "h-8 w-auto" }), _jsx("span", { className: "font-semibold text-brand-blue", children: "CEOTR Control Center" })] }), _jsx("button", { className: "text-sm", onClick: () => supabase.auth.signOut(), children: "Sign out" })] }) }), _jsx("main", { className: "max-w-6xl mx-auto px-4 py-6", children: _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: ['Leads', 'Proposals', 'Projects', 'Tasks', 'Clients', 'Invoices', 'Expenses'].map((k) => (_jsxs("div", { className: "card p-4", children: [_jsx("div", { className: "font-medium text-brand-blue", children: k }), _jsx("div", { className: "text-sm text-slate-600 mt-1", children: "Coming soon." })] }, k))) }) })] }));
}
