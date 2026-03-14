import { motion } from 'framer-motion';
import { Terminal, Briefcase, GraduationCap, Code2, Database, Wrench, Mail, MapPin, Phone, Github } from 'lucide-react';

export default function CyberCV() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
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
        <section id="cv" className="relative min-h-screen bg-[#050505] border-y border-emerald-900/30 py-24 overflow-hidden font-mono">
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.15)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
                {/* Glowing orbs */}
                <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                >
                    {/* Left Sidebar (Profile Info) */}
                    <motion.div variants={fadeIn} className="lg:col-span-4 space-y-8">
                        {/* Profile Card */}
                        <div className="border border-emerald-500/30 bg-[#0a0f0d]/80 backdrop-blur-xl rounded-xl p-8 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>

                            {/* Photo Placeholder */}
                            <div className="relative w-56 h-56 mx-auto mb-8 rounded-lg overflow-hidden border border-emerald-500/50 bg-emerald-950/40 group-hover:border-emerald-400 transition-colors duration-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-500/80 font-mono">
                                    <div className="mb-2 opacity-60 flex flex-col items-center">
                                        <div className="w-16 h-16 border-2 border-emerald-500/50 border-dashed rounded-full animate-[spin_10s_linear_infinite] mb-4"></div>
                                        <span>[INSERT_PHOTO]</span>
                                    </div>
                                    <div className="text-xs opacity-50">Adam_Tytoń.jpg</div>
                                </div>
                                {/* Scanning line effect */}
                                <div className="absolute top-0 left-0 w-full h-4 bg-emerald-400/20 blur-sm group-hover:animate-scan opacity-0 group-hover:opacity-100"></div>
                                {/* CRT Flicker */}
                                <div className="absolute inset-0 bg-emerald-500/5 mix-blend-overlay animate-pulse"></div>
                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]">
                                    Adam Tytoń
                                </h2>
                                <p className="text-emerald-400 font-mono text-sm mt-3 px-4 py-1.5 border border-emerald-500/30 rounded-full inline-block bg-emerald-900/20">
                                    &lt;Software Developer /&gt;
                                </p>
                            </div>

                            <div className="space-y-5 font-mono text-sm text-gray-300">
                                <div className="flex items-center gap-4 hover:text-emerald-300 transition-colors group/item">
                                    <div className="p-2 border border-emerald-500/30 rounded bg-emerald-950/50 group-hover/item:border-emerald-400 transition-colors">
                                        <Phone className="w-4 h-4 text-emerald-500 group-hover/item:text-emerald-400" />
                                    </div>
                                    <span>+48 518 257 053</span>
                                </div>
                                <div className="flex items-center gap-4 hover:text-emerald-300 transition-colors group/item">
                                    <div className="p-2 border border-emerald-500/30 rounded bg-emerald-950/50 group-hover/item:border-emerald-400 transition-colors">
                                        <Mail className="w-4 h-4 text-emerald-500 group-hover/item:text-emerald-400" />
                                    </div>
                                    <a href="mailto:adamtyton1@gmail.com">adamtyton1@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-4 hover:text-emerald-300 transition-colors group/item">
                                    <div className="p-2 border border-emerald-500/30 rounded bg-emerald-950/50 group-hover/item:border-emerald-400 transition-colors">
                                        <MapPin className="w-4 h-4 text-emerald-500 group-hover/item:text-emerald-400" />
                                    </div>
                                    <span>Grodowa 30C, Katowice</span>
                                </div>
                                <div className="flex items-center gap-4 hover:text-emerald-300 transition-colors group/item">
                                    <div className="p-2 border border-emerald-500/30 rounded bg-emerald-950/50 group-hover/item:border-emerald-400 transition-colors">
                                        <Github className="w-4 h-4 text-emerald-500 group-hover/item:text-emerald-400" />
                                    </div>
                                    <a href="https://github.com/TryTytus" target="_blank" rel="noopener noreferrer">github.com/TryTytus</a>
                                </div>
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="border border-emerald-500/20 bg-[#0a0f0d]/60 backdrop-blur-md rounded-xl p-6 shadow-lg">
                            <h3 className="text-emerald-400 font-mono text-sm mb-5 flex items-center gap-2 uppercase tracking-wider">
                                <Terminal className="w-4 h-4" />
                                <span>~/skills/languages.sh</span>
                            </h3>
                            <div className="space-y-4 font-mono text-sm text-gray-300">
                                <div className="group">
                                    <div className="flex justify-between mb-2">
                                        <span>Polski</span>
                                        <span className="text-emerald-500">Native</span>
                                    </div>
                                    <div className="h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-900/50">
                                        <div className="h-full bg-emerald-500 w-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                                    </div>
                                </div>
                                <div className="group">
                                    <div className="flex justify-between mb-2">
                                        <span>Angielski (Technical)</span>
                                        <span className="text-cyan-500">B2</span>
                                    </div>
                                    <div className="h-1.5 bg-cyan-950 rounded-full overflow-hidden border border-cyan-900/50">
                                        <div className="h-full bg-cyan-500 w-[75%] shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interests */}
                        <div className="border border-emerald-500/20 bg-[#0a0f0d]/60 backdrop-blur-md rounded-xl p-6 shadow-lg">
                            <h3 className="text-emerald-400 font-mono text-sm mb-5 flex items-center gap-2 uppercase tracking-wider">
                                <Terminal className="w-4 h-4" />
                                <span>~/personal/interests.txt</span>
                            </h3>
                            <ul className="space-y-3 font-mono text-sm text-gray-300">
                                <li className="flex items-start gap-3 p-2 hover:bg-emerald-900/20 rounded transition-colors">
                                    <span className="text-emerald-500 mt-0.5">&gt;</span>
                                    Artificial intelligence and machine learning
                                </li>
                                <li className="flex items-start gap-3 p-2 hover:bg-emerald-900/20 rounded transition-colors">
                                    <span className="text-emerald-500 mt-0.5">&gt;</span>
                                    Sailing
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Right Content Area */}
                    <motion.div variants={fadeIn} className="lg:col-span-8 space-y-10">
                        {/* Profile Section */}
                        <div className="relative border-l-2 border-emerald-500/50 pl-8 py-2">
                            <div className="absolute w-4 h-4 bg-[#050505] border-2 border-emerald-500 rounded-full -left-[9px] top-3 shadow-[0_0_15px_rgba(16,185,129,1)]"></div>
                            <h3 className="text-2xl lg:text-3xl font-bold font-mono text-white mb-6 flex items-center gap-3">
                                <Terminal className="w-7 h-7 text-emerald-400" />
                                PROFILE_OBJECTIVE
                            </h3>
                            <div className="bg-[#0a0f0d]/80 backdrop-blur-md border border-emerald-500/20 p-6 lg:p-8 rounded-xl shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] text-gray-300 text-lg leading-relaxed font-mono relative overflow-hidden group">
                                <div className="absolute left-0 top-0 w-1 h-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors"></div>
                                I am a Full Stack Developer at Siemens, where I am responsible for web application development.
                                My daily work involves creating efficient APIs based on PHP and SQL and frontend development using JavaScript.
                            </div>
                        </div>

                        {/* Experience Section */}
                        <div className="relative border-l-2 border-cyan-500/50 pl-8 py-2">
                            <div className="absolute w-4 h-4 bg-[#050505] border-2 border-cyan-500 rounded-full -left-[9px] top-3 shadow-[0_0_15px_rgba(6,182,212,1)]"></div>
                            <h3 className="text-2xl lg:text-3xl font-bold font-mono text-white mb-6 flex items-center gap-3">
                                <Briefcase className="w-7 h-7 text-cyan-400" />
                                WORK_EXPERIENCE
                            </h3>

                            <div className="border border-cyan-500/20 bg-[#0a0f0d]/60 backdrop-blur-md rounded-xl p-6 lg:p-8 hover:border-cyan-500/50 transition-all duration-300 group shadow-[0_0_20px_rgba(6,182,212,0.05)] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
                                {/* Decorative background accent */}
                                <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
                                    <div>
                                        <h4 className="text-2xl font-bold text-cyan-300 font-mono group-hover:text-cyan-200 transition-colors">
                                            Full Stack Developer Intern
                                        </h4>
                                        <div className="text-cyan-500/80 font-mono text-sm mt-2 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                                            SIEMENS INDUSTRY SOFTWARE
                                        </div>
                                    </div>
                                    <div className="px-4 py-1.5 bg-cyan-950/50 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-mono whitespace-nowrap shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                                        July 2025 – Present
                                    </div>
                                </div>
                                <ul className="space-y-4 text-gray-300 font-mono text-sm lg:text-base leading-relaxed relative z-10">
                                    <li className="flex items-start gap-3 bg-cyan-900/10 p-3 rounded-lg border border-cyan-500/5">
                                        <span className="text-cyan-500 mt-1">▹</span>
                                        <span className="flex-1">Creating user interfaces based on HTML and JavaScript for a web application</span>
                                    </li>
                                    <li className="flex items-start gap-3 bg-cyan-900/10 p-3 rounded-lg border border-cyan-500/5">
                                        <span className="text-cyan-500 mt-1">▹</span>
                                        <span className="flex-1">Implementation of complex backend functions and creating REST APIs using PHP and SQL</span>
                                    </li>
                                    <li className="flex items-start gap-3 bg-cyan-900/10 p-3 rounded-lg border border-cyan-500/5">
                                        <span className="text-cyan-500 mt-1">▹</span>
                                        <span className="flex-1">Business logic implementation, application performance optimization and ensuring high code quality</span>
                                    </li>
                                    <li className="flex items-start gap-3 bg-cyan-900/10 p-3 rounded-lg border border-cyan-500/5">
                                        <span className="text-cyan-500 mt-1">▹</span>
                                        <span className="flex-1">Working in a Scrum team, active participation in Daily Standup meetings</span>
                                    </li>
                                    <li className="flex items-start gap-3 bg-cyan-900/10 p-3 rounded-lg border border-cyan-500/5">
                                        <span className="text-cyan-500 mt-1">▹</span>
                                        <span className="flex-1">Creating and conducting unit and end-to-end tests</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Technologies Section */}
                        <div className="relative border-l-2 border-emerald-500/50 pl-8 py-2">
                            <div className="absolute w-4 h-4 bg-[#050505] border-2 border-emerald-500 rounded-full -left-[9px] top-3 shadow-[0_0_15px_rgba(16,185,129,1)]"></div>
                            <h3 className="text-2xl lg:text-3xl font-bold font-mono text-white mb-6 flex items-center gap-3">
                                <Code2 className="w-7 h-7 text-emerald-400" />
                                TECHNOLOGIES_STACK
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Backend */}
                                <div className="border border-emerald-500/20 bg-[#0a0f0d]/60 backdrop-blur-md rounded-xl p-6 lg:p-8 hover:border-emerald-500/40 transition-colors">
                                    <h4 className="text-emerald-400 font-mono text-sm mb-5 flex items-center gap-2 uppercase tracking-wider">
                                        <Database className="w-4 h-4" />
                                        <span>Backend Tech</span>
                                    </h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {['PHP', 'SQL', 'Laravel', 'Node.js', 'Python', 'Java', 'Spring Boot', 'Express.js'].map(tech => (
                                            <span key={tech} className="px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/30 rounded-md text-gray-300 text-sm font-mono hover:bg-emerald-500/20 hover:border-emerald-400 hover:text-white hover:-translate-y-0.5 transition-all cursor-default shadow-[0_0_10px_rgba(16,185,129,0.05)] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Frontend */}
                                <div className="border border-cyan-500/20 bg-[#0a0f0d]/60 backdrop-blur-md rounded-xl p-6 lg:p-8 hover:border-cyan-500/40 transition-colors">
                                    <h4 className="text-cyan-400 font-mono text-sm mb-5 flex items-center gap-2 uppercase tracking-wider">
                                        <Terminal className="w-4 h-4" />
                                        <span>Frontend Tech</span>
                                    </h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {['React', 'Javascript', 'Typescript', 'Vue', 'HTML', 'CSS', 'Tailwindcss', 'Nuxt.js', 'Alpine.js', 'JQuery'].map(tech => (
                                            <span key={tech} className="px-3 py-1.5 bg-cyan-950/40 border border-cyan-500/30 rounded-md text-gray-300 text-sm font-mono hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:-translate-y-0.5 transition-all cursor-default shadow-[0_0_10px_rgba(6,182,212,0.05)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Additional */}
                                <div className="border border-emerald-500/20 bg-[#0a0f0d]/60 backdrop-blur-md rounded-xl p-6 lg:p-8 md:col-span-2 hover:border-emerald-500/40 transition-colors">
                                    <h4 className="text-emerald-400 font-mono text-sm mb-5 flex items-center gap-2 uppercase tracking-wider">
                                        <Wrench className="w-4 h-4" />
                                        <span>Additional Skills</span>
                                    </h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {['Bash', 'Docker', 'Git'].map(tech => (
                                            <span key={tech} className="px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/30 rounded-md text-gray-300 text-sm font-mono hover:bg-emerald-500/20 hover:border-emerald-400 hover:text-white hover:-translate-y-0.5 transition-all cursor-default shadow-[0_0_10px_rgba(16,185,129,0.05)] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Education Section */}
                        <div className="relative border-l-2 border-cyan-500/50 pl-8 py-2">
                            <div className="absolute w-4 h-4 bg-[#050505] border-2 border-cyan-500 rounded-full -left-[9px] top-3 shadow-[0_0_15px_rgba(6,182,212,1)]"></div>
                            <h3 className="text-2xl lg:text-3xl font-bold font-mono text-white mb-6 flex items-center gap-3">
                                <GraduationCap className="w-7 h-7 text-cyan-400" />
                                EDUCATION_LOG
                            </h3>

                            <div className="border border-cyan-500/20 bg-[#0a0f0d]/60 backdrop-blur-md rounded-xl p-6 lg:p-8 hover:border-cyan-500/50 transition-colors group shadow-[0_0_20px_rgba(6,182,212,0.05)]">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                    <div>
                                        <h4 className="text-2xl font-bold text-cyan-300 font-mono group-hover:text-cyan-200 transition-colors">
                                            Computer Science Graduate
                                        </h4>
                                        <div className="text-cyan-500/80 font-mono text-sm mt-2 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                                            Jagiellonian University, Bachelor's Degree, UJ
                                        </div>
                                    </div>
                                    <div className="px-4 py-1.5 bg-cyan-950/50 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-mono whitespace-nowrap inline-flex items-center shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                                        Oct 2022 - Sep 2025
                                    </div>
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
                    transition={{ delay: 1 }}
                    className="mt-20 text-center text-gray-500 font-mono text-xs max-w-4xl mx-auto pb-4 border-t border-emerald-900/30 pt-8"
                >
                    <p className="hover:text-gray-400 transition-colors">
                        I hereby give consent for my personal data included in my CV to be processed for the purposes of current and future recruitment processes conducted by the employer, in accordance with Regulation (EU) 2016/679 (GDPR).
                    </p>
                </motion.div>
            </div>

            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIsPjwscmVjdD4KPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iMiIgZmlsbD0icmdiYSgwLCAwLCAwLCAwLjE1KSI+PC9yZWN0Pgo8L3N2Zz4=')] opacity-[0.15] mix-blend-overlay z-20"></div>

            {/* Custom animation class for the scanner */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { transform: translateY(-10px); opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { transform: translateY(220px); opacity: 0; }
                }
                .animate-scan {
                    animation: scan 2.5s ease-in-out infinite;
                }
            `}} />
        </section>
    );
}
