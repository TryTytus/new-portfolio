import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        handleScroll(); // Init
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-background-dark/80 backdrop-blur-md border-b border-cta/30 py-4 neon-border' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <a href="#home" className="flex items-center gap-2 cursor-pointer group">
                        <Terminal className="text-cta w-8 h-8 group-hover:text-emerald-400 transition-colors" />
                        <span className="font-heading font-bold text-xl tracking-tighter">
                            ADAM<span className="text-cta">_</span>TYTOŃ
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-text-light/80 hover:text-cta transition-colors duration-200 font-medium text-sm tracking-wide"
                            >
                                {/* Simulated code style */}
                                <span className="text-secondary/60">{'<'}</span>
                                {link.name}
                                <span className="text-secondary/60">{'/>'}</span>
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-text-light hover:text-cta transition-colors cursor-pointer"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <motion.div
                className={`md:hidden absolute w-full bg-background-dark/95 backdrop-blur-md border-b border-cta/30 neon-border overflow-hidden`}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { height: 'auto', opacity: 1 },
                    closed: { height: 0, opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-text-light/80 hover:text-cta transition-colors duration-200 font-medium text-lg w-full text-center py-2 cursor-pointer"
                        >
                            <span className="text-secondary/60">{'<'}</span>
                            {link.name}
                            <span className="text-secondary/60">{'/>'}</span>
                        </a>
                    ))}
                </div>
            </motion.div>
        </motion.nav>
    );
}
