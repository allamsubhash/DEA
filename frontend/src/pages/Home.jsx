import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, ArrowRight, Sparkles } from 'lucide-react';

const Home = ({ setActivePage }) => {
    const features = [
        {
            title: "Fast Prediction",
            desc: "Get instant classification results using our optimized ML models.",
            icon: <Zap className="text-amber-400" />,
            color: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
        {
            title: "Accurate Classification",
            desc: "High precision across Billing, Technical, Account, and Shipping issues.",
            icon: <ShieldCheck className="text-emerald-400" />,
            color: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            title: "Easy Integration",
            desc: "Connect our API into your existing CRM or support workflow seamlessly.",
            icon: <Cpu className="text-primary-400" />,
            color: "bg-primary-500/10",
            border: "border-primary-500/20"
        }
    ];

    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative px-6 pt-16 text-center max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex justify-center mb-8">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20 uppercase tracking-widest">
                            <Sparkles size={14} /> Powered by Advanced Neural Networks
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        AI Customer Support <br />
                        <span className="gradient-text">Ticket Classifier</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        Automate your support workflow with intelligent ticket categorization. Reduce response times and improve customer satisfaction with SmartSupport AI.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setActivePage('classifier')}
                            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 py-4 px-10 text-lg"
                        >
                            Get Started Now <ArrowRight size={20} />
                        </button>
                        <button className="btn-secondary w-full sm:w-auto py-4 px-10 text-lg">
                            System Specs
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Why choose SmartSupport AI?</h2>
                    <p className="text-slate-500 text-lg uppercase tracking-widest font-bold">Built for speed & precision</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-10 rounded-[2.5rem] glass-card relative overflow-hidden group transition-all border border-slate-700/50 hover:border-primary-500/30"
                        >
                            <div className={`w-16 h-16 ${f.color} ${f.border} border rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                {React.cloneElement(f.icon, { size: 28 })}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-lg">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6">
                <div className="max-w-5xl mx-auto p-16 rounded-[3rem] bg-slate-800/50 border border-slate-700/50 relative overflow-hidden text-center text-white backdrop-blur-xl">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-500 rounded-full opacity-5 blur-[120px]"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to automate your support?</h2>
                        <p className="text-slate-400 mb-12 max-w-xl mx-auto text-lg leading-relaxed">Join hundreds of companies using AI to streamline their customer interactions and resolve issues faster.</p>
                        <button
                            onClick={() => setActivePage('classifier')}
                            className="px-12 py-5 bg-primary-600 text-white rounded-2xl font-black hover:bg-primary-500 transition-all shadow-[0_20px_40px_-10px_rgba(14,165,233,0.3)] active:scale-95"
                        >
                            INITIALIZE SYSTEM
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
