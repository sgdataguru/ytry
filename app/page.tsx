/**
 * @file page.tsx
 * @description Landing page for Ytrylabs - AI-powered innovation platform
 * @static Pre-rendered at build time
 * 
 * @component
 * @category Pages/Marketing
 * 
 * @description
 * A static landing page showcasing Ytrylabs capabilities including:
 * - AI-powered insights and recommendations
 * - Rapid experimentation tools
 * - Scaling successful initiatives
 * - Pipeline acceleration
 * - Decision speed optimization
 */

import { 
  Navbar, 
  Hero, 
  Features, 
  HowItWorks, 
  Philosophy, 
  Stats, 
  CTA, 
  Footer 
} from '@/app/components/landing';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Philosophy />
      <CTA />
      <Footer />
    </main>
  );
}
