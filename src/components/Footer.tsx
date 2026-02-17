'use client';

import { footer } from '@/data/content';

export default function Footer() {
    return (
        <footer className="py-8 px-5 border-t border-white/5">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-mono">
                <p>{footer.copyright}</p>
                <p>{footer.message}</p>
            </div>
        </footer>
    );
}
