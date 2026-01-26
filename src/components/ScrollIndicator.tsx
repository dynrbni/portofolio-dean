'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.5 }}
            className="flex flex-col items-center gap-2 mt-10 text-gray-500 text-sm font-mono"
        >
            <span>Scroll to explore</span>
            <motion.svg
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
        </motion.div>
    );
}
