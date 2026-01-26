'use client';

import { motion, Variants } from 'framer-motion';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    content: string;
}

// Dummy testimonials data - you can replace with Supabase later
const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Alex Johnson',
        role: 'Project Manager @ TechCorp',
        avatar: 'AJ',
        content: 'Dean delivered exceptional work on our POS system. His attention to detail and problem-solving skills are outstanding. Highly recommended!',
    },
    {
        id: 2,
        name: 'Sarah Chen',
        role: 'Senior Developer @ StartupXYZ',
        avatar: 'SC',
        content: 'Working with Dean was a great experience. He quickly understood our requirements and delivered a clean, maintainable codebase.',
    },
    {
        id: 3,
        name: 'Michael Pratama',
        role: 'Mentor @ Dicoding',
        avatar: 'MP',
        content: 'Dean shows remarkable growth as a developer. His dedication to learning and applying best practices is impressive for his age.',
    },
];

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

const titleVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function TestimonialsSection() {
    return (
        <section className="py-24 px-5 max-w-5xl mx-auto">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                {/* Section Title */}
                <motion.h2
                    variants={titleVariants}
                    className="text-center text-2xl font-bold font-mono mb-12"
                >
                    <span className="text-purple-400">&lt;</span>
                    {' '}testimonials{' '}
                    <span className="text-purple-400">/&gt;</span>
                </motion.h2>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -5,
                                boxShadow: '0 15px 30px rgba(168, 85, 247, 0.15)',
                            }}
                            className="group bg-[#1a1a2e]/50 border border-white/10 rounded-xl p-6 hover:border-purple-400/30 transition-colors backdrop-blur-sm relative overflow-hidden"
                        >
                            {/* Decorative quote mark */}
                            <div className="absolute top-4 right-4 text-purple-400/10 text-6xl font-serif leading-none pointer-events-none">
                                "
                            </div>

                            {/* Content */}
                            <div className="relative z-10 space-y-4">
                                {/* Quote */}
                                <p className="text-gray-400 text-sm leading-relaxed font-mono italic">
                                    "{testimonial.content}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold font-mono shrink-0">
                                        {testimonial.avatar}
                                    </div>

                                    {/* Info */}
                                    <div className="min-w-0">
                                        <h4 className="text-white font-semibold text-sm truncate">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-gray-500 text-xs font-mono truncate">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Hover glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
