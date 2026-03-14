import { motion } from 'framer-motion';
import { Terminal, Briefcase, GraduationCap, Mail, MapPin, Phone, Github } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function CyberCV() {
    return (
        <section id="cv" className="relative min-h-screen py-24 bg-transparent border-t border-cta/10 overflow-hidden font-mono">
            {/* Decorative grid matching Skills.tsx */}
            <div
                className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(var(--color-cta) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={stagger}
                    className="space-y-20"
                >

                    {/* ── ABOUT ─────────────────────────────── */}
                    <motion.div variants={fadeIn}>
                        {/* Section header — matches Skills.tsx */}
                        <div className="mb-10 border-b border-secondary/30 pb-6 md:flex justify-between items-end">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Terminal className="text-cta w-6 h-6" />
                                    <span className="text-secondary uppercase tracking-widest text-sm">Profile.md</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold">About</h2>
                            </div>
                        </div>

                        {/* Contact row */}
                        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 text-sm text-text-light/60">
                            <a href="tel:+48518257053" className="flex items-center gap-2 hover:text-cta transition-colors">
                                <Phone className="w-4 h-4" /> +48 518 257 053
                            </a>
                            <a href="mailto:adamtyton1@gmail.com" className="flex items-center gap-2 hover:text-cta transition-colors">
                                <Mail className="w-4 h-4" /> adamtyton1@gmail.com
                            </a>
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Katowice, PL
                            </span>
                            <a href="https://github.com/TryTytus" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cta transition-colors">
                                <Github className="w-4 h-4" /> github.com/TryTytus
                            </a>
                        </div>

                        {/* Name + bio */}
                        <h3 className="text-2xl font-bold text-cta mb-1">Adam Tytoń</h3>
                        <p className="text-text-light/50 text-sm mb-4 tracking-wider uppercase">&lt; Software_Developer /&gt;</p>
                        <p className="text-text-light/75 text-base leading-relaxed max-w-2xl mb-10">
                            Full Stack Developer at Siemens. I build efficient REST APIs with PHP and SQL and craft
                            frontend interfaces with JavaScript. Comfortable in Scrum teams, passionate about clean code.
                        </p>

                        {/* Languages & Interests as simple two-col */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div>
                                <h4 className="text-secondary text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Terminal className="w-4 h-4" /> Languages
                                </h4>
                                <div className="space-y-3 text-sm text-text-light/75">
                                    <div className="flex justify-between border-b border-secondary/20 pb-2">
                                        <span>Polski</span>
                                        <span className="text-cta">Native</span>
                                    </div>
                                    <div className="flex justify-between border-b border-secondary/20 pb-2">
                                        <span>Angielski (Tech)</span>
                                        <span className="text-text-light/50">B2</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-secondary text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Terminal className="w-4 h-4" /> Interests
                                </h4>
                                <ul className="space-y-2 text-sm text-text-light/75">
                                    <li className="flex items-start gap-2"><span className="text-cta">&gt;</span> Artificial Intelligence &amp; ML</li>
                                    <li className="flex items-start gap-2"><span className="text-cta">&gt;</span> Sailing</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>


                    {/* ── EXPERIENCE ────────────────────────── */}
                    <motion.div variants={fadeIn}>
                        <div className="mb-10 border-b border-secondary/30 pb-6 md:flex justify-between items-end">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Briefcase className="text-cta w-6 h-6" />
                                    <span className="text-secondary uppercase tracking-widest text-sm">Experience.log</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold">Work History</h2>
                            </div>
                        </div>

                        {/* Single entry — no box, just inner dividers */}
                        <div className="space-y-1 mb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <h3 className="text-xl font-bold text-text-light">Full Stack Developer Intern</h3>
                                <span className="text-text-light/40 text-sm whitespace-nowrap">Jul 2025 – Present</span>
                            </div>
                            <p className="text-cta text-sm tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-cta inline-block" />
                                SIEMENS INDUSTRY SOFTWARE
                            </p>
                        </div>
                        <ul className="space-y-3 text-text-light/70 text-sm leading-relaxed pl-4 border-l border-secondary/30">
                            <li className="flex items-start gap-3"><span className="text-cta mt-0.5">▹</span> Creating user interfaces with HTML and JavaScript for a web application.</li>
                            <li className="flex items-start gap-3"><span className="text-cta mt-0.5">▹</span> Building REST APIs and complex backend logic using PHP and SQL.</li>
                            <li className="flex items-start gap-3"><span className="text-cta mt-0.5">▹</span> Performance optimisation and ensuring high code quality.</li>
                            <li className="flex items-start gap-3"><span className="text-cta mt-0.5">▹</span> Agile Scrum team — daily standups, sprint planning.</li>
                            <li className="flex items-start gap-3"><span className="text-cta mt-0.5">▹</span> Writing unit and end-to-end tests.</li>
                        </ul>
                    </motion.div>


                    {/* ── EDUCATION ─────────────────────────── */}
                    <motion.div variants={fadeIn}>
                        <div className="mb-10 border-b border-secondary/30 pb-6 md:flex justify-between items-end">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <GraduationCap className="text-cta w-6 h-6" />
                                    <span className="text-secondary uppercase tracking-widest text-sm">Education.dat</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold">Academic Core</h2>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <h3 className="text-xl font-bold text-text-light">Computer Science — Bachelor's Degree</h3>
                                <span className="text-text-light/40 text-sm whitespace-nowrap">Oct 2022 – Sep 2025</span>
                            </div>
                            <p className="text-cta text-sm tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-cta inline-block" />
                                Jagiellonian University
                            </p>
                        </div>
                    </motion.div>

                </motion.div>

                {/* GDPR */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-24 pb-12 border-t border-secondary/20 pt-8 text-center text-text-light/30 text-xs max-w-3xl mx-auto hover:text-text-light/50 transition-colors"
                >
                    I hereby give consent for my personal data included in my CV to be processed for the purposes of current
                    and future recruitment processes, in accordance with Regulation (EU) 2016/679 (GDPR).
                </motion.p>
            </div>
        </section>
    );
}
