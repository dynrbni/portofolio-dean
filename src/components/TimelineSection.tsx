'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface TimelineItem {
    id: string;
    year: string;
    title: string;
    description: string;
}

export default function TimelineSection() {
    const [timeline, setTimeline] = useState<TimelineItem[]>([]);

    useEffect(() => {
        supabase.from('timeline').select('*').order('sort_order').then(({ data }) => {
            if (data) {
                // Filter out empty entries (no title or year)
                const filtered = data.filter(item => item.title && item.title.trim() !== '' && item.year && item.year.trim() !== '');
                setTimeline(filtered);
            }
        });
    }, []);

    if (timeline.length === 0) return null;

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="py-24 px-5 max-w-3xl mx-auto text-center"
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold font-mono mb-12"
            >
                <span className="text-purple-400">&lt;</span>
                {' '}journeyOfCode{' '}
                <span className="text-purple-400">/&gt;</span>
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-4"
            >
                {timeline.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 text-left">
                        <div className="text-purple-400 font-mono text-sm shrink-0 whitespace-nowrap w-24 text-right">
                            {item.year}
                        </div>
                        <div className="w-2 h-2 bg-purple-400/50 rounded-full shrink-0 mt-1.5" />
                        <div className="flex-1">
                            <span className="text-white">{item.title}</span>
                            {item.description && (
                                <span className="text-gray-500 text-sm ml-2">— {item.description}</span>
                            )}
                        </div>
                    </div>
                ))}
            </motion.div>
        </motion.section>
    );
}
