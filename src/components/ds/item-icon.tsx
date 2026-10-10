import {
  BellRing,
  BookOpen,
  CalendarRange,
  DatabaseZap,
  Drama,
  Feather,
  Hourglass,
  Link2,
  type LucideIcon,
  MessageCircle,
  Palette,
  PawPrint,
  ScrollText,
  ShieldCheck,
  Sparkles,
  SquareKanban,
  Store,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  calendar: CalendarRange,
  hourglass: Hourglass,
  book: BookOpen,
  scroll: ScrollText,
  masks: Drama,
  store: Store,
  shield: ShieldCheck,
  feather: Feather,
  database: DatabaseZap,
  link: Link2,
  sparkles: Sparkles,
  bell: BellRing,
  paw: PawPrint,
  palette: Palette,
  message: MessageCircle,
  kanban: SquareKanban,
};

export function ItemIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? Sparkles;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.4} />;
}
