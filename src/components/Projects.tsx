import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';

const projects = [
    {
        title: 'Portfolio Website',
        summary: 'This cyberpunk-themed developer portfolio — built with React, TypeScript and Framer Motion.',
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        image: 'border-b border-cta/30 bg-primary/20',
        status: 'LIVE',
        github: 'https://github.com/TryTytus',
        link: '#'
    },
    {
        title: 'REST API — PHP/SQL',
        summary: 'Backend REST API built at Siemens: complex business logic, query optimisation and unit tests.',
        tech: ['PHP', 'SQL', 'REST API', 'PHPUnit'],
        image: 'border-b border-cta/30 bg-primary/20',
        status: 'PRODUCTION',
        github: 'https://github.com/TryTytus',
        link: '#'
    },
    {
        title: 'Full Stack Web App',
        summary: 'End-to-end web application with Laravel backend and Vue.js frontend, integrated via REST.',
        tech: ['Laravel', 'Vue 3', 'MySQL', 'Docker'],
        image: 'border-b border-cta/30 bg-primary/20',
        status: 'DEPLOYED',
        github: 'https://github.com/TryTytus',
        link: '#'
    },
    {
        title: 'Spring Boot Microservice',
        summary: 'Java microservice with Spring Boot exposing REST endpoints and Dockerised for deployment.',
        tech: ['Java', 'Spring Boot', 'Docker', 'PostgreSQL'],
        image: 'border-b border-cta/30 bg-primary/20',
        status: 'V1.0',
        github: 'https://github.com/TryTytus',
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
                            <span className="bg-cta/20 text-cta border border-cta/40 px-2 py-0.5 text-xs uppercase tracking-widest font-mono">Deployments.log</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
                    </div>
                    <a href="https://github.com/TryTytus" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 text-cta hover:text-emerald-400 font-mono text-sm mt-6 border-b border-cta/30 hover:border-cta transition-colors pb-1">
                        github.com/TryTytus <ExternalLink className="w-4 h-4" />
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
                                        <a href={project.github} target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 hover:text-cta" /></a>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-5 h-5 hover:text-cta" /></a>
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

                <a href="https://github.com/TryTytus" target="_blank" rel="noopener noreferrer" className="md:hidden inline-flex items-center gap-2 text-cta hover:text-emerald-400 font-mono text-sm mt-8 border-b border-cta/30 transition-colors pb-1">
                    github.com/TryTytus <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </section>
    );
}
