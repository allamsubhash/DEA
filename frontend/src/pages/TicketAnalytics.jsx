import React from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { api } from '../utils/api';
import {
    BarChart3,
    Calendar,
    Filter,
    Download,
    TrendingUp,
    Users,
    Clock,
    Target,
    Globe,
    Loader2
} from 'lucide-react';

const TicketAnalytics = () => {
    const [volumeData, setVolumeData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // We'll reuse getInsights or getStats for volume data
                const data = await api.getInsights();
                setVolumeData(data.volumeTrend || [
                    { date: '2026-02-24', volume: 120 },
                    { date: '2026-02-25', volume: 180 },
                    { date: '2026-02-26', volume: 150 },
                    { date: '2026-02-27', volume: 220 },
                    { date: '2026-02-28', volume: 190 },
                    { date: '2026-03-01', volume: 250 },
                    { date: '2026-03-02', volume: 210 }
                ]);
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

    const regionData = [
        { name: 'North America', volume: 850, color: '#3b82f6' },
        { name: 'Europe', volume: 640, color: '#8b5cf6' },
        { name: 'Asia Pacific', volume: 420, color: '#10b981' },
        { name: 'LATAM', volume: 180, color: '#f59e0b' },
        { name: 'Other', volume: 90, color: '#64748b' },
    ];

    const kpiCards = [
        { label: 'Avg Full Resolution', value: '18h 42m', change: '-12%', icon: Clock, color: 'text-blue-500' },
        { label: 'First Contact Resolve', value: '74.2%', change: '+4.5%', icon: Target, color: 'text-emerald-500' },
        { label: 'Active Support Agents', value: '42', change: '+2', icon: Users, color: 'text-purple-500' },
        { label: 'Global Traffic', value: '+24%', change: 'Normal', icon: Globe, color: 'text-amber-500' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Ticket Analytics</h1>
                    <p className="text-slate-500 text-sm">Advanced insights into ticket volume, regional data, and KPIs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <Calendar size={16} /> Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/20 hover:bg-primary-500 transition-all">
                        <Download size={16} /> Reports
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiCards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-5"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <card.icon className={card.color} size={20} />
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.change.includes('+') ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950' : 'bg-blue-50 text-blue-600 dark:bg-blue-950'}`}>
                                {card.change}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{card.label}</p>
                        <p className="text-xl font-bold">{card.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold flex items-center gap-2">
                            <TrendingUp className="text-primary-600" size={20} />
                            Ticket Volume Trends
                        </h3>
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                            <button className="px-3 py-1 text-xs font-bold bg-white dark:bg-slate-800 shadow-sm rounded-lg">Daily</button>
                            <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">Weekly</button>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={volumeData}>
                                <defs>
                                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorVolume)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6"
                >
                    <h3 className="font-bold mb-8 flex items-center gap-2">
                        <Globe className="text-indigo-600" size={20} />
                        Region Breakdown
                    </h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={regionData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={100} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none' }}
                                />
                                <Bar dataKey="volume" radius={[0, 4, 4, 0]} barSize={20}>
                                    {regionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 space-y-4">
                        {regionData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                                <span className="text-slate-500 font-medium">{item.name}</span>
                                <span className="font-bold">{item.volume}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default TicketAnalytics;
