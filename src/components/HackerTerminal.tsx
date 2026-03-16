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

const ASCII_PROFILE = `
╔══════════════════════════════════════╗
║  P R O F I L E   I N F I L T R A T E ║
╚══════════════════════════════════════╝
`;

const ASCII_EXP = `
╔══════════════════════════════════════╗
║     E X P E R I E N C E   L O G S    ║
╚══════════════════════════════════════╝
`;

const SEQUENCE = [
    { text: "ssh adam@tyton.dev", delay: 800, type: "input" },
    { text: "⚡️ Authenticating...", delay: 400, type: "system", color: "text-slate-400" },
    { text: "🔓 Access Granted.", delay: 300, type: "system", color: "text-emerald-400 font-bold" },
    { text: ASCII_ART, delay: 500, type: "ascii", color: "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" },
    { text: "⚙️ Initializing cyber-constructs...", delay: 500, type: "system", color: "text-slate-400" },
    { text: "🌐 Loading frontend matrix...", delay: 300, type: "system", color: "text-slate-400" },
    { text: "✅ System ready. Welcome to my portfolio.", delay: 600, type: "system", color: "text-emerald-400 text-lg font-bold" },

    { text: "cat profile.txt", delay: 1000, type: "input" },
    { text: ASCII_PROFILE, delay: 200, type: "ascii", color: "text-cyan-400" },
    { text: "👨‍💻 Adam Tytoń - Software Developer", delay: 400, type: "system", color: "text-cyan-300 font-bold text-lg" },
    { text: "  > Full Stack Developer at Siemens. Responsible for web application development.", delay: 200, type: "system", color: "text-slate-300" },
    { text: "  > Daily work involves building efficient APIs (PHP/SQL) & frontend (JavaScript).", delay: 200, type: "system", color: "text-slate-300" },

    { text: "cat experience.log", delay: 1200, type: "input" },
    { text: ASCII_EXP, delay: 200, type: "ascii", color: "text-yellow-400" },
    { text: "💼 [SIEMENS INDUSTRY SOFTWARE] Full Stack Developer Intern (July 2024 - Present)", delay: 400, type: "system", color: "text-yellow-300 font-bold" },
    { text: "  [>] Creating user interfaces based on HTML & JavaScript.", delay: 200, type: "system", color: "text-slate-300" },
    { text: "  [>] Implementing complex backend functions and REST APIs using PHP & SQL.", delay: 200, type: "system", color: "text-slate-300" },
    { text: "  [>] Application performance optimization and ensuring high code quality.", delay: 200, type: "system", color: "text-slate-300" },
    { text: "  [>] Working in a Scrum team, active participation in Daily Standups.", delay: 200, type: "system", color: "text-slate-300" },
    { text: "  [>] Creating and conducting unit and end-to-end tests.", delay: 200, type: "system", color: "text-slate-300" },

    { text: "cat skills.json", delay: 1200, type: "input" },
    { text: "🛠️ SKILLS:", delay: 400, type: "system", color: "text-emerald-400 font-bold" },
    { text: "{", delay: 200, type: "system", color: "text-slate-300" },
    { text: '  "Backend": ["PHP", "SQL", "Laravel", "Node.js", "Python", "Java", "Spring Boot", "Express.js"],', delay: 300, type: "system", color: "text-slate-300" },
    { text: '  "Frontend": ["React", "Javascript", "Typescript", "Vue", "HTML", "CSS", "Tailwindcss", "Nuxt.js", "Alpine.js"],', delay: 400, type: "system", color: "text-slate-300" },
    { text: '  "Additional": ["Bash", "Docker", "Git"]', delay: 200, type: "system", color: "text-slate-300" },
    { text: "}", delay: 200, type: "system", color: "text-slate-300" },

    { text: "cat education.txt", delay: 1200, type: "input" },
    { text: "🎓 [Jagiellonian University] Bachelor's Degree in Computer Science (Oct 2022 - Sep 2025)", delay: 400, type: "system", color: "text-purple-400 font-bold" },

    { text: "cat contact.cfg && cat languages.cfg", delay: 1200, type: "input" },
    { text: "📞 Phone: +48 518 257 053 | ✉️ Email: adamtyton1@gmail.com", delay: 300, type: "system", color: "text-slate-300" },
    { text: "📍 Location: Grodowa 30C, Katowice | 🐙 GitHub: https://github.com/TryTytus", delay: 300, type: "system", color: "text-slate-300" },
    { text: "🗣️ Languages: Polish (Native), English (B2 - Technical)", delay: 300, type: "system", color: "text-slate-300" },
    { text: "⛵ Interests: Artificial Intelligence, Machine Learning, Sailing", delay: 300, type: "system", color: "text-slate-300" },

    { text: "./portfolio.sh --engage", delay: 1500, type: "input" }
];

export default function HackerTerminal() {
    const [lines, setLines] = useState<any[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const activeTextRef = useRef<HTMLSpanElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom whenever lines change
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [lines]);

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
                    if (terminalBodyRef.current) {
                        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
                    }
                    await new Promise(r => setTimeout(r, 20)); // slightly faster typing
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.15)] bg-[#0d1117] font-mono text-sm sm:text-base neon-border relative group"
        >
            {/* macOS top bar */}
            <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-gray-800">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="mx-auto text-xs text-gray-400 font-sans tracking-wider font-semibold">
                    adam@tyton.dev:~
                </div>
            </div>

            {/* Terminal body */}
            <div
                ref={terminalBodyRef}
                className="p-6 h-[500px] overflow-y-auto overflow-x-hidden terminal-scrollbar relative"
            >
                {/* Subtle digital noise overlay */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

                <div className="flex flex-col gap-2">
                    {lines.map((line, idx) => {
                        const isActive = idx === lines.length - 1 && !isComplete && line.type !== 'ascii';
                        return (
                            <div
                                key={idx}
                                className={`${line.color || 'text-slate-300'} ${line.type === 'ascii'
                                        ? 'whitespace-pre text-[7px] sm:text-[9px] leading-tight py-1 block w-full overflow-x-hidden'
                                        : 'break-words'
                                    }`}
                            >
                                {line.type === 'input' && <span className="text-emerald-500 mr-2 font-bold">adam@dev</span>}
                                {line.type === 'input' && <span className="text-cyan-400 mr-2">❯</span>}
                                {line.displayedText}
                                {isActive && <span ref={activeTextRef}></span>}
                                {isActive && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="inline-block w-2.5 h-4 bg-emerald-500 ml-1 align-middle"
                                    />
                                )}
                            </div>
                        );
                    })}
                    {isComplete && (
                        <div className="text-slate-300 mt-2">
                            <span className="text-emerald-500 mr-2 font-bold">adam@dev</span>
                            <span className="text-cyan-400 mr-2">❯</span>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2.5 h-4 bg-emerald-500 ml-1 align-middle"
                            />
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .terminal-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .terminal-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .terminal-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #334155;
                    border-radius: 10px;
                }
            `}</style>
        </motion.div >
    );
}
