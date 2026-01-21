'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface AboutData {
    name: string;
    age: string;
    bio: string;
}

export default function AboutSection() {
    const [data, setData] = useState<AboutData | null>(null);

    useEffect(() => {
        supabase.from('about').select('*').single().then(({ data }) => {
            if (data) setData(data);
        });
    }, []);

    if (!data) return null;

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="py-24 px-5 max-w-3xl mx-auto text-center"
        >
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold font-mono mb-12"
            >
                <span className="text-purple-400">&lt;</span>
                {' '}aboutMe{' '}
                <span className="text-purple-400">/&gt;</span>
            </motion.h2>

            {/* Profile Photo */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 relative inline-block"
            >
                {/* Animated ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-spin opacity-60" style={{ animationDuration: '4s' }} />
                <img
                    src="/profile.jpg"
                    alt={data.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-[#0d0d1a] relative z-10"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
            </motion.div>

            {/* Bio */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto"
            >
                Hey! I&apos;m <span className="text-purple-400 font-semibold">{data.name}</span>, {data.bio}
            </motion.p>

            {/* Download CV Button */}
            <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg text-gray-400 hover:text-white hover:border-purple-500/50 transition-all text-sm"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
            </motion.a>
        </motion.section>
    );
}

