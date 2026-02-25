'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { AsciiArtFigure } from '@/components/ui/ascii-figure';

const values = [
    {
        number: '01',
        title: 'craft over shortcuts',
        description: 'every line of code, every frame, every pixel — intentional. we don\'t rush to ship, we refine until it feels right.',
    },
    {
        number: '02',
        title: 'simplicity as art',
        description: 'the best solutions feel effortless. we strip away complexity until only the essential remains.',
    },
    {
        number: '03',
        title: 'consciousness in creation',
        description: 'we approach every project with presence and awareness. technology is a tool for expanding what\'s possible.',
    },
    {
        number: '04',
        title: 'stories that resonate',
        description: 'whether through code or camera, we build narratives that connect with people on a deeper level.',
    },
];

const team = [
    {
        name: 'șorecău adrian-vasile',
        role: 'photographer',
        number: '01',
        image: '/images/team/photographer.png',
    },
    {
        name: 'șorecău adrian-vasile',
        role: 'software developer',
        number: '02',
        image: '/images/team/software_developer.png',
    },
    {
        name: 'șorecău adrian-vasile',
        role: 'administrator',
        number: '03',
        image: '/images/team/admin.png',
    },
];

function SectionDivider() {
    return <div className="section-divider" />;
}

export function AboutPageClient() {
    return (
        <div className="min-h-screen overflow-hidden">
            {/* ─── HERO ─── */}
            <section className="relative min-h-screen flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                    <MatrixRain opacity={0.06} speed={0.6} density={0.35} />
                </div>

                <FloatingParticles count={25} minSize={1} maxSize={4} />

                <motion.div
                    className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.15]">
                    <AsciiArtFigure shape="circle" rows={35} cols={40} animSpeed={1500} />
                </div>

                <div className="relative z-10 px-6 pt-32 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col items-center text-center"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xs tracking-[0.4em] text-[var(--muted)] mb-8 lowercase font-semibold"
                        >
                            our story
                        </motion.span>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold lowercase tracking-tighter mb-8">
                            <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="block"
                            >
                                akashic
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="block"
                            >
                                dreams
                            </motion.span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-lg md:text-xl text-[var(--muted)] lowercase max-w-lg leading-relaxed"
                        >
                            where code meets consciousness
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <SectionDivider />

            {/* ─── WHAT IS AKASHIC ─── */}
            <section className="relative py-44 md:py-56">
                <div className="absolute inset-0 animated-gradient-bg" />
                <div className="relative z-10 flex justify-center px-8 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center"
                        style={{ maxWidth: '56rem' }}
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold block mb-10">
                            the meaning
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter mb-16">
                            what is akashic?
                        </h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-2xl lowercase leading-relaxed text-[var(--muted)] mb-10"
                        >
                            in ancient sanskrit, &ldquo;akasha&rdquo; means the ether — the fundamental substance from which all things emerge. the akashic records are believed to be an infinite library of every thought, event, and possibility that has ever existed or will ever exist.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-2xl lowercase leading-relaxed text-[var(--fg)] font-light"
                        >
                            we chose this name because we believe creation is not just technical — it&apos;s spiritual. every project begins as an idea floating in the ether, and our job is to pull it into reality with code, design, and intention.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <SectionDivider />

            {/* ─── WHO WE ARE ─── */}
            <section className="relative py-44 md:py-56 overflow-hidden">
                <div className="absolute inset-0">
                    <MatrixRain opacity={0.03} speed={0.4} density={0.2} />
                </div>
                <FloatingParticles count={12} minSize={1} maxSize={3} />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]">
                    <AsciiArtFigure shape="diamond" rows={25} cols={30} animSpeed={2500} />
                </div>

                <div className="relative z-10 flex justify-center px-8 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center"
                        style={{ maxWidth: '56rem' }}
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold block mb-10">
                            who we are
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter mb-16">
                            a laptop and a camera
                        </h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-2xl lowercase leading-relaxed text-[var(--muted)] mb-10"
                        >
                            akashic dreams is a small creative and technology studio. we live at the intersection of software engineering and visual storytelling — building digital systems that work beautifully and capturing moments that tell real stories.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-2xl lowercase leading-relaxed text-[var(--fg)] font-light"
                        >
                            we don&apos;t follow trends. we build with care, ship with confidence, and believe that the best work comes from a place of calm focus rather than chaotic hustle. sometimes we&apos;re writing code. sometimes we&apos;re behind a camera. either way, we create things that feel simple and a bit magical.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <SectionDivider />

            {/* ─── THE TEAM ─── */}
            <section className="relative py-44 md:py-56 overflow-hidden">
                <div className="absolute inset-0 animated-gradient-bg" />
                <FloatingParticles count={10} minSize={1} maxSize={3} />

                {/* Subtle matrix behind team */}
                <div className="absolute inset-0 opacity-50">
                    <MatrixRain opacity={0.03} speed={0.3} density={0.15} />
                </div>

                <div className="relative z-10 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center mb-28 md:mb-36"
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold mb-6">
                            the people
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter">
                            the team
                        </h2>
                    </motion.div>

                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full" style={{ maxWidth: '72rem' }}>
                            {team.map((member, i) => (
                                <motion.div
                                    key={member.number}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.15 }}
                                    className="group relative border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--fg)] transition-all duration-500 card-glow"
                                >
                                    {/* Avatar area */}
                                    <div className="aspect-[3/4] relative overflow-hidden">
                                        {/* Radial glow behind avatar */}
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,255,255,0.06) 0%, transparent 70%)',
                                            }}
                                        />

                                        {/* Ghost number */}
                                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-bold text-[var(--fg)] opacity-[0.03] leading-none font-mono select-none pointer-events-none">
                                            {member.number}
                                        </span>

                                        {/* Avatar image */}
                                        <motion.div
                                            className="absolute inset-0 flex items-end justify-center"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                        >
                                            <Image
                                                src={member.image}
                                                alt={`${member.name} — ${member.role}`}
                                                fill
                                                className="object-contain object-bottom p-4 drop-shadow-[0_0_40px_rgba(255,255,255,0.08)] group-hover:drop-shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all duration-500"
                                            />
                                        </motion.div>

                                        {/* Bottom gradient fade */}
                                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />
                                    </div>

                                    {/* Info */}
                                    <div className="p-8 md:p-10 text-center relative">
                                        <motion.h3
                                            className="text-2xl md:text-3xl font-bold lowercase tracking-tighter mb-2"
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                        >
                                            {member.role}
                                        </motion.h3>
                                        <p className="text-sm text-[var(--muted)] lowercase tracking-wider font-semibold">
                                            {member.name}
                                        </p>
                                    </div>

                                    {/* Hover accent */}
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* ─── THE PHILOSOPHY ─── */}
            <section className="relative py-44 md:py-56 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-[0.03]">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                        className="w-full h-full border border-[var(--fg)] rounded-[40%]"
                    />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-[0.02]">
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                        className="w-full h-full border border-[var(--fg)] rounded-[35%]"
                    />
                </div>

                <div className="relative z-10 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center mb-28 md:mb-36"
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold mb-6">
                            how we think
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter">
                            our values
                        </h2>
                    </motion.div>

                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full" style={{ maxWidth: '64rem' }}>
                            {values.map((value, i) => (
                                <motion.div
                                    key={value.number}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-30px' }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="group relative border border-[var(--border)] rounded-sm p-10 md:p-12 hover:border-[var(--fg)] transition-all duration-500 overflow-hidden card-glow text-center"
                                >
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7rem] font-bold text-[var(--fg)] opacity-[0.03] leading-none font-mono select-none pointer-events-none">
                                        {value.number}
                                    </span>

                                    <div className="relative z-10">
                                        <span className="text-xs font-mono text-[var(--muted)] tracking-wider font-semibold block mb-5">
                                            {value.number}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold lowercase tracking-tight mb-5">
                                            {value.title}
                                        </h3>
                                        <p className="text-sm text-[var(--muted)] lowercase leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full h-px bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* ─── THE DUALITY ─── */}
            <section className="relative py-44 md:py-56 overflow-hidden">
                <FloatingParticles count={10} minSize={1} maxSize={3} />

                <div className="relative z-10 flex justify-center px-8 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center"
                        style={{ maxWidth: '56rem' }}
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold block mb-10">
                            two pillars
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter mb-20">
                            software & visuals
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 text-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <span className="text-xs font-mono text-[var(--muted)] tracking-wider font-semibold block mb-5">01</span>
                                <h3 className="text-2xl md:text-3xl font-bold lowercase tracking-tight mb-6">
                                    software
                                </h3>
                                <p className="text-base text-[var(--muted)] lowercase leading-relaxed">
                                    we build websites, mobile apps, and digital systems from the ground up. clean architecture, modern frameworks, and a relentless focus on performance. every project is treated as a craft — from the first commit to the final deploy.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <span className="text-xs font-mono text-[var(--muted)] tracking-wider font-semibold block mb-5">02</span>
                                <h3 className="text-2xl md:text-3xl font-bold lowercase tracking-tight mb-6">
                                    visuals
                                </h3>
                                <p className="text-base text-[var(--muted)] lowercase leading-relaxed">
                                    photography, videography, and brand identity. we capture real moments and shape visual languages that communicate who you are. from events to campaigns, every image and frame is carefully composed and edited.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <SectionDivider />

            {/* ─── CTA ─── */}
            <section className="relative py-44 md:py-56 overflow-hidden">
                <div className="absolute inset-0">
                    <MatrixRain opacity={0.04} speed={0.5} density={0.25} />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.1]">
                    <AsciiArtFigure shape="hexagon" rows={20} cols={24} animSpeed={2000} />
                </div>

                <div className="relative z-10 flex justify-center px-8 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center flex flex-col items-center"
                    >
                        <span className="text-xs tracking-[0.4em] text-[var(--muted)] lowercase font-semibold block mb-10">
                            let&apos;s create
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold lowercase tracking-tighter mb-10">
                            ready to build something?
                        </h2>
                        <p className="text-lg text-[var(--muted)] lowercase mb-14 max-w-md">
                            whether it&apos;s a website, an app, a brand, or a story — we&apos;re here to make it happen.
                        </p>
                        <Link
                            href="/contact"
                            className="group relative inline-block px-16 py-6 text-lg lowercase tracking-wider font-bold rounded-sm overflow-hidden transition-all duration-500 border-2 border-[var(--fg)]"
                        >
                            <span className="relative z-10 group-hover:text-[var(--bg)] transition-colors duration-500">
                                get in touch
                            </span>
                            <div className="absolute inset-0 bg-[var(--fg)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <div className="h-20" aria-hidden="true" />
        </div>
    );
}
