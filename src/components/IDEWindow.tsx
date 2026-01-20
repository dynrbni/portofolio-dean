'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { files } from '@/data/content';

interface Token {
    text: string;
    class: string;
}

const syntaxColors: Record<string, string> = {
    keyword: 'text-purple-400 font-semibold',
    variable: 'text-blue-400',
    string: 'text-orange-300',
    number: 'text-cyan-300',
    'boolean-true': 'text-green-400',
    'boolean-false': 'text-red-400',
    property: 'text-blue-400',
    operator: 'text-gray-200',
    bracket: 'text-yellow-300',
    punctuation: 'text-gray-500',
    function: 'text-yellow-300',
    comment: 'text-gray-500 italic',
};

export default function IDEWindow() {
    const [activeFile, setActiveFile] = useState(0);
    const [displayedLines, setDisplayedLines] = useState<Token[][]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [key, setKey] = useState(0);
    const autoSwitchRef = useRef<NodeJS.Timeout | null>(null);

    const resetTyping = useCallback(() => {
        setDisplayedLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
        setIsTyping(true);
        setKey(prev => prev + 1);
    }, []);

    const switchToFile = useCallback((index: number) => {
        setActiveFile(index);
        resetTyping();
    }, [resetTyping]);

    const handleTabClick = (index: number) => {
        if (index === activeFile && isTyping) return;
        if (autoSwitchRef.current) clearTimeout(autoSwitchRef.current);
        switchToFile(index);
    };

    // Auto-cycle to next file
    useEffect(() => {
        if (!isTyping) {
            autoSwitchRef.current = setTimeout(() => {
                const nextFile = (activeFile + 1) % files.length;
                switchToFile(nextFile);
            }, 2500);
            return () => {
                if (autoSwitchRef.current) clearTimeout(autoSwitchRef.current);
            };
        }
    }, [isTyping, activeFile, switchToFile]);

    // Typing animation
    useEffect(() => {
        if (!isTyping) return;

        const code = files[activeFile].code;
        if (currentLine >= code.length) {
            setIsTyping(false);
            return;
        }

        const line = code[currentLine];
        const lineText = line.map(t => t.text).join('');

        if (currentChar >= lineText.length) {
            setDisplayedLines(prev => [...prev, line]);
            setCurrentLine(prev => prev + 1);
            setCurrentChar(0);
            return;
        }

        const timer = setTimeout(() => {
            setCurrentChar(prev => prev + 1);
        }, 35);

        return () => clearTimeout(timer);
    }, [activeFile, currentLine, currentChar, isTyping]);

    const code = files[activeFile].code;
    const currentLineTokens = code[currentLine];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-[620px] bg-[#1e1e2e] rounded-xl overflow-hidden shadow-2xl relative"
        >
            {/* Glow */}
            <div className="absolute inset-0 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.15)] pointer-events-none" />

            {/* Header */}
            <div className="bg-[#181825] px-4 py-3 flex items-center gap-4 border-b border-white/5 relative z-10">
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                {/* File Tabs - Horizontal scroll on mobile */}
                <div className="flex-1 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-1 min-w-max">
                        {files.map((file, index) => (
                            <button
                                key={file.name}
                                onClick={() => handleTabClick(index)}
                                className={`px-3 py-1.5 text-xs font-mono rounded-t-md transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap
                ${activeFile === index
                                        ? 'text-white bg-[#1e1e2e] border-b-2 border-purple-400'
                                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                    }`}
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#f1e05a">
                                    <path d="M3 3h18v18H3V3z" />
                                </svg>
                                {file.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Code Editor */}
            <div className="flex min-h-[220px] p-4 font-mono text-sm relative z-10">
                {/* Line Numbers */}
                <div className="pr-4 border-r border-white/5 text-right select-none min-w-[40px]">
                    {displayedLines.map((_, i) => (
                        <div key={i} className="text-gray-600 leading-6">{i + 1}</div>
                    ))}
                    {isTyping && (
                        <div className="text-gray-600 leading-6">{displayedLines.length + 1}</div>
                    )}
                </div>

                {/* Code Content */}
                <div className="pl-4 flex-1">
                    {/* Completed lines - NO animation */}
                    {displayedLines.map((line, lineIndex) => (
                        <div key={`${key}-${lineIndex}`} className="leading-6 whitespace-pre">
                            {line.map((token, tokenIndex) => (
                                <span key={tokenIndex} className={syntaxColors[token.class] || ''}>
                                    {token.text}
                                </span>
                            ))}
                        </div>
                    ))}

                    {/* Currently typing line */}
                    {isTyping && currentLineTokens && (
                        <div className="leading-6 whitespace-pre">
                            {(() => {
                                let charCount = 0;
                                return currentLineTokens.map((token, tokenIndex) => {
                                    const tokenStart = charCount;
                                    charCount += token.text.length;
                                    if (currentChar <= tokenStart) return null;
                                    const visibleChars = Math.min(currentChar - tokenStart, token.text.length);
                                    return (
                                        <span key={tokenIndex} className={syntaxColors[token.class] || ''}>
                                            {token.text.slice(0, visibleChars)}
                                        </span>
                                    );
                                });
                            })()}
                            <span className="inline-block w-2 h-4 bg-purple-400 rounded-sm ml-0.5 animate-pulse" />
                        </div>
                    )}

                    {/* Cursor after done */}
                    {!isTyping && (
                        <div className="leading-6">
                            <span className="inline-block w-2 h-4 bg-purple-400 rounded-sm animate-pulse" />
                        </div>
                    )}
                </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
                <motion.div
                    className="h-full bg-purple-400/50"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3 }}
                    key={key}
                />
            </div>
        </motion.div>
    );
}
