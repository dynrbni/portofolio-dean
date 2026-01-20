'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface FooterData {
    copyright: string;
    message: string;
}

export default function Footer() {
    const [data, setData] = useState<FooterData | null>(null);

    useEffect(() => {
        supabase.from('footer').select('*').single().then(({ data }) => {
            if (data) setData(data);
        });
    }, []);

    if (!data) {
        return (
            <footer className="py-8 px-5 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center text-sm text-gray-500 font-mono">
                    Loading...
                </div>
            </footer>
        );
    }

    return (
        <footer className="py-8 px-5 border-t border-white/5">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-mono">
                <p>{data.copyright}</p>
                <p>{data.message}</p>
            </div>
        </footer>
    );
}
