'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ConnectData {
    github_username: string;
    contributions: string;
}

export default function ConnectSection() {
    const [data, setData] = useState<ConnectData | null>(null);

    useEffect(() => {
        supabase.from('connect').select('*').single().then(({ data }) => {
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
            className="py-24 px-5 max-w-4xl mx-auto text-center"
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold font-mono mb-10"
            >
                <span className="text-purple-400">&lt;</span>
                {' '}Connect{' '}
                <span className="text-purple-400">/&gt;</span>
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
            >
                <div className="bg-[#161b22] p-4 rounded-xl inline-block">
                    <img
                        src={`https://ghchart.rshah.org/22c55e/${data.github_username}`}
                        alt="GitHub Contributions"
                        className="w-full max-w-3xl mx-auto rounded-lg invert brightness-[0.85] hue-rotate-180"
                    />
                </div>
                <p className="text-gray-500 text-sm mt-3 font-mono">
                    <span className="text-green-400 font-semibold">{data.contributions}</span> contributions in the last year
                </p>
            </motion.div>
        </motion.section>
    );
}
