import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import HackerTerminal from './HackerTerminal';
import HeroMatrixWebGL from './HeroMatrixWebGL';

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Decorative gradient glowing orb to tie in the 3D depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cta/5 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Hacker Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full flex justify-center lg:justify-start relative"
                    >
                        <div className="absolute inset-[-15%] md:inset-[-30%] -z-10 bg-background-dark/40 rounded-[3rem] blur-2xl" />
                        <div className="absolute inset-[-15%] md:inset-[-30%] -z-10">
                            <HeroMatrixWebGL />
                        </div>
                        <HackerTerminal />
                    </motion.div>

                    {/* Right Side: Hero Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col items-start lg:pl-12"
                    >
                        <div className="inline-block px-4 py-2 border border-cta/30 rounded-full bg-primary/20 backdrop-blur-sm mb-6 pointer-events-none neon-border">
                            <span className="text-cta font-mono text-sm leading-none neon-text">System Status: Online & Ready</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Engineering <br />
                            <span className="text-cta glitch-effect neon-text" data-text="Digital Realities">
                                Digital Realities
                            </span>
                        </h1>
                        <p className="text-xl text-text-light/70 mb-8 max-w-lg font-mono">
                            &gt; I'm a Frontend Developer specializing in high-performance web applications, interactive UI/UX, and creative coding.
                        </p>

                        <div className="flex flex-wrap gap-4 font-mono">
                            <a href="#projects" className="cursor-pointer bg-cta/10 text-cta border border-cta px-8 py-4 flex items-center gap-2 hover:bg-cta hover:text-background-dark transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] neon-border">
                                [ View Projects ]
                            </a>
                            <a href="#contact" className="cursor-pointer px-8 py-4 flex items-center gap-2 border border-secondary text-text-light hover:border-cta hover:text-cta transition-colors bg-primary/10 backdrop-blur-sm">
                                &gt; Initialize Contact_
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                <span className="text-xs uppercase tracking-widest text-secondary font-mono">Scroll</span>
                <ArrowDown className="text-cta w-5 h-5 opacity-80" />
            </motion.div>
        </section>
    );
}
