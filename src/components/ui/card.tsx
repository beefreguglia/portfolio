interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`rounded-xl border border-[#222] bg-[#0a0a0a] text-gray-200 shadow-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_8px_30px_rgba(6,182,212,0.1)] ${className}`}
    {...props}
  >
    {children}
  </div>
);
