'use client';

import { motion, Variants } from 'framer-motion';

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

export default function recentlyPlayedSection() {
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
                    {' '}recentlyPlayed{' '}
                    <span className="text-purple-400">/&gt;</span>
                </motion.h2>

                <motion.a
                    variants={itemVariants}
                    href="https://music-profile.rayriffy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <img
                        src="https://music-profile.rayriffy.com/theme/dark.svg?uid=001967.13189dff0c4a41d4a6279d714537ca5c.1846"
                        alt="Apple Music Recently Played"
                        className="max-w-full h-auto rounded-lg"
                    />
                </motion.a>
            </motion.div>
        </section>
    );
}
