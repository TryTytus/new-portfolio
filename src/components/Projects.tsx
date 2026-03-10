import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';

const projects = [
    {
        title: 'Neon E-Commerce',
        summary: 'A high-performance headless commerce storefront.',
        tech: ['Next.js', 'Stripe', 'Tailwind', 'Zustand'],
        image: 'border-b border-cta/30 bg-primary/20',
        status: 'PRODUCTION',
        link: '#'
    },
    {
        title: 'Defi Dashboard',
        summary: 'Real-time crypto portfolio tracker with Web3 integration.',
        tech: ['React', 'Ethers.js', 'Recharts', 'Framer Motion'],
        image: 'border-b border-cta/30 bg-primary/20',
        status: 'BETA',
        link: '#'
    },
    {
        title: 'AI Prompt Engine',
        summary: 'SaaS tool for generating and testing LLM prompts.',
        tech: ['Vue 3', 'Node.js', 'OpenAI', 'Redis'],
        image: 'border-b border-cta/30 bg-primary/20',
        status: 'V1.2',
        link: '#'
    },
    {
        title: 'Nexus UI Core',
        summary: 'Open-source accessible component library.',
        tech: ['React', 'Radix UI', 'Storybook', 'Vite'],
        image: 'border-b border-cta/30 bg-primary/20',
        status: 'RELEASE',
        link: '#'
    }
];

export default function Projects() {
    return (
        <section id="projects" className="relative min-h-screen py-24 bg-transparent border-t border-cta/10">
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
                            <FolderGit2 className="text-cta w-6 h-6" />
                            <span className="font-mono text-secondary uppercase tracking-widest text-sm">Deployments.log</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
                    </div>
                    <a href="#" className="hidden md:inline-flex items-center gap-2 text-cta hover:text-emerald-400 font-mono text-sm mt-6 border-b border-cta/30 hover:border-cta transition-colors pb-1">
                        View Github Repository <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            className="group relative rounded-none border border-cta/30 bg-background-dark/80 backdrop-blur-sm shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all cursor-pointer"
                        >
                            {/* Image / Gradient Placeholder area */}
                            <div className={`h-64 w-full ${project.image} relative overflow-hidden flex items-center justify-center`}>
                                <div className="absolute inset-0 bg-background-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                                <span className="font-mono text-4xl text-cta/20 font-bold select-none rotate-[-10deg] scale-150 group-hover:scale-110 transition-transform duration-700 ease-out">{project.title.toUpperCase()}</span>

                                {/* Overlay Status Badge */}
                                <div className="absolute top-4 left-4 border border-cta/50 bg-background-dark/90 px-3 py-1 text-xs font-mono text-cta">
                                    [{project.status}]
                                </div>
                            </div>

                            {/* Content area */}
                            <div className="p-6 relative">
                                {/* Hover line glow effect */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cta/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold group-hover:text-cta transition-colors">{project.title}</h3>
                                    <div className="flex gap-3 text-secondary group-hover:text-text-light transition-colors">
                                        <Github className="w-5 h-5 hover:text-cta" />
                                        <ExternalLink className="w-5 h-5 hover:text-cta" />
                                    </div>
                                </div>

                                <p className="text-text-light/70 mb-6 min-h-[48px]">
                                    {project.summary}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="px-2 py-1 bg-primary/30 rounded text-xs font-mono text-secondary group-hover:text-text-light/90 transition-colors"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <a href="#" className="md:hidden inline-flex items-center gap-2 text-cta hover:text-emerald-400 font-mono text-sm mt-8 border-b border-cta/30 transition-colors pb-1">
                    View Github Repository <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </section>
    );
}
