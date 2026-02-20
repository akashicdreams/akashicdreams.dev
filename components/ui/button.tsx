import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'outline' | 'solid';
}

export function Button({ children, variant = 'outline', className = '', ...props }: ButtonProps) {
    const baseStyles = 'px-12 py-6 text-base lowercase tracking-wider transition-all rounded-sm';
    const variantStyles = variant === 'outline'
        ? 'border border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]'
        : 'bg-[var(--fg)] text-[var(--bg)] hover:opacity-80';

    return (
        <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
            {children}
        </button>
    );
}
