import { motion } from 'framer-motion';
import { Terminal, Briefcase, GraduationCap, Code2, Database, Wrench, Mail, MapPin, Phone, Github } from 'lucide-react';

export default function CyberCV() {
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <section id="cv" className="relative min-h-screen py-24 bg-transparent border-t border-cta/10 overflow-hidden font-mono">
            {/* Decorative Grid Background matching Skills.tsx */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(var(--color-cta) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />
            {/* Subtle glow accents */}
            <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-cta/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="space-y-24" // Massive spacing between main sections
                >

                    {/* --- ABOUT SECTION --- */}
                    <motion.div variants={fadeIn} className="scroll-mt-24">
                        <div className="mb-12 border-b border-secondary/30 pb-6 md:flex justify-between items-end">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Terminal className="text-cta w-6 h-6" />
                                    <span className="font-mono text-secondary uppercase tracking-widest text-sm">Profile.md</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold">About System</h2>
                            </div>
                            <p className="text-text-light/60 max-w-sm mt-6 md:mt-0 font-mono text-sm text-right">
                                Initializing user context and core directives.
                            </p>
                        </div>

                        <div className="group relative bg-background-dark/80 backdrop-blur-sm border border-cta/30 rounded-none p-8 md:p-12 shadow-[0_0_10px_rgba(34,197,94,0.05)] hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:border-cta/80 transition-all duration-300">
                            {/* Hover sweep effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cta/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                                {/* Photo column */}
                                <div className="w-48 shrink-0 flex flex-col items-center">
                                    <div className="relative w-48 h-48 rounded-none overflow-hidden border border-cta/50 bg-background-dark/50 group-hover:border-cta transition-colors duration-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-cta/80 font-mono">
                                            <div className="mb-2 opacity-60 flex flex-col items-center">
                                                <div className="w-12 h-12 border-2 border-cta/50 border-dashed rounded-full animate-[spin_10s_linear_infinite] mb-4"></div>
                                                <span>[INSERT_PHOTO]</span>
                                            </div>
                                        </div>
                                        {/* Scanning line effect */}
                                        <div className="absolute top-0 left-0 w-full h-4 bg-cta/20 blur-[2px] opacity-0 group-hover:opacity-100 animate-[scan_2s_linear_infinite]"></div>
                                        <div className="absolute inset-0 bg-cta/5 mix-blend-overlay animate-pulse pointer-events-none"></div>
                                        {/* Corner Accents */}
                                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cta"></div>
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cta"></div>
                                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cta"></div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cta"></div>
                                    </div>
                                    <div className="mt-6 w-full space-y-3 font-mono text-sm text-text-light/80">
                                        <a href="tel:+48518257053" className="flex items-center gap-3 hover:text-cta transition-colors">
                                            <Phone className="w-4 h-4 text-secondary group-hover:text-cta transition-colors" />
                                            +48 518 257 053
                                        </a>
                                        <a href="mailto:adamtyton1@gmail.com" className="flex items-center gap-3 hover:text-cta transition-colors">
                                            <Mail className="w-4 h-4 text-secondary group-hover:text-cta transition-colors" />
                                            adamtyton1@gmail.com
                                        </a>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-4 h-4 text-secondary group-hover:text-cta transition-colors" />
                                            Grodowa 30C, Katowice
                                        </div>
                                        <a href="https://github.com/TryTytus" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cta transition-colors">
                                            <Github className="w-4 h-4 text-secondary group-hover:text-cta transition-colors" />
                                            github.com/TryTytus
                                        </a>
                                    </div>
                                </div>

                                {/* Info column */}
                                <div className="flex-1">
                                    <h3 className="text-3xl md:text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cta to-secondary drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] mb-2">
                                        Adam Tytoń
                                    </h3>
                                    <div className="inline-block px-3 py-1 mb-6 border border-cta/30 bg-background-dark text-cta text-sm font-mono tracking-wider">
                                        &lt; SOFTWARE_DEVELOPER /&gt;
                                    </div>
                                    <p className="text-text-light/80 text-lg leading-relaxed mb-8">
                                        I am a Full Stack Developer at Siemens, where I am responsible for web application development.
                                        My daily work involves creating efficient APIs based on PHP and SQL and frontend development using JavaScript.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        {/* Languages */}
                                        <div>
                                            <h4 className="flex items-center gap-2 text-secondary text-sm mb-4 uppercase tracking-wider">
                                                <Terminal className="w-4 h-4" /> Languages
                                            </h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between mb-2 text-sm text-text-light/80">
                                                        <span>Polski</span>
                                                        <span className="text-cta">Native</span>
                                                    </div>
                                                    <div className="h-1 bg-background-dark border border-secondary/30 overflow-hidden">
                                                        <div className="h-full bg-cta w-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between mb-2 text-sm text-text-light/80">
                                                        <span>Angielski (Tech)</span>
                                                        <span className="text-secondary">B2</span>
                                                    </div>
                                                    <div className="h-1 bg-background-dark border border-secondary/30 overflow-hidden">
                                                        <div className="h-full bg-secondary w-[75%] shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Interests */}
                                        <div>
                                            <h4 className="flex items-center gap-2 text-secondary text-sm mb-4 uppercase tracking-wider">
                                                <Terminal className="w-4 h-4" /> Interests
                                            </h4>
                                            <ul className="space-y-2 text-sm text-text-light/80">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-cta mt-0.5">&gt;</span>
                                                    Artificial intelligence & ML
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-cta mt-0.5">&gt;</span>
                                                    Sailing
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>


                    {/* --- EXPERIENCE SECTION --- */}
                    <motion.div variants={fadeIn} className="scroll-mt-24">
                        <div className="mb-12 border-b border-secondary/30 pb-6 md:flex justify-between items-end">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Briefcase className="text-secondary w-6 h-6" />
                                    <span className="font-mono text-secondary uppercase tracking-widest text-sm">Experience.log</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold">Work History</h2>
                            </div>
                            <p className="text-text-light/60 max-w-sm mt-6 md:mt-0 font-mono text-sm text-right">
                                Deployed features and architectural impact.
                            </p>
                        </div>

                        <div className="group relative bg-background-dark/80 backdrop-blur-sm border border-secondary/30 rounded-none p-8 md:p-12 shadow-[0_0_10px_rgba(6,182,212,0.05)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-secondary/80 transition-all duration-300">
                            {/* Hover sweep effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400 mb-2">
                                        Full Stack Developer Intern
                                    </h3>
                                    <div className="flex items-center gap-3 text-secondary/90 font-mono tracking-wide">
                                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                                        SIEMENS INDUSTRY SOFTWARE
                                    </div>
                                </div>
                                <div className="inline-block px-4 py-2 border border-secondary/40 bg-background-dark text-secondary text-sm font-mono whitespace-nowrap">
                                    July 2025 – Present
                                </div>
                            </div>

                            <ul className="space-y-4 text-text-light/80 font-mono text-base leading-relaxed relative z-10">
                                <li className="flex items-start gap-4">
                                    <span className="text-secondary mt-1 text-lg leading-none">▹</span>
                                    <span>Creating user interfaces based on HTML and JavaScript for a web application.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-secondary mt-1 text-lg leading-none">▹</span>
                                    <span>Implementation of complex backend functions and creating REST APIs using PHP and SQL.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-secondary mt-1 text-lg leading-none">▹</span>
                                    <span>Business logic implementation, application performance optimization and ensuring high code quality.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-secondary mt-1 text-lg leading-none">▹</span>
                                    <span>Working in a Scrum team, active participation in Daily Standup meetings.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-secondary mt-1 text-lg leading-none">▹</span>
                                    <span>Creating and conducting unit and end-to-end tests.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>


                    {/* --- EDUCATION SECTION --- */}
                    <motion.div variants={fadeIn} className="scroll-mt-24">
                        <div className="mb-12 border-b border-secondary/30 pb-6 md:flex justify-between items-end">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <GraduationCap className="text-cta w-6 h-6" />
                                    <span className="font-mono text-secondary uppercase tracking-widest text-sm">Education.dat</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold">Academic Core</h2>
                            </div>
                            <p className="text-text-light/60 max-w-sm mt-6 md:mt-0 font-mono text-sm text-right">
                                Foundational knowledge and theoretical structures.
                            </p>
                        </div>

                        <div className="group relative bg-background-dark/80 backdrop-blur-sm border border-cta/30 rounded-none p-8 md:p-12 shadow-[0_0_10px_rgba(34,197,94,0.05)] hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:border-cta/80 transition-all duration-300">
                            {/* Hover sweep effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cta/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cta to-emerald-200 mb-2">
                                        Computer Science Graduate
                                    </h3>
                                    <div className="flex items-center gap-3 text-cta/90 font-mono tracking-wide">
                                        <span className="w-1.5 h-1.5 bg-cta"></span>
                                        Jagiellonian University, Bachelor's Degree
                                    </div>
                                </div>
                                <div className="inline-block px-4 py-2 border border-cta/40 bg-background-dark text-cta text-sm font-mono whitespace-nowrap">
                                    Oct 2022 - Sep 2025
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>

                {/* GDPR Clause */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-32 text-center text-text-light/40 font-mono text-xs max-w-3xl mx-auto pb-12 border-t border-secondary/20 pt-8"
                >
                    <p className="hover:text-text-light/60 transition-colors">
                        I hereby give consent for my personal data included in my CV to be processed for the purposes of current and future recruitment processes conducted by the employer, in accordance with Regulation (EU) 2016/679 (GDPR).
                    </p>
                </motion.div>
            </div>

            {/* Custom animation class for the scanner */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { transform: translateY(-10px); opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { transform: translateY(180px); opacity: 0; }
                }
            `}} />
        </section>
    );
}
