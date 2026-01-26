'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ContactData {
    email: string;
    github_url: string;
    linkedin_url: string;
    twitter_url: string;
    instagram_url: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

const formVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const socialVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 },
    },
};

const socialItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3 },
    },
};

export default function ContactSection() {
    const [data, setData] = useState<ContactData | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        supabase.from('contact').select('*').single().then(({ data }) => {
            if (data) setData(data);
        });
    }, []);

    if (!data) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Message from ${formData.name}`;
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        window.location.href = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    };

    const socials = [
        {
            name: 'GitHub',
            handle: '@dynrbni',
            url: data.github_url,
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
        },
        {
            name: 'LinkedIn',
            handle: 'Dean Rabbani',
            url: data.linkedin_url,
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: 'X',
            handle: '@dynrbni',
            url: data.twitter_url,
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            name: 'Instagram',
            handle: '@dynrbni',
            url: data.instagram_url,
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-24 px-5 max-w-4xl mx-auto">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-2xl font-bold font-mono mb-6 text-center"
                >
                    <span className="text-purple-400">&lt;</span>
                    {' '}contact{' '}
                    <span className="text-purple-400">/&gt;</span>
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className="text-gray-400 mb-10 text-center"
                >
                    Send a message or connect with me through socials
                </motion.p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.form
                        variants={formVariants}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <motion.div whileFocus={{ scale: 1.01 }}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-4 bg-[#1e1e2e] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all"
                            />
                        </motion.div>
                        <motion.div whileFocus={{ scale: 1.01 }}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-4 bg-[#1e1e2e] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all"
                            />
                        </motion.div>
                        <motion.div whileFocus={{ scale: 1.01 }}>
                            <textarea
                                placeholder="Your Message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-4 bg-[#1e1e2e] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all resize-none"
                            />
                        </motion.div>
                        <motion.button
                            type="submit"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 border border-purple-500/50 rounded-xl text-purple-400 font-semibold flex items-center justify-center gap-2 hover:bg-purple-500/10 hover:border-purple-500 transition-all"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 2L11 13" />
                                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                            </svg>
                            Send Message
                        </motion.button>
                    </motion.form>

                    {/* Direct Contact & Socials */}
                    <motion.div
                        variants={socialVariants}
                        className="space-y-6"
                    >
                        {/* Direct Contact Card - hidden on mobile */}
                        <motion.div
                            className="hidden md:block border border-white/10 rounded-xl p-6 hover:border-purple-400/30 transition-colors"
                            whileHover={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.1)' }}
                        >
                            <h3 className="text-white font-semibold mb-4">Direct Contact</h3>
                            <motion.a
                                whileHover={{ x: 5 }}
                                href={`mailto:${data.email}`}
                                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors mb-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                {data.email}
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="border border-white/10 rounded-xl p-6 hover:border-purple-400/30 transition-colors"
                            whileHover={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.1)' }}
                        >
                            <h3 className="text-white font-semibold mb-4">Connect with me</h3>
                            <motion.div
                                className="grid grid-cols-2 gap-3"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {socials.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        variants={socialItemVariants}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)',
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all text-sm"
                                    >
                                        {social.icon}
                                        {social.name}
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
