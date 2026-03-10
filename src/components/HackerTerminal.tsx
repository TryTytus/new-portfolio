import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ASCII_ART = `
 ██╗ ██╗███╗   ███╗     █████╗ ██████╗  █████╗ ███╗   ███╗
 ██║╚██╗████╗ ████║    ██╔══██╗██╔══██╗██╔══██╗████╗ ████║
 ██║ ╚═╝██╔████╔██║    ███████║██║  ██║███████║██╔████╔██║
 ██║    ██║╚██╔╝██║    ██╔══██║██║  ██║██╔══██║██║╚██╔╝██║
 ██║    ██║ ╚═╝ ██║    ██║  ██║██████╔╝██║  ██║██║ ╚═╝ ██║
 ╚═╝    ╚═╝     ╚═╝    ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝
`;

const SEQUENCE = [
    { text: "ssh root@tytus.dev", delay: 800, type: "input" },
    { text: "Authenticating...", delay: 400, type: "system" },
    { text: "Access Granted.", delay: 400, type: "system", color: "text-emerald-400" },
    { text: ASCII_ART, delay: 500, type: "ascii", color: "text-emerald-500" },
    { text: "Initializing cyber-constructs...", delay: 600, type: "system" },
    { text: "Loading frontend matrix...", delay: 400, type: "system" },
    { text: "System ready. Welcome to my portfolio.", delay: 800, type: "system", color: "text-cta" }
];

export default function HackerTerminal() {
    const [lines, setLines] = useState<any[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentLineIndex >= SEQUENCE.length) {
            setIsComplete(true);
            return;
        }

        const currentCommand = SEQUENCE[currentLineIndex];

        if (currentCommand.type === "ascii") {
            // Instantly render ASCII art with delay before next step
            setLines(prev => [...prev, { ...currentCommand, displayedText: currentCommand.text }]);
            const timer = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, currentCommand.delay);
            return () => clearTimeout(timer);
        }

        // Typewriter effect for regular text
        if (currentCharIndex < currentCommand.text.length) {
            const timer = setTimeout(() => {
                setLines(prev => {
                    const newLines = [...prev];
                    if (newLines[currentLineIndex]) {
                        newLines[currentLineIndex].displayedText = currentCommand.text.substring(0, currentCharIndex + 1);
                    } else {
                        newLines.push({ ...currentCommand, displayedText: currentCommand.text.substring(0, 1) });
                    }
                    return newLines;
                });
                setCurrentCharIndex(prev => prev + 1);
            }, 30); // Typing speed
            return () => clearTimeout(timer);
        } else {
            // Line complete, wait for delay before next line
            const timer = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, currentCommand.delay);
            return () => clearTimeout(timer);
        }
    }, [currentLineIndex, currentCharIndex]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl mx-auto rounded-none overflow-hidden border border-cta/30 shadow-[0_0_20px_rgba(34,197,94,0.1)] bg-background-dark/80 font-mono text-sm sm:text-base backdrop-blur-md neon-border"
        >
            {/* macOS top bar */}
            <div className="flex items-center px-4 py-3 bg-primary/20 border-b border-cta/30">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-cta/80 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                </div>
                <div className="mx-auto text-xs text-secondary/60 font-sans tracking-wider">
                    root@devops:~
                </div>
            </div>

            {/* Terminal body */}
            <div className="p-6 h-[400px] overflow-y-auto no-scrollbar flex flex-col gap-2">
                {lines.map((line, idx) => (
                    <div key={idx} className={`${line.color || 'text-secondary/80'} ${line.type === 'ascii' ? 'whitespace-pre text-[8px] sm:text-[10px] leading-none py-2' : ''}`}>
                        {line.type === 'input' && <span className="text-emerald-500 mr-2">➜</span>}
                        {line.type === 'input' && <span className="text-cyan-400 mr-2">~</span>}
                        {line.displayedText}
                        {idx === currentLineIndex && !isComplete && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2 h-4 bg-emerald-500 ml-1 align-middle"
                            />
                        )}
                    </div>
                ))}
                {isComplete && (
                    <div className="text-secondary/80">
                        <span className="text-emerald-500 mr-2">➜</span>
                        <span className="text-cyan-400 mr-2">~</span>
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2 h-4 bg-emerald-500 ml-1 align-middle"
                        />
                    </div>
                )}
            </div>
        </motion.div >
    );
}
