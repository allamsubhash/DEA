import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Star,
    Clock,
    CheckCircle,
    TrendingUp,
    Award,
    Target,
    BarChart3,
    Search,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell
} from 'recharts';

const skillData = [
    { subject: 'Technical', A: 120, fullMark: 150 },
    { subject: 'Billing', B: 110, fullMark: 150 },
    { subject: 'Soft Skills', A: 86, fullMark: 150 },
    { subject: 'Speed', B: 130, fullMark: 150 },
    { subject: 'Accuracy', A: 99, fullMark: 150 },
];

const agentData = [
    { name: 'Sarah Chen', tickets: 145, rating: 4.95, status: 'Online' },
    { name: 'Michael Rodriguez', tickets: 132, rating: 4.8, status: 'Busy' },
    { name: 'David Kim', tickets: 118, rating: 4.6, status: 'Online' },
    { name: 'Emma Wilson', tickets: 95, rating: 4.7, status: 'Offline' }
];

const AgentPerformance = ({ setActivePage }) => {
    const [selectedAgent, setSelectedAgent] = React.useState(agentData[0]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Agent Performance</h1>
                    <p className="text-slate-500 text-sm">Comprehensive metrics and AI-driven skill evaluation for support teams.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all">
                        Team Overview
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Agents List */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card overflow-hidden"
                    >
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold flex items-center gap-2">
                                <Award className="text-amber-500" size={20} />
                                Team Leaderboard
                            </h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input type="text" placeholder="Search agents..." className="pl-8 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-sans">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <th className="px-6 py-3">Agent</th>
                                        <th className="px-6 py-3 text-center">Tickets</th>
                                        <th className="px-6 py-3 text-center">Avg CSAT</th>
                                        <th className="px-6 py-3 text-center">Resolution</th>
                                        <th className="px-6 py-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {agentData.map((agent, i) => (
                                        <tr
                                            key={i}
                                            onClick={() => setSelectedAgent(agent)}
                                            className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group ${selectedAgent.name === agent.name ? 'bg-primary-50/50 dark:bg-primary-950/20' : ''}`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold text-xs">
                                                        {agent.name.charAt(0)}
                                                    </div>
                                                    <p className="text-sm font-bold">{agent.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm font-medium">{agent.tickets || 120}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-sm">
                                                    <Star size={14} fill="currentColor" /> {agent.rating || 4.5}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm font-medium">1.5h</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${agent.status === 'Online' ? 'bg-emerald-100 text-emerald-600' :
                                                    agent.status === 'Busy' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'
                                                    }`}>
                                                    {agent.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6"
                        >
                            <h3 className="font-bold mb-6 text-sm">Resolution Efficiency</h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={agentData}>
                                        <XAxis dataKey="name" hide />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                        <Bar dataKey="tickets" radius={[4, 4, 0, 0]} barSize={30}>
                                            {agentData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.name === selectedAgent.name ? '#3b82f6' : '#94a3b8'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card p-6"
                        >
                            <h3 className="font-bold mb-4 text-sm">Skill Distribution (Average)</h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                        <PolarGrid stroke="#e2e8f0" className="dark:stroke-slate-800" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                                        <Radar name="Skills" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Individual Focus Sidebar */}
                <div className="space-y-6">
                    <motion.div
                        key={selectedAgent.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6 border-t-4 border-t-primary-600"
                    >
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 rounded-3xl bg-primary-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-xl shadow-primary-500/20">
                                {selectedAgent.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3 className="text-lg font-bold">{selectedAgent.name}</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Senior Support Lead</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-center">
                                <p className="text-xs text-slate-400 font-bold mb-1">Weekly CSAT</p>
                                <p className="text-lg font-bold text-primary-600">{selectedAgent.rating}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-center">
                                <p className="text-xs text-slate-400 font-bold mb-1">Accuracy</p>
                                <p className="text-lg font-bold text-primary-600">98%</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Performance Notes</h4>
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                                <p className="text-[11px] text-emerald-600 leading-relaxed font-medium">Excellent handling of "Technical/Billing" crossovers. 14% faster than average on high-priority tickets.</p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                alert(`Generating full performance report for ${selectedAgent.name}...`);
                            }}
                            className="w-full mt-8 py-3 bg-primary-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-500 transition-all uppercase tracking-widest"
                        >
                            View Full Report
                        </button>
                    </motion.div>

                    <div className="glass-card p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Internal KPIs</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Team Sentiment Sync', val: 92 },
                                { label: 'Knowledge Base Input', val: 78 },
                                { label: 'Peer Review Score', val: 85 },
                            ].map((kpi, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold">
                                        <span className="text-slate-400">{kpi.label}</span>
                                        <span className="text-primary-600">{kpi.val}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${kpi.val}%` }}
                                            className="h-full bg-primary-600 rounded-full"
                                        />
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

export default AgentPerformance;
