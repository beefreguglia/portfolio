type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    secondary: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    destructive: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    outline: 'text-gray-400 border-gray-700',
  };
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono font-semibold text-[10px] transition-colors focus:outline-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
