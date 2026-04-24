import React from 'react';
import { motion } from 'framer-motion';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from 'recharts';
import {
    Smile,
    Meh,
    Frown,
    TrendingUp,
    AlertCircle,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';

const SentimentAnalysis = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [sentiment, insights] = await Promise.all([
                    api.getSentiment(),
                    api.getInsights()
                ]);
                setData({ sentiment, insights });
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

    const { sentiment, insights } = data;

    const sentimentChartData = [
        { name: 'Positive', value: Math.round(insights.sentiment_distribution[0].value / sentiment.overall_sentiment * 100) || 45, color: '#10b981' },
        { name: 'Neutral', value: Math.round(insights.sentiment_distribution[1].value / sentiment.overall_sentiment * 100) || 35, color: '#64748b' },
        { name: 'Negative', value: Math.round(insights.sentiment_distribution[2].value / sentiment.overall_sentiment * 100) || 20, color: '#f43f5e' },
    ];
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Sentiment Analysis</h1>
                    <p className="text-slate-500 text-sm">Monitor customer emotional trends across all channels.</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-lg text-xs font-bold ring-1 ring-emerald-200 dark:ring-emerald-900">
                        <TrendingUp size={14} />
                        +5.2% Happy Score
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-6"
                >
                    <h3 className="text-lg font-bold mb-6">Global Distribution</h3>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sentimentChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {sentimentChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {sentimentChartData.map((item, idx) => (
                            <div key={idx} className="text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.name}</p>
                                <p className="text-xl font-bold" style={{ color: item.color }}>{item.value}%</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 glass-card p-6"
                >
                    <h3 className="text-lg font-bold mb-6">Sentiment Over Time</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={sentiment.sentiment_over_time}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 1]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="sentiment" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card overflow-hidden"
                >
                    <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="font-bold flex items-center gap-2">
                            <Frown className="text-red-500" size={20} />
                            Urgent: Low Sentiment Tickets
                        </h3>
                        <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 text-[10px] font-bold rounded-full">ACTION REQUIRED</span>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {insights.top_issues.map((t, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group">
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-500">
                                        <AlertCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold truncate max-w-[250px]">{t.issue} Related Complaints</p>
                                        <div className="flex gap-2 text-[10px] text-slate-400 font-medium">
                                            <span className="font-mono text-red-400 font-bold uppercase">{t.issue}</span>
                                            <span>•</span>
                                            <span>Impact Count: {t.count}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 group-hover:text-primary-600 transition-all">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6 flex flex-col justify-between"
                >
                    <div className="space-y-4">
                        <h3 className="font-bold">Sentiment Health Check</h3>
                        <p className="text-sm text-slate-500">Your average customer sentiment has improved by 12% since last week due to faster resolution times in the Technical category.</p>

                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-slate-400 uppercase tracking-tighter">Response Empathy Score</span>
                                    <span className="text-emerald-500">8.4 / 10</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[84%] rounded-full" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-slate-400 uppercase tracking-tighter">Customer Frustration Index</span>
                                    <span className="text-amber-500">2.1 / 10</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 w-[21%] rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                            <Smile className="mx-auto text-emerald-500 mb-2" size={24} />
                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Happy Users</p>
                            <p className="text-lg font-bold">1,402</p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
                            <Meh className="mx-auto text-slate-400 mb-2" size={24} />
                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Neutral Users</p>
                            <p className="text-lg font-bold">845</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SentimentAnalysis;
