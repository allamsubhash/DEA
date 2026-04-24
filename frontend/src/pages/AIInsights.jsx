import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, Smile, Meh, Frown, Activity, Loader2, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const AIInsights = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const SENTIMENT_COLORS = {
        'Positive': '#10b981',
        'Neutral': '#f59e0b',
        'Negative': '#ef4444'
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE}/insights`);
                setData(response.data);
            } catch (err) {
                console.error("Insights fetch error:", err);
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

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white mb-2">AI Insights</h1>
                    <p className="text-slate-400">Deep-dive analysis of customer sentiment and issue patterns.</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">System Health</div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="text-white font-bold">{data?.system_health}</span>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-slate-700" />
                    <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg Sentiment</div>
                        <div className="text-emerald-400 font-bold">{data?.avg_sentiment_score * 100}% Positive</div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Sentiment Analysis */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border border-slate-700/50"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <TrendingUp className="text-primary-500" /> Sentiment Distribution
                        </h3>
                    </div>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data?.sentiment_distribution || []}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data?.sentiment_distribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.name]} cornerRadius={8} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend verticalAlign="middle" align="right" layout="vertical" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Score Indicators */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20"
                    >
                        <Smile className="text-emerald-400 mb-4" size={32} />
                        <div className="text-3xl font-black text-white">42%</div>
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Positive Interactions</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/20"
                    >
                        <Meh className="text-amber-400 mb-4" size={32} />
                        <div className="text-3xl font-black text-white">38%</div>
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Neutral Feedback</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-[2rem] bg-red-500/5 border border-red-500/20"
                    >
                        <Frown className="text-red-400 mb-4" size={32} />
                        <div className="text-3xl font-black text-white">20%</div>
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Negative Sentiment</div>
                    </motion.div>
                </div>
            </div>

            {/* Top Issues List */}
            <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-8 rounded-[2.5rem] border border-slate-700/50"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Top Frequent Issues</h3>
                    <div className="space-y-6">
                        {data?.top_issues.map((issue, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-slate-300 font-bold">{issue.issue}</span>
                                    <span className="text-primary-400 font-mono text-sm">{issue.count} Tickets</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(issue.count / 10) * 100}%` }}
                                        className="h-full bg-gradient-to-r from-primary-500 to-indigo-500"
                                    ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-8 rounded-[2.5rem] border border-slate-700/50 flex flex-col items-center justify-center text-center bg-indigo-500/5"
                >
                    <div className="p-6 bg-indigo-500/10 rounded-full mb-6 border border-indigo-500/20">
                        <Activity className="text-indigo-400" size={48} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">AI Proactive Alert</h3>
                    <p className="text-slate-400 max-w-xs mb-8">We've detected a 15% increase in "Billing" issues over the last 24 hours. Consider updating the FAQ section.</p>
                    <button className="btn-primary py-3 px-8 text-sm uppercase tracking-widest">Generate Report</button>
                </motion.div>
            </div>
        </div>
    );
};

export default AIInsights;
