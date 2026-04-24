import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Fingerprint,
    Search,
    ChevronRight,
    AlertCircle,
    BarChart,
    Zap,
    Tag,
    MessageSquare,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';

const RootCauseAnalysis = ({ setActivePage }) => {
    const [selectedDept, setSelectedDept] = useState('Engineering');
    const [viewMode, setViewMode] = useState('Top Issues');
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [data, setData] = useState({ rootCause: { top_clusters: [] }, stats: {} });

    const handleDeepDive = () => {
        setAnalyzing(true);
        setTimeout(() => setAnalyzing(false), 2000);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [rootCause, stats] = await Promise.all([
                    api.getRootCause(),
                    api.getStats()
                ]);
                setData({ rootCause, stats });
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

    const { rootCause, stats } = data;

    const departmentTags = {
        'Engineering': ['API Timeout', 'DB Lag', 'Cache Miss', 'Latency'],
        'Product': ['UX Confusion', 'Missing Feature', 'Navigation'],
        'Billing': ['Payment Fail', 'Refund Case', 'Invoice Issue'],
        'Support': ['Long Wait', 'Agent Unavail', 'Bot Error']
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">AI Root Cause Analysis</h1>
                    <p className="text-slate-500 text-sm">Neural clustering of system bottlenecks and conversational patterns.</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                    {['Top Issues', 'Topic Clusters'].map(mode => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={`px-4 py-1.5 text-xs font-bold transition-all rounded-lg ${viewMode === mode ? 'bg-white dark:bg-slate-800 shadow-sm text-primary-600' : 'text-slate-400'}`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-6"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold flex items-center gap-2">
                                <Tag className="text-primary-600" size={20} />
                                Departmental Bottlenecks
                            </h3>
                            <div className="flex gap-2">
                                {Object.keys(departmentTags).map(dept => (
                                    <button
                                        key={dept}
                                        onClick={() => setSelectedDept(dept)}
                                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedDept === dept ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {dept}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {departmentTags[selectedDept].map((tag, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    className={`px-6 py-4 rounded-3xl flex flex-col gap-2 cursor-pointer transition-all border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 hover:shadow-2xl bg-white dark:bg-slate-900 min-w-[160px]`}
                                >
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{tag}</p>
                                    <div className="flex items-center justify-between gap-8">
                                        <p className="text-2xl font-black text-slate-900 dark:text-white">{Math.floor(Math.random() * 50) + 10}</p>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100`}>ACTIVE</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {rootCause.top_clusters.map((cluster, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-6 hover:shadow-2xl transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-2xl group-hover:bg-primary-600 group-hover:text-white transition-all">
                                        <MessageSquare size={24} />
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${cluster.impact === 'High' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {cluster.impact}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold mb-2">{cluster.name}</h4>
                                <p className="text-sm text-slate-500 mb-6 leading-relaxed">Detected anomaly in {cluster.name} showing {cluster.count} occurrences.</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                        Root Cause
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                        Clustered
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <p className="text-sm font-bold text-primary-600">{cluster.count} Tickets</p>
                                    <button
                                        onClick={() => setActivePage('tickets')}
                                        className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-primary-50 dark:group-hover:bg-primary-900/10 transition-all"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white"
                    >
                        <h3 className="font-bold flex items-center gap-2 mb-6">
                            <Zap className="text-amber-400" size={20} />
                            AI Prediction
                        </h3>
                        <p className="text-sm opacity-80 mb-6 leading-relaxed">Based on current trends, we expect a 14% increase in "API Timeout" tickets over the next 48 hours unless the US-East server group is scaled.</p>
                        <button
                            onClick={handleDeepDive}
                            disabled={analyzing}
                            className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/10 uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            {analyzing ? <Loader2 size={14} className="animate-spin" /> : null}
                            {analyzing ? 'Analyzing...' : 'View Detail Plan'}
                        </button>
                    </motion.div>

                    <div className="glass-card p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">System Health</h3>
                        <div className="space-y-6">
                            {['Database', 'Auth Service', 'Gateway'].map((service, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold">
                                        <span className="text-slate-400 uppercase">{service}</span>
                                        <span className="text-emerald-500">99.9%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[99%] rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RootCauseAnalysis;
