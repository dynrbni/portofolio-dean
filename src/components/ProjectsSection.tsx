'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Project {
    id: string;
    name: string;
    description: string;
    tech: string[];
    github_url: string;
    live_url: string;
    image_url: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

export default function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        supabase.from('projects').select('*').order('sort_order').then(({ data }) => {
            if (data) setProjects(data);
        });
    }, []);

    if (projects.length === 0) return null;

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="py-24 px-5 max-w-5xl mx-auto"
        >
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center text-2xl font-bold font-mono mb-12"
            >
                <span className="text-purple-400">&lt;</span>
                {' '}RecentProjects{' '}
                <span className="text-purple-400">/&gt;</span>
            </motion.h2>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="grid md:grid-cols-3 gap-6"
            >
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        variants={cardVariants}
                        className="bg-[#1a1a2e]/50 border border-white/10 rounded-xl overflow-hidden hover:border-purple-400/30 transition-colors backdrop-blur-sm"
                    >
                        {/* Project Image */}
                        <div className="h-40 bg-[#11111b] flex items-center justify-center overflow-hidden">
                            {project.image_url ? (
                                <img
                                    src={project.image_url}
                                    alt={project.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-4xl opacity-50">📁</span>
                            )}
                        </div>

                        <div className="p-5 space-y-3">
                            <h3 className="font-semibold text-lg">{project.name}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>

                            <div className="flex flex-wrap gap-1.5">
                                {project.tech && project.tech.map(tech => (
                                    <span
                                        key={tech}
                                        className="text-xs px-2 py-1 bg-purple-400/10 text-purple-400 rounded font-mono"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors px-3 py-1.5 border border-white/10 rounded-md"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    Code
                                </a>
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors px-3 py-1.5 border border-white/10 rounded-md"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                    Live
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}
