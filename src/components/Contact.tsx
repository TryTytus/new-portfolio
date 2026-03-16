import { motion } from 'framer-motion';
import { Send, TerminalSquare } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
    const [state, handleSubmit] = useForm("mkoqqkjq");

    return (
        <section id="contact" className="relative min-h-screen py-24 bg-transparent border-t border-cta/10 flex items-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-background-dark/80 backdrop-blur-md border border-cta/30 rounded-none overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.1)] neon-border"
                >
                    {/* Terminal Header */}
                    <div className="bg-primary/20 px-4 py-3 flex items-center justify-between border-b border-cta/30">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-cta/80 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                        </div>
                        <div className="text-cta font-mono text-xs flex items-center gap-2 drop-shadow-md">
                            <TerminalSquare className="w-4 h-4" />
                            ~/contact/send_message.sh
                        </div>
                        <div className="w-10"></div> {/* Spacer to center title */}
                    </div>

                    {/* Form Content */}
                    <div className="p-8 md:p-12">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2">Initialize Connection</h2>
                            <p className="text-text-light/60 font-mono text-sm">
                                System awaiting input parameters. Transmission securely routed.
                            </p>
                        </div>

                        {state.succeeded ? (
                            <div className="p-6 border border-cta/30 bg-cta/10 text-cta font-mono text-center neon-border">
                                Transmission successful. Awaiting system response.
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-mono text-cta flex items-center gap-2">
                                            <span className="text-secondary">{'>'}</span> Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            className="w-full bg-background-dark/50 border border-cta/30 rounded-none p-3 text-text-light focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-all font-mono"
                                            placeholder="Enter identifier..."
                                        />
                                        <ValidationError prefix="Name" field="name" errors={state.errors} />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-mono text-cta flex items-center gap-2">
                                            <span className="text-secondary">{'>'}</span> Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="w-full bg-background-dark/50 border border-cta/30 rounded-none p-3 text-text-light focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-all font-mono"
                                            placeholder="Enter return address..."
                                        />
                                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-mono text-cta flex items-center gap-2">
                                        <span className="text-secondary">{'>'}</span> Payload
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        className="w-full bg-background-dark/50 border border-cta/30 rounded-none p-3 text-text-light focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta transition-all resize-none font-mono"
                                        placeholder="Enter transmission payload..."
                                    ></textarea>
                                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={state.submitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-cta/10 text-cta border border-cta font-bold py-4 rounded-none flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:bg-cta hover:text-background-dark transition-all neon-border disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5" />
                                    {state.submitting ? 'EXECUTING...' : 'EXECUTE_SEND'}
                                </motion.button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
