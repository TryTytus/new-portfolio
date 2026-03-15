import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-cta/30 bg-background-dark py-12 neon-border relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="font-heading font-bold text-xl tracking-tighter">
                            ADAM<span className="text-cta">_</span>TYTOŃ
                        </span>
                        <span className="text-text-light/50 font-mono text-sm">
                            © {currentYear} System Operating Normally.
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <SocialLink href="https://github.com/trytytus" icon={Github} />
                        <SocialLink href="https://www.linkedin.com/in/adam-tyton/" icon={Linkedin} />
                        <SocialLink href="mailto:adamtyton1@gmail.com" icon={Mail} />
                    </div>

                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
    return (
        <a
            href={href}
            className="text-secondary hover:text-cta transition-colors duration-300 p-2 hover:bg-cta/10 rounded-full"
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}
