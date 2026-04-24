import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Settings2,
    History,
    Play,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    ShieldCheck,
    Cpu,
    Loader2,
    Database,
    Zap
} from 'lucide-react';
import { api } from '../utils/api';

const ModelManagement = ({ setActivePage }) => {
    const [performance, setPerformance] = useState({ accuracy: 0.942, precision: 0.925, recall: 0.951, f1: 0.938 });
    const [loading, setLoading] = useState(true);
    const [retraining, setRetraining] = useState(false);
    const [progress, setProgress] = useState(0);
    const [ingestionRate, setIngestionRate] = useState(0);

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                // Simulate throughput loading
                setTimeout(() => setLoading(false), 1000);
            } catch (err) {
                console.error("Performance fetch error:", err);
            }
        };
        fetchPerformance();
    }, []);

    const handleRetrain = () => {
        setRetraining(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setRetraining(false);
                    return 100;
                }
                setIngestionRate(Math.floor(Math.random() * 50000) + 100000);
                return prev + 1;
            });
        }, 50);
    };

    if (loading) return (
        <div className="h-full w-full flex items-center justify-center">
            <Loader2 className="animate-spin text-primary-600" size={48} />
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight gradient-text">Neural Model Ops</h1>
                    <p className="text-slate-500 text-sm font-medium">Architectural oversight for <span className="text-primary-500 font-bold">Llama-3-Neural-v2</span> production lifecycle.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRetrain}
                        disabled={retraining}
                        className="px-5 py-2.5 bg-primary-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-primary-500/30 flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
                    >
                        {retraining ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
                        {retraining ? 'Synthesizing...' : 'Deep Retrain'}
                    </button>
                    <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium hover:bg-slate-50 transition-all">
                        <Settings2 size={16} />
                    </button>
                </div>
            </div>

            {retraining && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="glass-card p-6 bg-primary-600/5 border-primary-500/30 overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/40">
                                <Cpu size={20} className="animate-pulse" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-primary-500">Neural Synthesis In-Progress</h4>
                                <p className="text-[10px] text-slate-500 font-mono">Epoch {Math.floor(progress / 10)}/10 • Ingesting {ingestionRate.toLocaleString()} records/s</p>
                            </div>
                        </div>
                        <span className="text-2xl font-black font-mono text-primary-600">{progress}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-800/50">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-primary-600 via-indigo-500 to-cyan-400 rounded-full"
                        />
                    </div>
                    <div className="mt-4 flex gap-4 overflow-hidden h-4">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }}
                                className="w-1 h-1 bg-primary-500 rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Ingested Samples', value: '42.8M', trend: 'Big Data', icon: Database, color: 'text-indigo-500' },
                    { label: 'Global Accuracy', value: `${(performance?.accuracy * 100).toFixed(1)}%`, trend: '+0.4%', icon: CheckCircle2, color: 'text-emerald-500' },
                    { label: 'Neural Recall', value: `${(performance?.recall * 100).toFixed(1)}%`, trend: '+1.2%', icon: BarChart3, color: 'text-purple-500' },
                    { label: 'Optimus F1', value: `${performance?.f1.toFixed(3)}`, trend: 'Optimized', icon: Zap, color: 'text-amber-500' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-transparent hover:border-primary-500/20 transition-all group"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
                        </div>
                        <div className="flex items-end justify-between">
                            <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') || stat.trend === 'Big Data' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary-500/10 text-primary-500'}`}>{stat.trend}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Version History */}
                <div className="lg:col-span-1 glass-card p-6">
                    <h3 className="font-bold flex items-center gap-2 mb-6">
                        <History size={18} className="text-slate-400" />
                        Version History
                    </h3>
                    <div className="space-y-4">
                        {[
                            { version: 'v2.4.1', date: 'Today', status: 'Active', size: '142MB' },
                            { version: 'v2.4.0', date: '3 days ago', status: 'Archived', size: '142MB' },
                            { version: 'v2.3.9', date: '1 week ago', status: 'Archived', size: '140MB' },
                            { version: 'v2.3.8', date: '2 weeks ago', status: 'Archived', size: '140MB' },
                        ].map((v, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                                <div>
                                    <p className="text-xs font-bold">{v.version}</p>
                                    <p className="text-[10px] text-slate-400">{v.date}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${v.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{v.status}</span>
                                    <p className="text-[10px] text-slate-400 mt-1 font-mono">{v.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Confusion Matrix or Feature Importance */}
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="font-bold flex items-center gap-2 mb-8">
                        <TrendingUp size={18} className="text-primary-600" />
                        Confusion Matrix (Recent Test Set)
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-center border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-2"></th>
                                    {['Billing', 'Tech', 'Ship', 'Acc'].map(cat => (
                                        <th key={cat} className="p-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cat}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {['Billing', 'Tech', 'Ship', 'Acc'].map((row, i) => (
                                    <tr key={row}>
                                        <td className="p-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">{row}</td>
                                        {['Billing', 'Tech', 'Ship', 'Acc'].map((col, j) => {
                                            const isCorrect = i === j;
                                            const val = isCorrect ? Math.floor(Math.random() * 20 + 80) : Math.floor(Math.random() * 5);
                                            return (
                                                <td key={col} className="p-1">
                                                    <div className={`aspect-square w-full rounded flex flex-col items-center justify-center ${isCorrect ? 'bg-primary-600 text-white' : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400'
                                                        }`}>
                                                        <span className="text-xs font-bold">{val}</span>
                                                        <span className="text-[8px] opacity-60">{(val / 2).toFixed(1)}%</span>
                                                    </div>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded bg-primary-600" />
                                <span className="text-[10px] text-slate-500 font-bold uppercase">True Positive</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-800" />
                                <span className="text-[10px] text-slate-500 font-bold uppercase">False Negative</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 italic">
                            <AlertCircle size={10} /> Misclassifications peaked in 'Billing' category
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ModelManagement;
