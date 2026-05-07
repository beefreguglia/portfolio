type ButtonVariant = 'default' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  className = '',
  href,
  ...props
}) => {
  const baseStyle =
    'inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4 font-mono uppercase tracking-wider';
  const variants: Record<ButtonVariant, string> = {
    default:
      'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] border border-emerald-400/50',
    outline:
      'border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
  };

  const classes = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
