import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FolderGit2, Play, X } from 'lucide-react';

import portfolioImg from '../assets/portfolio.png';
import budohitImg from '../assets/budohit.png';
import twitterImg from '../assets/twitter.png';
import viviImg from '../assets/vivi.png';
import instagramImg from '../assets/instagram.png';

const projects = [
    {
        title: 'Portfolio Website',
        summary: 'This cyberpunk-themed developer portfolio — built with React, TypeScript and Framer Motion.',
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        image: portfolioImg,
        status: 'LIVE',
        github: 'https://github.com/TryTytus',
        link: '#'
    },
    {
        title: 'Budohit',
        summary: 'E-commerce website selling construction company tools and equipment.',
        tech: ['E-Commerce', 'React', 'Django', 'PostgreSQL', 'Web Development'],
        image: budohitImg,
        status: 'PRODUCTION',
        github: '',
        link: 'https://store.budohit.pl',
        externalLink: 'https://store.budohit.pl'
    },
    {
        title: 'Twitter-like Platform',
        summary: 'Features user authentication, post creation, search, and nested comments (tree structure similar to Reddit).',
        tech: ['Back-End', 'REST APIs', 'SQL', 'JavaScript'],
        image: twitterImg,
        status: 'Jun 2024 - Aug 2024',
        github: 'https://github.com/TryTytus',
        link: '#',
        videoLink: '/videos/twitter.mp4'
    },
    {
        title: 'Video Platform',
        summary: 'Supports Google login, video uploads, and comments.',
        tech: ['Back-End', 'REST APIs', 'Docker', 'SQL'],
        image: viviImg,
        status: 'May 2022 - Jun 2022',
        github: 'https://github.com/TryTytus',
        link: '#',
        videoLink: '/videos/vivi.mp4'
    },
    {
        title: 'Instagram Clone',
        summary: 'Includes profile browsing, posts, galleries, comments, and instant messaging.',
        tech: ['Back-End', 'Front-End', 'JavaScript', 'SQL'],
        image: instagramImg,
        status: 'Aug 2021 - Nov 2021',
        github: 'https://github.com/TryTytus',
        link: '#',
        videoLink: '/videos/instagram.mp4'
    }
];

export default function Projects() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const handleProjectClick = (project: typeof projects[0]) => {
        if (project.externalLink) {
            window.open(project.externalLink, '_blank', 'noopener,noreferrer');
        } else if (project.videoLink) {
            setSelectedVideo(project.videoLink);
        }
    };
    return (
        <section id="projects" className="relative min-h-screen py-24 bg-transparent border-t border-cta/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

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
                            className="group relative rounded-none border border-cta/30 bg-background-dark/80 backdrop-blur-sm shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all cursor-pointer z-50"
                            onClick={() => handleProjectClick(project)}
                        >
                            {/* Image / Gradient Placeholder area */}
                            <div className="h-64 w-full border-b border-cta/30 bg-primary/20 relative overflow-hidden flex items-center justify-center">
                                {/* The dark overlay matching the global theme */}
                                <div className="absolute inset-0 bg-transparent transition-colors duration-500 z-10" />

                                {project.videoLink && (
                                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-16 h-16 rounded-full bg-cta/20 border border-cta backdrop-blur-sm flex items-center justify-center text-cta shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                                            <Play className="w-6 h-6 ml-1" />
                                        </div>
                                    </div>
                                )}
                                {project.externalLink && (
                                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-16 h-16 rounded-full bg-cta/20 border border-cta backdrop-blur-sm flex items-center justify-center text-cta shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                                            <ExternalLink className="w-6 h-6" />
                                        </div>
                                    </div>
                                )}

                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover object-top opacity-100 transition-all duration-700 pointer-events-none"
                                    />
                                ) : (
                                    <span className="font-mono text-4xl text-cta/20 font-bold select-none rotate-[-10deg] scale-150 group-hover:scale-110 transition-transform duration-700 ease-out z-0">
                                        {project.title.toUpperCase()}
                                    </span>
                                )}

                                {/* Overlay Status Badge */}
                                <div className="absolute top-4 left-4 border border-cta/50 bg-background-dark/90 px-3 py-1 text-xs font-mono text-cta z-20">
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
                                        {/* {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="z-10 relative">
                                                <Github className="w-5 h-5 hover:text-cta" />
                                            </a>
                                        )} */}
                                        {project.link !== '#' && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="z-10 relative">
                                                <ExternalLink className="w-5 h-5 hover:text-cta" />
                                            </a>
                                        )}
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

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-background-dark/95 backdrop-blur-md"
                        onClick={() => setSelectedVideo(null)}
                    >
                        {/* Decorative scanlines */}
                        <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIsPjwscmVjdD4KPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iMiIgZmlsbD0icmdiYSgwLCAwLCAwLCAxKSI+PC9yZWN0Pgo8L3N2Zz4=')] mix-blend-overlay opacity-20 z-0"></div>

                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl aspect-video bg-black border border-cta/30 shadow-[0_0_50px_rgba(34,197,94,0.15)] rounded-xl overflow-hidden neon-border z-10"
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 z-50 p-2 bg-background-dark/80 border border-cta/50 hover:bg-cta hover:text-background-dark text-cta rounded-full transition-colors duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                aria-label="Close video"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <video
                                src={selectedVideo}
                                className="w-full h-full object-contain bg-black z-10 relative"
                                controls
                                autoPlay
                                playsInline
                            >
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
