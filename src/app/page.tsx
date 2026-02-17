'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import IDEWindow from '@/components/IDEWindow';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import TimelineSection from '@/components/TimelineSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ConnectSection from '@/components/ConnectSection';
import recentlyPlayedSection from '@/components/recentlyPlayedSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';
import RecentlyPlayedSection from '@/components/recentlyPlayedSection';

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-[#0f0f17] overflow-x-hidden">
        
        <div className="fixed top-1/4 -left-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed top-1/2 -right-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        
        <m.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex flex-col items-center justify-center px-5 relative z-10"
        >
          <IDEWindow />
          <ScrollIndicator />
        </m.section>
        <AboutSection />
        <SkillsSection />
        <TimelineSection />
        <ProjectsSection />
        <TestimonialsSection />
        <RecentlyPlayedSection /> 
        <ConnectSection />
        <ContactSection />
        <Footer />
      </main>
    </LazyMotion>
  );
}
