'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BorderBeam } from "@/components/ui/border-beam";

interface AboutData {
    name: string;
    age: string;
    bio: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

const photoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

export default function AboutSection() {
    const [data, setData] = useState<AboutData | null>(null);

    useEffect(() => {
        supabase.from('about').select('*').single().then(({ data }) => {
            if (data) setData(data);
        });
    }, []);

    if (!data) return null;

    return (
        <section className="py-24 px-5 max-w-3xl mx-auto text-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="flex flex-col items-center"
            >
                
                <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-bold font-mono mb-12"
                >
                    <span className="text-purple-400">&lt;</span>
                    {' '}aboutMe{' '}
                    <span className="text-purple-400">/&gt;</span>
                </motion.h2>

                
                <motion.div
                    variants={photoVariants}
                    className="mb-8 relative inline-block rounded-full p-1"
                >
                    <img
                        src="/profile.jpg"
                        alt={data.name}
                        className="w-28 h-28 rounded-full object-cover border-4 border-[#0d0d1a] relative z-10 bg-[#0d0d1a]"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />

                    
                    <BorderBeam size={80} duration={3} delay={0} colorFrom="#a855f7" colorTo="#3b82f6" />
                    <BorderBeam size={80} duration={3} delay={1.5} colorFrom="#ec4899" colorTo="#a855f7" reverse />
                </motion.div>

                
                <motion.p
                    variants={itemVariants}
                    className="text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto"
                >
                    Hey! I&apos;m <span className="text-purple-400 font-semibold">{data.name}</span>, {data.bio}
                </motion.p>

                
                <motion.a
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    href="/cv.pdf"
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors text-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CV
                </motion.a>
            </motion.div>
        </section>
    );
}
