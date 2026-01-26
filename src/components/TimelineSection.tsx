'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface TimelineItem {
    id: string;
    year: string;
    title: string;
    description: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2,
        },
    },
};

const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

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
        <section className="py-24 px-5 max-w-3xl mx-auto text-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                {/* Title */}
                <motion.h2
                    variants={titleVariants}
                    className="text-2xl font-bold font-mono mb-12"
                >
                    <span className="text-purple-400">&lt;</span>
                    {' '}journeyOfCode{' '}
                    <span className="text-purple-400">/&gt;</span>
                </motion.h2>

                {/* Timeline Items */}
                <div className="flex flex-col gap-4">
                    {timeline.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="flex items-start gap-4 text-left group"
                        >
                            <div className="text-purple-400 font-mono text-sm shrink-0 whitespace-nowrap w-24 text-right group-hover:text-purple-300 transition-colors">
                                {item.year}
                            </div>
                            <div className="w-2 h-2 bg-purple-400/50 rounded-full shrink-0 mt-1.5 group-hover:bg-purple-400 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all" />
                            <div className="flex-1">
                                <span className="text-white group-hover:text-purple-100 transition-colors">{item.title}</span>
                                {item.description && (
                                    <span className="text-gray-500 text-sm ml-2">— {item.description}</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
