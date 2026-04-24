import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Target, Activity, Zap, Loader2, Info } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const Performance = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE}/performance`);
                setData(response.data);
            } catch (err) {
                console.error("Performance fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <Loader2 className="animate-spin text-primary-500" size={48} />
            </div>
        );
    }

    const metrics = [
        { name: "Accuracy", value: data?.accuracy * 100, icon: <Target className="text-emerald-400" />, desc: "Overall correct predictions across all classes." },
        { name: "Precision", value: data?.precision * 100, icon: <Zap className="text-blue-400" />, desc: "Ability of the model to not label negative samples as positive." },
        { name: "Recall", value: data?.recall * 100, icon: <Gauge className="text-amber-400" />, desc: "Ability of the model to find all positive samples." },
        { name: "F1-Score", value: data?.f1 * 100, icon: <Activity className="text-violet-400" />, desc: "Harmonic mean of precision and recall." },
    ];

    const matrixCategories = ['Billing', 'Technical', 'Shipping', 'Account'];

    const getMatrixValue = (actual, predicted) => {
        const item = data?.confusion_matrix.find(m => m.actual === actual && m.predicted === predicted);
        return item ? item.value : 0;
    };

    const getIntensity = (val) => {
        if (val > 40) return 'bg-emerald-500/80 text-white';
        if (val > 20) return 'bg-emerald-500/40 text-emerald-100';
        if (val > 5) return 'bg-amber-500/40 text-amber-100';
        if (val > 0) return 'bg-red-500/40 text-red-100';
        return 'bg-slate-800 text-slate-600';
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div>
                <h1 className="text-4xl font-black text-white mb-2">Model Performance</h1>
                <p className="text-slate-400">Scientific evaluation of the neural network's decision-making accuracy.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-8 rounded-3xl border border-slate-700/50 group hover:border-primary-500/30 transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 group-hover:scale-110 transition-transform">
                                {m.icon}
                            </div>
                            <Info size={16} className="text-slate-600 cursor-help" title={m.desc} />
                        </div>
                        <div className="text-4xl font-black text-white mb-1 tabular-nums">{m.value}%</div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{m.name}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Confusion Matrix */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-3 glass-card p-10 rounded-[3rem] border border-slate-700/50"
                >
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Confusion Matrix</h3>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Correct</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Error</div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-center border-separate border-spacing-2">
                            <thead>
                                <tr>
                                    <th className="p-4"></th>
                                    {matrixCategories.map(cat => (
                                        <th key={cat} className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Pred: {cat}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {matrixCategories.map(actual => (
                                    <tr key={actual}>
                                        <td className="p-4 text-[10px] font-black text-slate-300 uppercase tracking-widest text-right whitespace-nowrap">Actual: {actual}</td>
                                        {matrixCategories.map(pred => {
                                            const val = getMatrixValue(actual, pred);
                                            return (
                                                <td key={pred} className={`p-8 rounded-2xl font-black text-xl tabular-nums shadow-inner transition-all hover:scale-105 cursor-default ${getIntensity(val)}`}>
                                                    {val}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 text-center text-xs text-slate-500 italic">
                        The diagonal axis (emerald cells) shows correct classifications. Off-diagonal cells indicate model misinterpretations.
                    </div>
                </motion.div>

                {/* Model Info Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <div className="glass-card p-10 rounded-[2.5rem] border border-slate-700/50 bg-indigo-500/5">
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Model Architecture</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                                <span className="text-slate-400 text-sm font-medium">Core Algorithm</span>
                                <span className="text-primary-400 font-bold">LogReg + TF-IDF</span>
                            </div>
                            <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                                <span className="text-slate-400 text-sm font-medium">Training Samples</span>
                                <span className="text-emerald-400 font-bold">12,500</span>
                            </div>
                            <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                                <span className="text-slate-400 text-sm font-medium">Feature Dimensions</span>
                                <span className="text-blue-400 font-bold">5,000</span>
                            </div>
                            <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                                <span className="text-slate-400 text-sm font-medium">Execution Latency</span>
                                <span className="text-amber-400 font-bold">1.2ms</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-slate-800/30 border border-slate-700 flex items-center justify-between group">
                        <div className="space-y-1">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Training Status</div>
                            <div className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Optimal State</div>
                        </div>
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                            <Activity className="text-emerald-400" size={24} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Performance;
