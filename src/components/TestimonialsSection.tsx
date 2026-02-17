'use client';

import { motion, Variants, useMotionValue, useAnimation, PanInfo } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    content: string;
}

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
    {
        id: 4,
        name: 'Rizky Aditya',
        role: 'CTO @ BinerTech',
        avatar: 'RA',
        content: 'Dean is one of the most passionate young developers I have met. His ability to learn new technologies quickly and apply them effectively is truly impressive.',
    },
    {
        id: 5,
        name: 'Fitriani Sari',
        role: 'UI/UX Designer @ PixelCraft',
        avatar: 'FS',
        content: 'Collaborating with Dean was seamless. He translates designs into pixel-perfect code and always suggests improvements. A great team player!',
    },
    {
        id: 6,
        name: 'David Park',
        role: 'Lead Engineer @ CloudBase',
        avatar: 'DP',
        content: 'Dean built a robust API layer for our project in record time. His code quality and documentation are on par with senior developers.',
    },
];

const CARD_WIDTH = 340;
const GAP = 24;

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

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const controls = useAnimation();

    useEffect(() => {
        const updateCardsPerView = () => {
            const width = window.innerWidth;
            if (width < 640) setCardsPerView(1);
            else if (width < 1024) setCardsPerView(2);
            else setCardsPerView(3);
        };
        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - cardsPerView);

    const animateTo = (index: number) => {
        const clamped = Math.max(0, Math.min(index, maxIndex));
        setCurrentIndex(clamped);
        controls.start({
            x: -(clamped * (CARD_WIDTH + GAP)),
            transition: { type: 'spring', stiffness: 300, damping: 30 },
        });
    };

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = CARD_WIDTH / 4;
        if (info.offset.x < -threshold) {
            animateTo(currentIndex + 1);
        } else if (info.offset.x > threshold) {
            animateTo(currentIndex - 1);
        } else {
            animateTo(currentIndex);
        }
    };

    return (
        <section className="py-24 px-5 max-w-5xl mx-auto">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                <motion.h2
                    variants={titleVariants}
                    className="text-center text-2xl font-bold font-mono mb-12"
                >
                    <span className="text-purple-400">&lt;</span>
                    {' '}testimonials{' '}
                    <span className="text-purple-400">/&gt;</span>
                </motion.h2>

                {/* Carousel */}
                <div className="overflow-hidden" ref={containerRef}>
                    <motion.div
                        className="flex cursor-grab active:cursor-grabbing"
                        style={{ gap: GAP, x }}
                        animate={controls}
                        drag="x"
                        dragConstraints={{
                            left: -(maxIndex * (CARD_WIDTH + GAP)),
                            right: 0,
                        }}
                        dragElastic={0.1}
                        onDragEnd={handleDragEnd}
                    >
                        {testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                className="group shrink-0 bg-[#1a1a2e]/50 border border-white/10 rounded-xl p-6 hover:border-purple-400/30 transition-colors backdrop-blur-sm relative overflow-hidden"
                                style={{ width: CARD_WIDTH }}
                                whileHover={{
                                    y: -5,
                                    boxShadow: '0 15px 30px rgba(168, 85, 247, 0.15)',
                                }}
                            >
                                {/* Quote mark */}
                                <div className="absolute top-4 right-4 text-purple-400/10 text-6xl font-serif leading-none pointer-events-none">
                                    &ldquo;
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Avatar + Name on TOP */}
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold font-mono shrink-0">
                                            {testimonial.avatar}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-white font-semibold text-sm truncate">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-gray-500 text-xs font-mono truncate">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <p className="text-gray-400 text-sm leading-relaxed font-mono italic flex-1">
                                        &ldquo;{testimonial.content}&rdquo;
                                    </p>
                                </div>

                                {/* Hover gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => animateTo(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i === currentIndex
                                    ? 'bg-purple-400 w-6'
                                    : 'bg-white/20 hover:bg-white/40'
                            }`}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
