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
        description: 'pick a time, choose your challenge types, and set the difficulty. everything configured once and ready every morning.',
    },
    {
        number: '02',
        title: 'wake up hard',
        description: 'the alarm fires and keeps going. the only way to stop it is to complete your selected challenges. no snooze. no shortcuts.',
    },
    {
        number: '03',
        title: 'earn your streak',
        description: 'complete every morning and your streak grows. miss the window — fail the challenge — and it resets. every day is earned.',
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
        description: 'answer 3 questions correctly. wrong answer — try again.',
    },
];

const features = [
    { icon: '✕', label: 'no snooze. ever.' },
    { icon: '◈', label: '1–3 challenges per alarm' },
    { icon: '▦', label: 'streak tracking + calendar history' },
    { icon: '▲', label: 'volume ramp — starts quiet, gets louder' },
    { icon: '~', label: 'vibration support' },
    { icon: '⊘', label: '100% offline' },
];

const permissions = [
    {
        name: 'SCHEDULE_EXACT_ALARM / USE_EXACT_ALARM',
        reason: 'Required to fire your alarm at the exact time you set. Without this, Android may delay or batch alarms, causing them to fire late.',
    },
    {
        name: 'WAKE_LOCK',
        reason: 'Required to wake the screen and keep the CPU running when the alarm fires, so the challenge screen can appear even if your phone was asleep.',
    },
    {
        name: 'FOREGROUND_SERVICE / FOREGROUND_SERVICE_MEDIA_PLAYBACK',
        reason: 'Required to play the alarm sound while the app is in the background. Android requires this service type to play audio from a background process.',
    },
    {
        name: 'VIBRATE',
        reason: 'Required to vibrate the device when an alarm fires.',
    },
    {
        name: 'RECEIVE_BOOT_COMPLETED',
        reason: 'Required to re-schedule your alarms after the device is restarted. Without this, all alarms would be lost every time you reboot.',
    },
    {
        name: 'POST_NOTIFICATIONS',
        reason: 'Required on Android 13+ to display the alarm notification that appears when the alarm fires.',
    },
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
                <div className="inline-flex items-center gap-4 px-5 py-3 rounded-xl border-2 border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-500 group">
                    {/* Google Play logo (simplified SVG) */}
                    <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" fill="none" aria-hidden>
                        <path
                            d="M3 2.8v18.4c0 .9 1 1.4 1.7.9l16-9.2a1 1 0 0 0 0-1.8L4.7 1.9C4 1.4 3 1.9 3 2.8z"
                            className="fill-[var(--fg)] group-hover:fill-[var(--bg)] transition-colors duration-500"
                        />
                    </svg>
                    <div className="flex flex-col text-left leading-tight">
                        <span className="text-[9px] tracking-[0.25em] text-[var(--muted)] group-hover:text-[var(--bg)] transition-colors duration-500 uppercase font-semibold">
                            get it on
                        </span>
                        <span className="text-xl font-bold tracking-tight">
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

            <div className="container max-w-7xl mx-auto px-6 relative z-10 py-32">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

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
                            className="text-[11px] tracking-[0.4em] text-[var(--muted)] mb-6 lowercase font-semibold"
                        >
                            alarm app · android
                        </motion.div>

                        <h1 className="text-7xl md:text-9xl font-bold lowercase tracking-tighter leading-[0.85] mb-6">
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
                            className="text-2xl md:text-3xl font-bold text-[var(--fg)] mb-4 lowercase tracking-tight max-w-lg"
                        >
                            the alarm that earns your morning.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-base md:text-lg text-[var(--muted)] mb-12 lowercase leading-relaxed max-w-md"
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
        <section className="relative py-44 md:py-52 overflow-hidden border-t border-[var(--border)]">
            <div className="absolute inset-0 animated-gradient-bg" />

            <div className="container max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="flex flex-col items-center text-center mb-28"
                >
                    <span className="text-[11px] tracking-[0.4em] text-[var(--muted)] mb-7 lowercase font-semibold">
                        how it works
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold lowercase tracking-tighter">
                        three steps. no mercy.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
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
                            <div className="w-14 h-14 rounded-full border-2 border-[var(--border)] group-hover:border-[var(--fg)] transition-colors duration-500 flex items-center justify-center mb-8 bg-[var(--bg)] relative z-10 flex-shrink-0">
                                <span className="text-xs font-mono font-bold text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors">
                                    {step.number}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold lowercase tracking-tight mb-4">
                                {step.title}
                            </h3>
                            <p className="text-sm text-[var(--muted)] leading-relaxed lowercase">
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
        <section className="relative py-44 md:py-52 overflow-hidden border-t border-[var(--border)]">
            <FloatingParticles count={12} minSize={1} maxSize={2} />

            <div className="container max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="flex flex-col items-center text-center mb-28"
                >
                    <span className="text-[11px] tracking-[0.4em] text-[var(--muted)] mb-7 lowercase font-semibold">
                        the challenges
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold lowercase tracking-tighter mb-8">
                        six ways to wake up.
                    </h2>
                    <p className="text-base text-[var(--muted)] lowercase max-w-md leading-relaxed">
                        pick one, two, or three per alarm. the more you stack, the harder the morning.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {challenges.map((c, i) => (
                        <motion.div
                            key={c.name}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.5, delay: i * 0.07 }}
                            className="group relative border border-[var(--border)] rounded-sm p-8 hover:border-[var(--fg)] transition-all duration-500 overflow-hidden card-glow"
                        >
                            {/* Ghost number background */}
                            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-[6rem] font-bold text-[var(--fg)] opacity-[0.025] leading-none font-mono select-none pointer-events-none">
                                {String(i + 1).padStart(2, '0')}
                            </span>

                            <div className="relative z-10">
                                <div className="mb-5 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <c.icon />
                                </div>
                                <h3 className="text-lg font-bold lowercase tracking-tight mb-3">
                                    {c.name}
                                </h3>
                                <p className="text-sm text-[var(--muted)] leading-relaxed lowercase">
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
        <section className="relative py-32 overflow-hidden border-t border-[var(--border)]">
            <div className="absolute inset-0 animated-gradient-bg opacity-60" />

            <div className="container max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center mb-20"
                >
                    <span className="text-[11px] tracking-[0.4em] text-[var(--muted)] mb-7 lowercase font-semibold">
                        features
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter">
                        built different.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20px' }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            className="group flex items-center gap-5 border border-[var(--border)] rounded-sm px-6 py-5 hover:border-[var(--fg)] transition-colors duration-400"
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
                    className="flex justify-center mt-20"
                >
                    <GooglePlayBadge />
                </motion.div>
            </div>
        </section>
    );
}

// ─── SECTION: PRIVACY POLICY ─────────────────────────────────────────────────

function PrivacyPolicy() {
    return (
        <section
            id="privacy"
            className="relative py-44 md:py-52 border-t border-[var(--border)] scroll-mt-20"
        >
            <div className="container max-w-3xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <span className="text-[11px] tracking-[0.4em] text-[var(--muted)] lowercase font-semibold block mb-7">
                        legal
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter mb-6">
                        privacy policy
                    </h2>
                    <p className="text-sm text-[var(--muted)] lowercase">
                        last updated: may 2026
                    </p>
                </motion.div>

                <div className="prose-unrested">
                    <PrivacyBlock title="1. introduction">
                        This Privacy Policy describes how Akashic Dreams ("we", "us", or "our") handles information in connection with the Unrested alarm application ("the App") available on Google Play. By using the App, you agree to the practices described in this policy. If you do not agree, please do not use the App.
                    </PrivacyBlock>

                    <PrivacyBlock title="2. information we collect">
                        <strong>We collect no personal information whatsoever.</strong>
                        <br /><br />
                        Unrested does not ask for your name, email address, phone number, location, or any other personally identifiable information. No account or registration is required to use the App. You are completely anonymous to us.
                    </PrivacyBlock>

                    <PrivacyBlock title="3. data stored on your device">
                        The App stores the following data locally on your device only:
                        <ul>
                            <li>Your configured alarms (times, challenge types, difficulty settings)</li>
                            <li>Your streak history and daily completion records</li>
                            <li>Your challenge preferences and app settings</li>
                        </ul>
                        This data never leaves your device. It is not transmitted to us or to any third party. It is not stored on any server. Uninstalling the App removes all of this data permanently.
                    </PrivacyBlock>

                    <PrivacyBlock title="4. analytics, crash reporting & third-party sdks">
                        Unrested contains <strong>no analytics software, no crash reporting tools, and no third-party SDKs that collect or transmit data</strong>. We do not use Google Analytics, Firebase, Sentry, Mixpanel, Facebook SDK, or any equivalent service. No data about your usage of the App is ever sent anywhere.
                    </PrivacyBlock>

                    <PrivacyBlock title="5. internet access">
                        Unrested does not require an internet connection and does not use the internet for any purpose. The App operates entirely offline. No network requests are made at any time.
                    </PrivacyBlock>

                    <PrivacyBlock title="6. android permissions">
                        The App requests the following Android permissions. All permissions are used exclusively for their stated purpose and for no other reason:
                        <br /><br />
                        {permissions.map((p) => (
                            <div key={p.name} className="mb-6">
                                <span className="font-mono text-[11px] tracking-wide text-[var(--fg)] block mb-1 opacity-80">
                                    {p.name}
                                </span>
                                <span className="text-[var(--muted)] text-sm leading-relaxed">
                                    {p.reason}
                                </span>
                            </div>
                        ))}
                        No permission is used to collect, transmit, or store any personal data.
                    </PrivacyBlock>

                    <PrivacyBlock title="7. data sharing with third parties">
                        We do not share, sell, rent, trade, or otherwise transfer any data to third parties. There is no data to share — we do not collect any.
                    </PrivacyBlock>

                    <PrivacyBlock title="8. children's privacy">
                        The App does not knowingly collect any information from children under the age of 13. As Unrested collects no personal data from any user of any age, it is compliant with children's privacy regulations including COPPA. Parents and guardians may contact us at any time with questions.
                    </PrivacyBlock>

                    <PrivacyBlock title="9. data security">
                        Since all data is stored locally on your device and no data is transmitted or collected by us, the security of your App data depends on your device's own security features (screen lock, encryption, etc.). We have no access to your data and therefore cannot be the source of a data breach.
                    </PrivacyBlock>

                    <PrivacyBlock title="10. changes to this policy">
                        If we ever change this Privacy Policy, we will update the "last updated" date at the top of this page. Any significant changes will also be noted in the App's Play Store listing. We encourage you to review this policy periodically. Continued use of the App after changes constitutes your acceptance of the updated policy.
                    </PrivacyBlock>

                    <PrivacyBlock title="11. contact us" last>
                        If you have any questions, concerns, or requests regarding this Privacy Policy or the App, please contact us at:
                        <br /><br />
                        <a
                            href="mailto:admin@akashicdreams.dev"
                            className="text-[var(--fg)] hover:opacity-70 transition-opacity underline underline-offset-4 decoration-[var(--border)]"
                        >
                            admin@akashicdreams.dev
                        </a>
                        <br /><br />
                        <span className="text-[var(--muted)]">Akashic Dreams — sângeorz-băi, romania</span>
                    </PrivacyBlock>
                </div>
            </div>
        </section>
    );
}

function PrivacyBlock({
    title,
    children,
    last = false,
}: {
    title: string;
    children: React.ReactNode;
    last?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5 }}
            className={`pb-10 ${last ? '' : 'mb-10 border-b border-[var(--border)]'}`}
        >
            <h3 className="text-base font-bold lowercase tracking-tight mb-5 text-[var(--fg)]">
                {title}
            </h3>
            <div className="text-sm text-[var(--muted)] leading-relaxed lowercase">
                {children}
            </div>
        </motion.div>
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
                        <a
                            href="#privacy"
                            className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors lowercase tracking-wider font-semibold"
                        >
                            privacy policy
                        </a>
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
            <PrivacyPolicy />
            <PageFooter />
        </div>
    );
}
