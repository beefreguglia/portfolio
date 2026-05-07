'use client';

import { AboutSection } from '@/app/about-section';
import { Footer } from '@/app/footer';
import { Header } from '@/app/header';
import { HeroSection } from '@/app/hero-section';
import { ProjectsSection } from '@/app/projects-section';
import { StackSection } from '@/app/stack-section';

export default function Page() {
  return (
    <div className="min-h-dvh bg-black text-gray-200">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
