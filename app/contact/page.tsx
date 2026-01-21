import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata: Metadata = {
    title: 'contact',
    description: 'get in touch with akashic dreams.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen px-4" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div className="container max-w-2xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold lowercase mb-4">contact</h1>
                    <p className="text-lg text-[var(--muted)]">
                        let's build something together
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Contact info */}
                    <div>
                        <h2 className="text-sm lowercase tracking-wider mb-4 opacity-50">email</h2>
                        <a
                            href="mailto:admin@akashicdreams.dev"
                            className="text-lg hover:opacity-70 transition-opacity block mb-8"
                        >
                            admin@akashicdreams.dev
                        </a>

                        <h2 className="text-sm lowercase tracking-wider mb-4 opacity-50">phone</h2>
                        <a
                            href="tel:+40741963166"
                            className="text-lg hover:opacity-70 transition-opacity block mb-8"
                        >
                            +40 741 963 166
                        </a>

                        <h2 className="text-sm lowercase tracking-wider mb-4 opacity-50">social</h2>
                        <div className="space-y-2">
                            <a
                                href="https://www.linkedin.com/company/akashic-dreams/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:opacity-70 transition-opacity"
                            >
                                linkedIn
                            </a>
                            <a
                                href="https://www.instagram.com/akashicdreams.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:opacity-70 transition-opacity"
                            >
                                instagram
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=61586506872768"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block hover:opacity-70 transition-opacity"
                            >
                                facebook
                            </a>
                        </div>
                    </div>

                    {/* Contact form */}
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
