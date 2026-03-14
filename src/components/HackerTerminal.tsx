import { useEffect, useState, useRef } from 'react';
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
    const [isComplete, setIsComplete] = useState(false);
    const activeTextRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let isCancelled = false;

        const runSequence = async () => {
            for (let i = 0; i < SEQUENCE.length; i++) {
                if (isCancelled) return;
                const cmd = SEQUENCE[i];

                if (cmd.type === 'ascii') {
                    setLines(prev => [...prev, { ...cmd, displayedText: cmd.text }]);
                    await new Promise(r => setTimeout(r, cmd.delay));
                    continue;
                }

                // Add empty line to state first
                setLines(prev => [...prev, { ...cmd, displayedText: '' }]);

                // Type it out directly to DOM
                for (let j = 0; j < cmd.text.length; j++) {
                    if (isCancelled) return;
                    if (activeTextRef.current) {
                        activeTextRef.current.textContent = cmd.text.substring(0, j + 1);
                    }
                    await new Promise(r => setTimeout(r, 30));
                }

                // Finalize line in state
                if (!isCancelled) {
                    setLines(prev => {
                        const newLines = [...prev];
                        if (newLines.length > 0) {
                            newLines[newLines.length - 1].displayedText = cmd.text;
                        }
                        return newLines;
                    });
                }

                if (activeTextRef.current) activeTextRef.current.textContent = '';
                await new Promise(r => setTimeout(r, cmd.delay));
            }
            if (!isCancelled) setIsComplete(true);
        };

        runSequence();
        return () => { isCancelled = true; };
    }, []);

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
                {lines.map((line, idx) => {
                    const isActive = idx === lines.length - 1 && !isComplete && line.type !== 'ascii';
                    return (
                        <div key={idx} className={`${line.color || 'text-secondary/80'} ${line.type === 'ascii' ? 'whitespace-pre text-[8px] sm:text-[10px] leading-none py-2' : ''}`}>
                            {line.type === 'input' && <span className="text-emerald-500 mr-2">➜</span>}
                            {line.type === 'input' && <span className="text-cyan-400 mr-2">~</span>}
                            {line.displayedText}
                            {isActive && <span ref={activeTextRef}></span>}
                            {isActive && (
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="inline-block w-2 h-4 bg-emerald-500 ml-1 align-middle"
                                />
                            )}
                        </div>
                    );
                })}
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
