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
            className="py-32 px-5 max-w-3xl mx-auto"
        >
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-bold font-mono text-center mb-12"
            >
                <span className="text-purple-400">&lt;</span>
                {' '}AboutMe{' '}
                <span className="text-purple-400">/&gt;</span>
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#1a1a2e]/50 border border-white/10 rounded-xl p-8 text-center backdrop-blur-sm"
            >
                <p className="text-gray-300 leading-relaxed mb-6">
                    Hey! I&apos;m <span className="text-purple-400 font-semibold">{data.name}</span>, {data.bio}
                </p>

                <a
                    href="/cv.pdf"
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] hover:bg-[#252540] border border-white/20 text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CV
                </a>
            </motion.div>
        </motion.section>
    );
}
