'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { connect as connectData } from '@/data/content';

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

export default function ConnectSection() {
    const [contributions, setContributions] = useState<string>('...');
    const github_username = connectData.github_username;

    useEffect(() => {
        fetch(`https://github-contributions-api.jogruber.de/v4/${github_username}?y=last&t=${Date.now()}`, { cache: 'no-store' })
            .then(res => res.json())
            .then(json => {
                if (json?.contributions) {
                    const total = json.contributions.reduce((acc: number, day: { count: number }) => acc + day.count, 0);
                    setContributions(total.toString());
                }
            })
            .catch(err => console.error("Failed to fetch contributions:", err));
    }, [github_username]);

    return (
        <section className="py-24 px-5 max-w-4xl mx-auto text-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-bold font-mono mb-12"
                >
                    <span className="text-purple-400">&lt;</span>
                    {' '}github{' '}
                    <span className="text-purple-400">/&gt;</span>
                </motion.h2>

                <motion.div
                    variants={itemVariants}
                    className="mb-6"
                >
                    
                    <div className="overflow-x-auto pb-4">
                        <div className="min-w-[700px] md:min-w-0">
                            <motion.img
                                src={`https://ghchart.rshah.org/22c55e/${github_username}`}
                                alt="GitHub Contributions"
                                className="w-full mx-auto brightness-[0.85] invert hue-rotate-180 saturate-150"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>

                    <motion.p
                        variants={itemVariants}
                        className="text-gray-500 text-base mt-4 font-mono"
                    >
                        <motion.span
                            className="text-green-400 font-semibold text-l inline-block"
                            initial={{ scale: 1 }}
                            whileInView={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            {contributions}
                        </motion.span> contributions in the last year
                    </motion.p>
                </motion.div>
            </motion.div>
        </section>
    );
}
