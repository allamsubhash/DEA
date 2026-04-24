import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Settings,
    Cpu,
    Search,
    Hash,
    Filter,
    Zap,
    Code,
    Layers,
    Sparkles,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';

const FeatureEngineering = () => {
    const [inputText, setInputText] = useState("I've been waiting for my refund for 3 days and I'm very frustrated.");
    const [features, setFeatures] = useState(null);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getFeatures();
                setFeatures(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    const tokens = inputText.toLowerCase().split(/\W+/).filter(t => t.length > 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Feature Engineering</h1>
                    <p className="text-slate-500 text-sm">Visualize and test NLP text-to-feature transformations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/20">
                        Update Lexicon
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Text Input & Tokenization */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-6"
                    >
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Code className="text-primary-600" size={20} />
                            Preprocessing Preview
                        </h3>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all mb-6"
                            rows={3}
                        />

                        <div className="space-y-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tokenization Output</p>
                            <div className="flex flex-wrap gap-2">
                                {tokens.map((token, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium shadow-sm hover:border-primary-500 transition-colors cursor-default"
                                    >
                                        {token}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6"
                    >
                        <h3 className="font-bold mb-6 flex items-center gap-2">
                            <Layers className="text-indigo-600" size={20} />
                            TF-IDF Vector Space (Simulated)
                        </h3>
                        <div className="space-y-6">
                            {features.map((feat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">{feat.name}</span>
                                            <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-[8px] font-bold uppercase">{feat.type}</span>
                                        </div>
                                        <span className="font-mono text-primary-600 font-bold">{feat.importance}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${feat.importance * 100}%` }}
                                            className="h-full bg-gradient-to-r from-primary-600 to-indigo-600 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Configuration */}
                <div className="space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Pipeline Config</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Lowercase', enabled: true },
                                { label: 'Remove Stopwords', enabled: true },
                                { label: 'Lemmatization', enabled: true },
                                { label: 'Stemming', enabled: false },
                                { label: 'N-grams (1,2)', enabled: true },
                            ].map((opt, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                    <span className="text-sm font-medium">{opt.label}</span>
                                    <div className={`w-10 h-6 rounded-full relative transition-colors cursor-pointer ${opt.enabled ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${opt.enabled ? 'right-1' : 'left-1'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6 bg-slate-900 text-white overflow-hidden relative"
                    >
                        <Sparkles className="absolute -right-4 -top-4 text-white/10" size={120} />
                        <h3 className="font-bold flex items-center gap-2 mb-4 relative z-10">
                            <Zap size={20} className="text-amber-400" />
                            Auto-Optimization
                        </h3>
                        <p className="text-xs text-white/60 mb-6 relative z-10 leading-relaxed">The system has identified that adding "BERT-embeddings" would increase classification accuracy by 3.2% for the 'Technical' category.</p>
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/10 relative z-10">
                            Enable Embeddings
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default FeatureEngineering;
