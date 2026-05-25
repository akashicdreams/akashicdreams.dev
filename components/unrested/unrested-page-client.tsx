'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { TextScramble } from '@/components/ui/text-scramble';
import { MagneticWrapper } from '@/components/ui/magnetic-wrapper';

// ─── DATA ────────────────────────────────────────────────────────────────────

const steps = [
    {
        number: '01',
        title: 'set your alarm',
        description: 'pick a time and choose your challenges. configured once, ready every morning.',
    },
    {
        number: '02',
        title: 'wake up hard',
        description: 'the alarm fires. no snooze. solve your challenges or it keeps going.',
    },
    {
        number: '03',
        title: 'earn your streak',
        description: 'complete every morning and your streak builds. miss once and it resets.',
    },
];

const challenges = [
    {
        icon: MathIcon,
        name: 'math chain',
        description: 'solve 3-step equations in your head. no calculator.',
    },
    {
        icon: WordIcon,
        name: 'word unscramble',
        description: 'unscramble letters into real words before time runs out.',
    },
    {
        icon: ShakeIcon,
        name: 'shake count',
        description: 'shake your phone a set number of times. simple. brutal.',
    },
    {
        icon: MemoryIcon,
        name: 'memory sequence',
        description: 'memorize and repeat a tile pattern exactly.',
    },
    {
        icon: TypingIcon,
        name: 'typing accuracy',
        description: 'type a sentence at 90%+ accuracy. typos don\'t count.',
    },
    {
        icon: TriviaIcon,
        name: 'trivia quiz',
        description: 'answer 3 questions correctly. wrong answer -try again.',
    },
];

const features = [
    { icon: '✕', label: 'no snooze. ever.' },
    { icon: '◈', label: '1–3 challenges per alarm' },
    { icon: '▦', label: 'streak tracking + calendar history' },
    { icon: '▲', label: 'volume ramp -starts quiet, gets louder' },
    { icon: '~', label: 'vibration support' },
    { icon: '⊘', label: '100% offline' },
];


// ─── INLINE SVG ICONS ────────────────────────────────────────────────────────

function MathIcon() {
    return (
        <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden>
            <text x="2" y="20" fontFamily="monospace" fontSize="16" fill="white" fontWeight="700">∑</text>
            <line x1="2" y1="24" x2="16" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </svg>
    );
}

function WordIcon() {
    return (
        <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden>
            <rect x="2" y="8" width="8" height="8" rx="2" fill="white" opacity="0.9" />
            <rect x="12" y="4" width="8" height="8" rx="2" fill="white" opacity="0.5" />
            <rect x="7" y="16" width="8" height="8" rx="2" fill="white" opacity="0.7" />
            <rect x="17" y="14" width="8" height="8" rx="2" fill="white" opacity="0.35" />
        </svg>
    );
}

function ShakeIcon() {
    return (
        <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden>
            <rect x="9" y="4" width="10" height="20" rx="3" stroke="white" strokeWidth="2" />
            <line x1="14" y1="18" x2="14" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="10" x2="6" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="3" y1="18" x2="6" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="25" y1="10" x2="22" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="25" y1="18" x2="22" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
    );
}

function MemoryIcon() {
    return (
        <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden>
            <rect x="3"  y="3"  width="9" height="9" rx="2" fill="white" />
            <rect x="16" y="3"  width="9" height="9" rx="2" fill="white" opacity="0.35" />
            <rect x="3"  y="16" width="9" height="9" rx="2" fill="white" opacity="0.6" />
            <rect x="16" y="16" width="9" height="9" rx="2" fill="white" opacity="0.9" />
        </svg>
    );
}

function TypingIcon() {
    return (
        <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden>
            <rect x="2" y="7" width="24" height="14" rx="2" stroke="white" strokeWidth="2" />
            <line x1="7"  y1="12" x2="9"  y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="12" x2="16" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="12" x2="21" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="9"  y1="16" x2="19" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function TriviaIcon() {
    return (
        <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden>
            <circle cx="14" cy="14" r="11" stroke="white" strokeWidth="2" />
            <path d="M 11 11 Q 11 7 14 7 Q 17 7 17 10 Q 17 13 14 14" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="14" cy="19" r="1.5" fill="white" />
        </svg>
    );
}

// ─── GOOGLE PLAY BADGE ───────────────────────────────────────────────────────

function GooglePlayBadge() {
    return (
        <a
            href="https://play.google.com/store/apps/details?id=com.akashicdreams.unrested"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="get unrested on google play"
        >
            <MagneticWrapper strength={0.2} radius={70}>
                <div className="inline-flex items-center gap-4 px-5 py-3 rounded-xl border border-white/20 bg-black hover:bg-white/5 transition-all duration-300">
                    {/* Official Google Play 4-color triangle icon */}
                    <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" aria-hidden fill="none">
                        {/* Bottom-left green triangle */}
                        <path d="M3.18 23.5c.3.17.64.26 1 .24l10.6-11.85L11.4 8.6 3.18 23.5z" fill="#34A853" />
                        {/* Top-left blue triangle */}
                        <path d="M3 1.06a1.5 1.5 0 0 0-.5 1.16v19.56c0 .46.18.87.5 1.16l.09.08L14.07 12v-.18L3.09.98 3 1.06z" fill="#4285F4" />
                        {/* Right red triangle */}
                        <path d="M17.84 15.74l-3.77-3.77.18-.18 3.59-3.59 4.27 2.43c1.22.69 1.22 1.82 0 2.51l-4.27 2.6z" fill="#EA4335" />
                        {/* Bottom yellow triangle */}
                        <path d="M17.84 15.74L14.07 12 3 23.07c.4.43 1.06.48 1.59.15l13.25-7.48z" fill="#FBBC05" />
                        {/* Top yellow/green overlap fix */}
                        <path d="M17.84 8.26L4.59.78C4.06.45 3.4.5 3 .93L14.07 12l3.77-3.74z" fill="#FBBC05" />
                    </svg>
                    <div className="flex flex-col text-left leading-tight">
                        <span className="text-[9px] tracking-[0.25em] text-white/50 uppercase font-semibold">
                            get it on
                        </span>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Google Play
                        </span>
                    </div>
                </div>
            </MagneticWrapper>
        </a>
    );
}

// ─── SECTION: HERO ───────────────────────────────────────────────────────────

function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <MatrixRain opacity={0.05} speed={0.7} density={0.35} />
            </div>
            <FloatingParticles count={20} minSize={1} maxSize={3} />

            {/* Glow orbs */}
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 600, height: 600, left: '-10%', top: '10%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 400, height: 400, right: '5%', bottom: '15%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            />

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
            >
                <span className="text-[10px] tracking-[0.3em] text-[var(--muted)] lowercase">scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-[1px] h-8 bg-gradient-to-b from-[var(--muted)] to-transparent"
                />
            </motion.div>

            <div className="container max-w-7xl mx-auto px-6 relative z-10 py-48">
                <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">

                    {/* App Icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex-shrink-0 relative"
                    >
                        <div className="relative">
                            {/* Outer glow ring */}
                            <motion.div
                                className="absolute inset-[-24px] rounded-[52px] border pointer-events-none"
                                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                                className="absolute inset-[-48px] rounded-[64px] border pointer-events-none"
                                style={{ borderColor: 'rgba(255,255,255,0.03)' }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* Icon */}
                            <motion.div
                                animate={{ scale: [1, 1.04, 1], opacity: [1, 0.9, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative"
                                style={{
                                    filter: 'drop-shadow(0 0 60px rgba(255,255,255,0.08))',
                                }}
                            >
                                <Image
                                    src="/apps/unrested/icon.svg"
                                    alt="unrested app icon"
                                    width={200}
                                    height={200}
                                    className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-[40px]"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-[11px] tracking-[0.4em] text-[var(--muted)] mb-10 lowercase font-semibold"
                        >
                            alarm app · android
                        </motion.div>

                        <h1 className="text-7xl md:text-9xl font-bold lowercase tracking-tighter leading-[0.85] mb-10">
                            <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="block"
                            >
                                <TextScramble text="unrested" duration={1000} delay={600} />
                            </motion.span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            className="text-2xl md:text-3xl font-bold text-[var(--fg)] mb-8 lowercase tracking-tight max-w-lg"
                        >
                            the alarm that earns your morning.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-base md:text-lg text-[var(--muted)] mb-16 lowercase leading-loose max-w-md"
                        >
                            no snooze. complete mental challenges to stop the alarm.
                            build discipline, one morning at a time.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            <GooglePlayBadge />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── SECTION: HOW IT WORKS ───────────────────────────────────────────────────

function HowItWorks() {
    return (
        <section className="relative py-56 md:py-64 overflow-hidden border-t border-[var(--border)]">
            <div className="absolute inset-0 animated-gradient-bg" />

            <div className="container max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="flex flex-col items-center text-center mb-32 md:mb-40"
                >
                    <span className="text-[11px] tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold">
                        how it works
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold lowercase tracking-tighter">
                        three steps. no mercy.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 relative">
                    {/* Connecting line on desktop */}
                    <div
                        className="hidden md:block absolute top-[3.25rem] left-[calc(16.666%+1rem)] right-[calc(16.666%+1rem)] h-[1px] pointer-events-none"
                        style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }}
                    />

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="group flex flex-col items-center md:items-start text-center md:text-left"
                        >
                            {/* Number circle */}
                            <div className="w-14 h-14 rounded-full border-2 border-[var(--border)] group-hover:border-[var(--fg)] transition-colors duration-500 flex items-center justify-center mb-10 bg-[var(--bg)] relative z-10 flex-shrink-0">
                                <span className="text-xs font-mono font-bold text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors">
                                    {step.number}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold lowercase tracking-tight mb-5">
                                {step.title}
                            </h3>
                            <p className="text-sm text-[var(--muted)] leading-loose lowercase">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── SECTION: CHALLENGES ─────────────────────────────────────────────────────

function Challenges() {
    return (
        <section className="relative py-56 md:py-64 overflow-hidden border-t border-[var(--border)]">
            <FloatingParticles count={12} minSize={1} maxSize={2} />

            <div className="container max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="flex flex-col items-center text-center mb-32 md:mb-40"
                >
                    <span className="text-[11px] tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold">
                        the challenges
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold lowercase tracking-tighter mb-10">
                        six ways to wake up.
                    </h2>
                    <p className="text-base text-[var(--muted)] lowercase max-w-sm leading-loose">
                        stack up to three per alarm.<br />the harder the stack, the harder the morning.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {challenges.map((c, i) => (
                        <motion.div
                            key={c.name}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.5, delay: i * 0.07 }}
                            className="group relative border border-[var(--border)] rounded-sm p-10 hover:border-[var(--fg)] transition-all duration-500 overflow-hidden card-glow"
                        >
                            {/* Ghost number background */}
                            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-[6rem] font-bold text-[var(--fg)] opacity-[0.025] leading-none font-mono select-none pointer-events-none">
                                {String(i + 1).padStart(2, '0')}
                            </span>

                            <div className="relative z-10">
                                <div className="mb-7 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <c.icon />
                                </div>
                                <h3 className="text-lg font-bold lowercase tracking-tight mb-4">
                                    {c.name}
                                </h3>
                                <p className="text-sm text-[var(--muted)] leading-loose lowercase">
                                    {c.description}
                                </p>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── SECTION: FEATURES ───────────────────────────────────────────────────────

function Features() {
    return (
        <section className="relative py-56 md:py-64 overflow-hidden border-t border-[var(--border)]">
            <div className="absolute inset-0 animated-gradient-bg opacity-60" />

            <div className="container max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center mb-28 md:mb-36"
                >
                    <span className="text-[11px] tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold">
                        features
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter">
                        built different.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20px' }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            className="group flex items-center gap-6 border border-[var(--border)] rounded-sm px-7 py-7 hover:border-[var(--fg)] transition-colors duration-400"
                        >
                            <span className="text-xl font-mono text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors w-6 text-center flex-shrink-0">
                                {f.icon}
                            </span>
                            <span className="text-sm font-semibold lowercase tracking-wide">
                                {f.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex justify-center mt-28"
                >
                    <GooglePlayBadge />
                </motion.div>
            </div>
        </section>
    );
}

// ─── PAGE FOOTER ─────────────────────────────────────────────────────────────

function PageFooter() {
    return (
        <section className="border-t border-[var(--border)] py-12">
            <div className="container max-w-3xl mx-auto px-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center sm:items-start gap-1">
                        <p className="text-xs text-[var(--muted)] tracking-wider lowercase">
                            &copy; 2026 akashic dreams. all rights reserved.
                        </p>
                        <p className="text-xs text-[var(--muted)] tracking-wider">
                            built in romania 🇷🇴
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/unrested/privacy"
                            className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors lowercase tracking-wider font-semibold"
                        >
                            privacy policy
                        </Link>
                        <a
                            href="mailto:admin@akashicdreams.dev"
                            className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors lowercase tracking-wider font-semibold"
                        >
                            contact
                        </a>
                        <Link
                            href="/"
                            className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors lowercase tracking-wider font-semibold"
                        >
                            akashicdreams.dev
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── PAGE ROOT ───────────────────────────────────────────────────────────────

export function UnrestedPageClient() {
    return (
        <div className="min-h-screen bg-[var(--bg)] overflow-hidden">
            <Hero />
            <HowItWorks />
            <Challenges />
            <Features />
            <PageFooter />
        </div>
    );
}
