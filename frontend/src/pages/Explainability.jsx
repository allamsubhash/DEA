import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    TrendingUp,
    Target,
    Info,
    BarChart,
    AlertCircle,
    Eye,
    LineChart as LineChartIcon,
    Search,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const Explainability = () => {
    const [explanation, setExplanation] = React.useState(null);
    const [forecast, setForecast] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [expData, forData] = await Promise.all([
                    api.getExplanation(),
                    api.getForecast()
                ]);
                setExplanation(expData);
                setForecast(forData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const [showSelector, setShowSelector] = React.useState(false);

    const tickets = [
        { id: 'TKT-104', text: "My credit card was charged twice..." },
        { id: 'TKT-105', text: "Cannot log in to my account..." },
        { id: 'TKT-106', text: "I need a refund for last month..." }
    ];

    if (loading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }
    return (
        <div className="p-6 space-y-6 relative h-full overflow-hidden">
            <AnimatePresence>
                {showSelector && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSelector(false)}
                            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-[60] p-6 border border-slate-200 dark:border-slate-800"
                        >
                            <h3 className="text-lg font-bold mb-4">Select Ticket for AI Explanation</h3>
                            <div className="space-y-3">
                                {tickets.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setShowSelector(false)}
                                        className="w-full text-left p-4 hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary-200 transition-all group"
                                    >
                                        <p className="text-xs font-bold text-primary-600 mb-1">{t.id}</p>
                                        <p className="text-sm text-slate-500 truncate">{t.text}</p>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">AI Explainability & Forecasting</h1>
                    <p className="text-slate-500 text-sm">Transparency into model decisions and future volume predictions.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Prediction Explanation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold flex items-center gap-2">
                            <Eye className="text-primary-600" size={20} />
                            Local Explanation (SHAP)
                        </h3>
                        <button
                            onClick={() => setShowSelector(true)}
                            className="text-xs font-bold text-primary-600 hover:underline"
                        >
                            Select Ticket
                        </button>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 mb-8">
                        <p className="text-sm font-medium italic text-slate-500 mb-2">"My credit card was charged twice for the same invoice..."</p>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Predicted:</span>
                            <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 text-[10px] font-bold rounded">Billing</span>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Word Contribution</p>
                        {explanation.map((w, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="w-16 text-xs font-bold">{w.word}</span>
                                <div className="flex-1 flex items-center gap-2">
                                    {w.type === 'pos' ? (
                                        <>
                                            <div className="h-2 bg-emerald-500 rounded-full" style={{ width: `${w.weight * 150}%` }} />
                                            <span className="text-[10px] font-bold text-emerald-500">+{w.weight}</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="h-2 bg-red-500 rounded-full" style={{ width: `${Math.abs(w.weight) * 150}%` }} />
                                            <span className="text-[10px] font-bold text-red-500">{w.weight}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Volume Forecasting */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold flex items-center gap-2">
                            <LineChartIcon className="text-indigo-600" size={20} />
                            Ticket Volume Forecast
                        </h3>
                        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-full text-[10px] font-bold">
                            92% Match History
                        </div>
                    </div>

                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={forecast}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} fillOpacity={0.1} fill="#3b82f6" name="Actual" />
                                <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" fillOpacity={0} name="Predicted" />
                                <Area type="monotone" dataKey="upper" stroke="none" fill="#8b5cf6" fillOpacity={0.05} />
                                <Area type="monotone" dataKey="lower" stroke="none" fill="#8b5cf6" fillOpacity={0.05} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-8 flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
                        <div>
                            <p className="text-xs font-bold text-indigo-600 mb-1">Forecast Insight</p>
                            <p className="text-[10px] text-slate-500 max-w-[300px]">Expect a significant spike in Billing tickets starting Mar 04 due to the upcoming monthly cycle.</p>
                        </div>
                        <TrendingUp className="text-indigo-600 opacity-50" size={32} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Explainability;
