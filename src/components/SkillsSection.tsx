'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Skill {
    id: string;
    name: string;
    sort_order: number;
}

const CssSvg = () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white opacity-60 group-hover:opacity-100 transition-all duration-300">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
    </svg>
);

const HtmlSvg = () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white opacity-60 group-hover:opacity-100 transition-all duration-300">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
    </svg>
);

const VsCodeSvg = () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white opacity-60 group-hover:opacity-100 transition-all duration-300">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
);

const getIconUrl = (skillName: string) => {
    const iconMap: Record<string, string> = {
        'react': 'react',
        'next.js': 'nextdotjs',
        'nextjs': 'nextdotjs',
        'vue': 'vuedotjs',
        'vue.js': 'vuedotjs',
        'vuejs': 'vuedotjs',
        'angular': 'angular',
        'svelte': 'svelte',
        'nuxt': 'nuxtdotjs',
        'nuxt.js': 'nuxtdotjs',
        'astro': 'astro',
        'solid': 'solid',
        'solidjs': 'solid',
        'remix': 'remix',

        'typescript': 'typescript',
        'javascript': 'javascript',
        'js': 'javascript',
        'python': 'python',
        'java': 'oracle',
        'kotlin': 'kotlin',
        'swift': 'swift',
        'rust': 'rust',
        'go': 'go',
        'golang': 'go',
        'php': 'php',
        'ruby': 'ruby',
        'c': 'c',
        'c++': 'cplusplus',
        'cpp': 'cplusplus',
        'c#': 'csharp',
        'csharp': 'csharp',
        'dart': 'dart',

        'node.js': 'nodedotjs',
        'nodejs': 'nodedotjs',
        'node': 'nodedotjs',
        'express': 'express',
        'express.js': 'express',
        'expressjs': 'express',
        'django': 'django',
        'flask': 'flask',
        'laravel': 'laravel',
        'rails': 'rubyonrails',
        'graphql': 'graphql',

        'tailwindcss': 'tailwindcss',
        'tailwind': 'tailwindcss',
        'bootstrap': 'bootstrap',
        'sass': 'sass',
        'scss': 'sass',

        'postgresql': 'postgresql',
        'postgres': 'postgresql',
        'mongodb': 'mongodb',
        'mysql': 'mysql',
        'redis': 'redis',
        'prisma': 'prisma',

        'firebase': 'firebase',
        'supabase': 'supabase',
        'vercel': 'vercel',
        'netlify': 'netlify',
        'heroku': 'heroku',
        'digitalocean': 'digitalocean',
        'cloudflare': 'cloudflare',
        'aws': 'amazonaws',
        'azure': 'microsoftazure',
        'gcp': 'googlecloud',
        'googlecloud': 'googlecloud',

        'git': 'git',
        'github': 'github',
        'docker': 'docker',
        'vscode': 'visualstudiocode',
        'visual studio code': 'visualstudiocode',
        'vs code': 'visualstudiocode',
        'figma': 'figma',
        'webpack': 'webpack',
        'vite': 'vite',
        'npm': 'npm',
        'yarn': 'yarn',
        'pnpm': 'pnpm',
        'bun': 'bun',
        'deno': 'deno',

        'react native': 'react',
        'reactnative': 'react',
        'expo': 'expo',
        'flutter': 'flutter',
        'android': 'android',
        'ios': 'ios',
        'apple': 'apple',

        'electron': 'electron',
        'tauri': 'tauri',

        'linux': 'linux',
        'ubuntu': 'ubuntu',


        'redux': 'redux',
        'framer': 'framer',
        '.net': 'dotnet',
        'dotnet': 'dotnet',
        'nginx': 'nginx',
        'jquery': 'jquery',
    };

    const normalizedName = skillName.toLowerCase().trim();

    if (normalizedName === 'css' || normalizedName === 'css3') {
        return 'CSS_SVG';
    }
    if (normalizedName === 'html' || normalizedName === 'html5') {
        return 'HTML_SVG';
    }
    if (normalizedName === 'vscode' || normalizedName === 'visual studio code' || normalizedName === 'vs code') {
        return 'VSCODE_SVG';
    }

    const slug = iconMap[normalizedName];

    if (slug) {
        return `https://cdn.simpleicons.org/${slug}/white`;
    }

    console.log('Missing icon for:', normalizedName);
    return null;
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
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

const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
};

export default function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        supabase.from('skills').select('*').order('sort_order').then(({ data }) => {
            if (data) setSkills(data);
        });
    }, []);

    if (skills.length === 0) return null;

    return (
        <section className="py-24 px-5 max-w-2xl mx-auto text-center">
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
                    {' '}skills{' '}
                    <span className="text-purple-400">/&gt;</span>
                </motion.h2>

                
                <div className="flex flex-wrap justify-center gap-8">
                    {skills.map((skill) => {
                        const iconUrl = getIconUrl(skill.name);
                        return (
                            <motion.div
                                key={skill.id}
                                variants={iconVariants}
                                whileHover={{
                                    scale: 1.2,
                                    filter: 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.6))',
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="group cursor-pointer"
                                title={skill.name}
                            >
                                {iconUrl === 'CSS_SVG' ? (
                                    <CssSvg />
                                ) : iconUrl === 'HTML_SVG' ? (
                                    <HtmlSvg />
                                ) : iconUrl === 'VSCODE_SVG' ? (
                                    <VsCodeSvg />
                                ) : iconUrl ? (
                                    <img
                                        src={iconUrl}
                                        alt={skill.name}
                                        className="w-12 h-12 opacity-60 group-hover:opacity-100 transition-all duration-300"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-xl font-bold text-white/60 group-hover:text-white transition-colors">
                                        {skill.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}
