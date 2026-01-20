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
                <p className="text-gray-300 leading-relaxed">
                    Hey! I&apos;m <span className="text-purple-400 font-semibold">{data.name}</span>, {data.bio}
                </p>
            </motion.div>
        </motion.section>
    );
}
