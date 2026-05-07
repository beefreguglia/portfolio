import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-white/10 border-t bg-black py-12 text-center">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between px-6 md:flex-row">
        <p className="mb-4 font-mono text-gray-500 text-xs md:mb-0">
          Desenvolvido por Bernardo Freguglia. © {new Date().getFullYear()}
        </p>
        <div className="flex space-x-6">
          <Button variant="ghost" className="h-8 px-2">
            /linkedin
          </Button>
          <Button variant="ghost" className="h-8 px-2">
            /github
          </Button>
        </div>
      </div>
    </footer>
  );
}
