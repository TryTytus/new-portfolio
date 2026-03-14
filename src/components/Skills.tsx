import { motion } from 'framer-motion';
import { Terminal, Database, Layout, Server, Shield, Smartphone } from 'lucide-react';

const skillsData = [
    { category: 'Frontend Architecture', icon: Layout, tech: ['React', 'Next.js', 'Tailwind', 'Framer Motion'] },
    { category: 'Backend Systems', icon: Server, tech: ['Node.js', 'Express', 'PostgreSQL', 'Redis'] },
    { category: 'Cloud & DevOps', icon: Database, tech: ['AWS', 'Docker', 'CI/CD', 'Vercel'] },
    { category: 'Mobile Dev', icon: Smartphone, tech: ['React Native', 'Expo', 'SwiftUI', 'Kotlin'] },
    { category: 'Security', icon: Shield, tech: ['OAuth 2.0', 'JWT', 'Pen Testing', 'WebCrypto API'] },
];

export default function Skills() {
    return (
        <section id="skills" className="relative min-h-screen py-24 bg-transparent border-t border-cta/10 overflow-hidden">

            {/* Decorative Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(var(--color-cta) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:flex justify-between items-end border-b border-secondary/30 pb-6"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Terminal className="text-cta w-6 h-6" />
                            <span className="font-mono bg-cta/20 text-cta border border-cta/40 px-2 py-0.5 text-xs uppercase tracking-widest">Tech_Stack.md</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">Skills & Technologies</h2>
                    </div>
                    <p className="text-text-light/60 max-w-sm mt-6 md:mt-0 font-mono text-sm">
                        Core competencies bridging creative design and robust system engineering.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-background-dark/80 backdrop-blur-sm border border-cta/30 rounded-none p-6 shadow-[0_0_10px_rgba(34,197,94,0.05)] hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:border-cta/80 transition-all duration-300"
                        >
                            {/* Hover sweep effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cta/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-background-dark rounded-lg border border-secondary/50 text-cta group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300">
                                    <skill.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">{skill.category}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {skill.tech.map(t => (
                                    <span
                                        key={t}
                                        className="px-3 py-1 bg-background-dark/80 border border-secondary/30 rounded-md text-sm font-mono text-text-light/80 group-hover:border-secondary/60 transition-colors"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
