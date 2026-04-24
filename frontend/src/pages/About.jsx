import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Brain, Layout, Sparkles } from 'lucide-react';

const About = () => {
    const techs = [
        { name: "FastAPI", icon: <Server className="text-emerald-400" />, desc: "Modern, high-performance Python web framework." },
        { name: "Scikit-Learn", icon: <Brain className="text-blue-400" />, desc: "Machine learning library for classification and TF-IDF processing." },
        { name: "React & Vite", icon: <Layout className="text-cyan-400" />, desc: "Lightning fast frontend development and reactive UI." },
        { name: "Tailwind CSS", icon: <Code className="text-indigo-400" />, desc: "Utility-first styling for a premium fluid design." }
    ];

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest rounded-lg border border-slate-700 mb-6">
                    <Sparkles size={14} /> Technology Stack
                </div>
                <h1 className="text-4xl font-bold text-white mb-6">About SmartSupport AI</h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
                    SmartSupport AI is a conceptual customer support ticket classification system designed to demonstrate the power of machine learning in streamlining business operations.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                {techs.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[2rem] glass-card flex items-start gap-6 border border-slate-700/50 hover:border-primary-500/20 transition-all"
                    >
                        <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
                            {t.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{t.name}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">{t.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-10 rounded-[2.5rem] border border-slate-700/50"
            >
                <h2 className="text-2xl font-bold text-white mb-10 text-center uppercase tracking-widest">Process Flow</h2>
                <div className="space-y-10">
                    <div className="flex gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-400 flex items-center justify-center font-black flex-shrink-0 border border-primary-500/20 shadow-xl shadow-primary-500/5">1</div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">Text Processing</h4>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">The input text is cleaned and converted into numerical vectors using TF-IDF (Term Frequency-Inverse Document Frequency).</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black flex-shrink-0 border border-emerald-500/20 shadow-xl shadow-emerald-500/5">2</div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">Logistic Regression Prediction</h4>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">Our trained Logistic Regression model analyzes the vector and calculates probability scores for each possible category.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-black flex-shrink-0 border border-amber-500/20 shadow-xl shadow-amber-500/5">3</div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-2">Result Visualization</h4>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">The category with the highest confidence score is returned to the user with a detailed explanation of why it was chosen.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
