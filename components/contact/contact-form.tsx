'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'mesajul nu a putut fi trimis');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error: any) {
            console.error('Error submitting form:', error);
            setStatus('error');
            setErrorMessage(error.message || 'ceva nu a funcționat. te rugăm să încerci din nou.');
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-10"
        >
            <div>
                <label htmlFor="name" className="block text-sm lowercase tracking-wider mb-4 text-[var(--muted)] font-semibold">
                    nume
                </label>
                <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-5 text-base bg-transparent border border-[var(--border)] rounded-sm focus:border-[var(--fg)] outline-none transition-all"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm lowercase tracking-wider mb-4 text-[var(--muted)] font-semibold">
                    email
                </label>
                <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-5 text-base bg-transparent border border-[var(--border)] rounded-sm focus:border-[var(--fg)] outline-none transition-all"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm lowercase tracking-wider mb-4 text-[var(--muted)] font-semibold">
                    mesaj
                </label>
                <textarea
                    id="message"
                    required
                    rows={7}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-5 text-base bg-transparent border border-[var(--border)] rounded-sm focus:border-[var(--fg)] outline-none transition-all resize-none"
                />
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full px-12 py-5 text-lg lowercase tracking-wider font-bold rounded-sm hover:opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: 'var(--fg)', color: 'var(--bg)' }}
                >
                    {status === 'loading' ? 'se trimite...' : status === 'success' ? 'mesaj trimis!' : 'trimite'}
                </button>
            </div>

            {status === 'success' && (
                <p className="text-base text-green-500 text-center font-medium">
                    îți mulțumim! revenim cu un răspuns în cel mult o zi.
                </p>
            )}

            {status === 'error' && (
                <p className="text-base text-red-500 text-center font-medium">
                    {errorMessage}
                </p>
            )}
        </motion.form>
    );
}
