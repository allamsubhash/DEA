import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    Ticket,
    Clock,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    LayoutGrid,
    Bell
} from 'lucide-react';
import { api } from '../utils/api';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e'];

const Dashboard = ({ setActivePage, setStatusFilter }) => {
    const [stats, setStats] = useState(null);
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const navigateToTickets = (filter = 'All') => {
        setStatusFilter(filter);
        setActivePage('tickets');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, insightsRes] = await Promise.all([
                    api.getStats(),
                    api.getInsights()
                ]);
                setStats(statsRes);
                setInsights(insightsRes);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="p-6 h-full flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Overview Dashboard</h1>
                    <p className="text-slate-500 text-sm">Real-time snapshots of your support ecosystem.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search data..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    // if (onSearch) onSearch(searchQuery);
                                }
                            }}
                            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all w-full md:w-64"
                        />
                    </div>
                    <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Tickets', value: stats?.total_tickets || 0, trend: '+12.5%', isUp: true, icon: Ticket, color: 'text-blue-500', filter: 'All' },
                    { label: 'Open vs Closed', value: '42 / 12', trend: '-2.4%', isUp: false, icon: AlertCircle, color: 'text-amber-500', filter: 'Open' },
                    { label: 'SLA Compliance', value: '98.2%', trend: '+0.5%', isUp: true, icon: CheckCircle, color: 'text-emerald-500', filter: 'In Progress' },
                    { label: 'Avg Resolution', value: '2.4h', trend: '-15%', isUp: false, icon: Clock, color: 'text-purple-500', filter: 'Resolved' },
                ].map((kpi, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => navigateToTickets(kpi.filter)}
                        className="glass-card p-5 group hover:border-primary-500/30 transition-all cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-800 ${kpi.color}`}>
                                <kpi.icon size={20} />
                            </div>
                            <div className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${kpi.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                {kpi.isUp ? <ArrowUpRight size={10} className="mr-1" /> : <ArrowDownRight size={10} className="mr-1" />}
                                {kpi.trend}
                            </div>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 glass-card p-6"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold flex items-center gap-2">
                            <TrendingUp className="text-primary-600" size={20} />
                            Ticket Volume Trends
                        </h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-xs font-bold bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600">7 Days</button>
                            <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">30 Days</button>
                        </div>
                    </div>
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.bar_data || []}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="tickets" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Categories Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-6"
                >
                    <h3 className="font-bold flex items-center gap-2 mb-8">
                        <LayoutGrid className="text-indigo-600" size={20} />
                        Distribution
                    </h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats?.pie_data || []}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {(stats?.pie_data || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        {(stats?.pie_data || []).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                                <span className="text-[10px] font-bold text-slate-500 uppercase">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-6"
            >
                <h3 className="font-bold mb-6">System Health & Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Overall Health</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-lg font-bold">{insights?.system_health || 'Stable'}</span>
                        </div>
                    </div>
                    {insights?.top_issues?.map((issue, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Top Issue #{idx + 1}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold">{issue.issue}</span>
                                <span className="text-xs font-bold text-primary-600">{issue.count} tickets</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
