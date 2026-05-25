'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// ─── DATA ────────────────────────────────────────────────────────────────────

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

// ─── PRIVACY BLOCK ───────────────────────────────────────────────────────────

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
            className={`pb-14 ${last ? '' : 'mb-14 border-b border-[var(--border)]'}`}
        >
            <h3 className="text-base font-bold lowercase tracking-tight mb-6 text-[var(--fg)]">
                {title}
            </h3>
            <div className="text-sm text-[var(--muted)] leading-loose lowercase">
                {children}
            </div>
        </motion.div>
    );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export function UnrestedPrivacyClient() {
    return (
        <div className="min-h-screen bg-[var(--bg)]">
            {/* Back nav */}
            <div className="border-b border-[var(--border)]">
                <div className="container max-w-3xl mx-auto px-6 py-6">
                    <Link
                        href="/unrested"
                        className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors lowercase tracking-[0.2em] font-semibold"
                    >
                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden>
                            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        back to unrested
                    </Link>
                </div>
            </div>

            <div className="container max-w-3xl mx-auto px-6 py-28 md:py-40">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-28"
                >
                    <span className="text-[11px] tracking-[0.4em] text-[var(--muted)] lowercase font-semibold block mb-7">
                        legal
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold lowercase tracking-tighter mb-6">
                        privacy policy
                    </h1>
                    <p className="text-sm text-[var(--muted)] lowercase">
                        last updated: may 2026 &nbsp;&middot;&nbsp; unrested for android &nbsp;&middot;&nbsp; com.akashicdreams.unrested
                    </p>
                </motion.div>

                {/* Content */}
                <div>
                    <PrivacyBlock title="1. introduction">
                        This Privacy Policy describes how Akashic Dreams (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) handles information in connection with the Unrested alarm application (&ldquo;the App&rdquo;) available on Google Play. By using the App, you agree to the practices described in this policy. If you do not agree, please do not use the App.
                    </PrivacyBlock>

                    <PrivacyBlock title="2. information we collect">
                        <strong className="text-[var(--fg)]">we collect no personal information whatsoever.</strong>
                        <br /><br />
                        Unrested does not ask for your name, email address, phone number, location, or any other personally identifiable information. No account or registration is required to use the App. You are completely anonymous to us.
                    </PrivacyBlock>

                    <PrivacyBlock title="3. data stored on your device">
                        The App stores the following data locally on your device only:
                        <ul className="mt-4 space-y-2 list-none pl-0">
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--fg)] mt-0.5 flex-shrink-0">-</span>
                                <span>your configured alarms (times, challenge types, difficulty settings)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--fg)] mt-0.5 flex-shrink-0">-</span>
                                <span>your streak history and daily completion records</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--fg)] mt-0.5 flex-shrink-0">-</span>
                                <span>your challenge preferences and app settings</span>
                            </li>
                        </ul>
                        <br />
                        This data never leaves your device. It is not transmitted to us or to any third party. It is not stored on any server. Uninstalling the App removes all of this data permanently.
                    </PrivacyBlock>

                    <PrivacyBlock title="4. analytics, crash reporting & third-party sdks">
                        Unrested contains{' '}
                        <strong className="text-[var(--fg)]">no analytics software, no crash reporting tools, and no third-party SDKs that collect or transmit data</strong>.
                        We do not use Google Analytics, Firebase, Sentry, Mixpanel, Facebook SDK, or any equivalent service. No data about your usage of the App is ever sent anywhere.
                    </PrivacyBlock>

                    <PrivacyBlock title="5. internet access">
                        Unrested does not require an internet connection and does not use the internet for any purpose. The App operates entirely offline. No network requests are made at any time.
                    </PrivacyBlock>

                    <PrivacyBlock title="6. android permissions">
                        The App requests the following Android permissions. All permissions are used exclusively for their stated purpose and for no other reason:

                        <div className="mt-6 space-y-6">
                            {permissions.map((p) => (
                                <div key={p.name} className="border-l-2 border-[var(--border)] pl-4">
                                    <span className="font-mono text-[11px] tracking-wide text-[var(--fg)] block mb-1 opacity-90 not-lowercase">
                                        {p.name}
                                    </span>
                                    <span className="text-[var(--muted)] text-sm leading-relaxed">
                                        {p.reason}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <br />
                        No permission is used to collect, transmit, or store any personal data.
                    </PrivacyBlock>

                    <PrivacyBlock title="7. data sharing with third parties">
                        We do not share, sell, rent, trade, or otherwise transfer any data to third parties. There is no data to share - we do not collect any.
                    </PrivacyBlock>

                    <PrivacyBlock title="8. children's privacy">
                        The App does not knowingly collect any information from children under the age of 13. As Unrested collects no personal data from any user of any age, it is compliant with children&apos;s privacy regulations including COPPA. Parents and guardians may contact us at any time with questions.
                    </PrivacyBlock>

                    <PrivacyBlock title="9. data security">
                        Since all data is stored locally on your device and no data is transmitted or collected by us, the security of your App data depends on your device&apos;s own security features (screen lock, encryption, etc.). We have no access to your data and therefore cannot be the source of a data breach.
                    </PrivacyBlock>

                    <PrivacyBlock title="10. changes to this policy">
                        If we ever change this Privacy Policy, we will update the &ldquo;last updated&rdquo; date at the top of this page. Any significant changes will also be noted in the App&apos;s Play Store listing. We encourage you to review this policy periodically. Continued use of the App after changes constitutes your acceptance of the updated policy.
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
                        <span>Akashic Dreams &middot; sangeorz-bai, romania</span>
                    </PrivacyBlock>
                </div>

                {/* Footer */}
                <div className="border-t border-[var(--border)] pt-10 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        href="/unrested"
                        className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors lowercase tracking-wider font-semibold"
                    >
                        &larr; back to unrested
                    </Link>
                    <p className="text-[11px] text-[var(--muted)] tracking-wider lowercase">
                        &copy; 2026 akashic dreams. all rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
