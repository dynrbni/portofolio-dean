'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function NotFound() {
    const [displayedText, setDisplayedText] = useState('');
    const fullCode = `const error = {
  status: 404,
  message: "Not Found so BACK TO HOME RIGHT NOW"
};`;

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullCode.length) {
                setDisplayedText(fullCode.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 40);

        return () => clearInterval(timer);
    }, [fullCode]);

    const highlightCode = (code: string) => {
        return code
            .replace(/const/g, '<span class="text-purple-400">const</span>')
            .replace(/error/g, '<span class="text-blue-400">error</span>')
            .replace(/status/g, '<span class="text-blue-400">status</span>')
            .replace(/message/g, '<span class="text-blue-400">message</span>')
            .replace(/404/g, '<span class="text-cyan-300">404</span>')
            .replace(/"Not Found"/g, '<span class="text-orange-300">"Not Found"</span>');
    };

    return (
        <main className="min-h-screen bg-[#0f0f17] text-white flex items-center justify-center px-5 font-mono">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
                >
                    404
                </motion.h1>

                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-4 space-y-4"
                >
                    <p className="text-xl text-gray-400">
                        <span className="text-purple-400">&lt;</span>
                        PageNotFound
                        <span className="text-purple-400"> /&gt;</span>
                    </p>

                    <p className="text-gray-500 max-w-md mx-auto">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 bg-[#1a1a2e]/50 border border-white/10 rounded-xl p-6 max-w-md mx-auto text-left"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-3 h-3 rounded-full bg-red-400"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                    </div>
                    <pre className="text-sm text-gray-400 min-h-[100px]">
                        <code
                            dangerouslySetInnerHTML={{ __html: highlightCode(displayedText) }}
                        />
                        <span className="inline-block w-2 h-4 bg-purple-400 rounded-sm ml-0.5 animate-pulse" />
                    </pre>
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-8"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </motion.div>
            </motion.div>
        </main>
    );
}
