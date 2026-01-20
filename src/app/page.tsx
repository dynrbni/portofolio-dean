'use client';

import { motion } from 'framer-motion';
import IDEWindow from '@/components/IDEWindow';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import TimelineSection from '@/components/TimelineSection';
import ProjectsSection from '@/components/ProjectsSection';
import ConnectSection from '@/components/ConnectSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f17] overflow-x-hidden">
      {/* Subtle gradient orbs */}
      <div className="fixed top-1/4 -left-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 -right-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-center px-5 relative z-10"
      >
        <IDEWindow />
        <ScrollIndicator />
      </motion.section>

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Connect Section */}
      <ConnectSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
