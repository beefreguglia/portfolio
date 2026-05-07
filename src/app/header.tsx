import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'INÍCIO', color: 'hover:text-cyan-400' },
    { href: '#about', label: 'SOBRE', color: 'hover:text-purple-400' },
    { href: '#stack', label: 'STACK', color: 'hover:text-emerald-400' },
    { href: '#projects', label: 'PROJETOS', color: 'hover:text-cyan-400' },
  ];

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'top-4 right-4 left-4 mx-auto max-w-7xl rounded-full border border-white/10 bg-black/80 px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,1)] backdrop-blur-md'
          : 'top-0 left-0 w-full border-transparent border-b bg-transparent px-8 py-6'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="font-bold font-mono text-emerald-400 text-xl tracking-tighter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
          {'<'}
          <span className="text-white">b.freguglia </span>
          {'/>'}
        </div>

        <nav className="hidden space-x-8 font-mono text-gray-400 text-sm md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors ${link.color}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="text-emerald-500 transition-colors hover:text-emerald-400"
              >
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-white/10 bg-black/95 text-white"
            >
              <SheetHeader className="flex justify-center border-gray-400 border-b">
                <SheetTitle className="mt-2 text-left font-mono text-emerald-400">
                  {'<'}Menu {'/>'}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-6 px-4 font-mono">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-400 text-lg transition-all hover:text-emerald-400"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
