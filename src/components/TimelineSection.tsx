'use client';

import { motion, Variants } from 'framer-motion';
import { timeline as timelineData } from '@/data/content';

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
    const timeline = timelineData;

    return (
        <section className="py-24 px-5 max-w-3xl mx-auto text-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                
                <motion.h2
                    variants={titleVariants}
                    className="text-2xl font-bold font-mono mb-12"
                >
                    <span className="text-purple-400">&lt;</span>
                    {' '}journeyOfCode{' '}
                    <span className="text-purple-400">/&gt;</span>
                </motion.h2>

                
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
