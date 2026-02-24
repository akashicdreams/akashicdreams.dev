export function Footer() {
    return (
        <footer className="border-t border-[var(--border)] relative overflow-hidden">
            <div
                className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
                style={{
                    background: 'linear-gradient(to right, transparent, var(--border), transparent)',
                }}
            />

            <div className="container py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4 px-6">
                <p className="text-xs text-[var(--muted)] tracking-wider">
                    &copy; {new Date().getFullYear()} akashic dreams
                </p>
                <p className="text-xs text-[var(--muted)] tracking-wider lowercase">
                    all rights reserved
                </p>
            </div>
        </footer>
    );
}
