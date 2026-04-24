import React from 'react';
import { motion } from 'framer-motion';
import {
    AlertTriangle,
    Clock,
    CheckCircle,
    ShieldAlert,
    BarChart,
    ArrowRight,
    Timer,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';

const SLAMonitoring = ({ setActivePage, setSelectedTicketId }) => {
    const [slaData, setSlaData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getSLA();
                setSlaData(data);
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
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">SLA Monitoring</h1>
                    <p className="text-slate-500 text-sm">Real-time tracking of Service Level Agreements and breach risks.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-100 dark:border-emerald-900 rounded-xl text-sm font-bold">
                        {slaData.compliance_rate}% Monthly Compliance
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 border-l-4 border-l-red-500"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 dark:bg-red-950/30 text-red-600 rounded-lg">
                            <ShieldAlert size={20} />
                        </div>
                        <h3 className="font-bold text-red-600">Active Breaches</h3>
                    </div>
                    <p className="text-3xl font-bold">03</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium italic">Highest risk: Enterprise Tier</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 border-l-4 border-l-amber-500"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-amber-100 dark:bg-amber-950/30 text-amber-600 rounded-lg">
                            <Timer size={20} />
                        </div>
                        <h3 className="font-bold text-amber-600">Near Breach (1hr)</h3>
                    </div>
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium italic">Pending agent assignment</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 border-l-4 border-l-emerald-500"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 rounded-lg">
                            <CheckCircle size={20} />
                        </div>
                        <h3 className="font-bold text-emerald-600">Resolved Today</h3>
                    </div>
                    <p className="text-3xl font-bold">84</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium italic">Avg resolution: {slaData.avg_resolution_time}</p>
                </motion.div>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                    <h3 className="font-bold">Urgent SLA Attention Required</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">All Plans</button>
                        <button className="px-3 py-1 text-xs font-bold text-slate-500">Enterprise Only</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Ticket</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer Plan</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">SLA Deadline</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Time Consumed</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {slaData.breach_risk.map((t, idx) => (
                                <motion.tr
                                    key={t.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${t.priority === 'High' ? 'bg-red-500' : 'bg-amber-500'} animate-pulse`} />
                                            <div>
                                                <p className="text-sm font-bold truncate max-w-[200px]">{t.subject}</p>
                                                <p className="text-[10px] font-mono text-primary-600 font-bold">{t.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ring-1 bg-indigo-50 text-indigo-600 ring-indigo-200`}>
                                            Enterprise
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm font-bold">
                                            <Clock size={14} className={t.priority === 'High' ? 'text-red-500' : 'text-slate-400'} />
                                            <span className={t.priority === 'High' ? 'text-red-600' : ''}>{t.timeLeft} left</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-full max-w-[150px] space-y-1.5">
                                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${t.priority === 'High' ? 'bg-red-500' : 'bg-amber-500'}`}
                                                    style={{ width: `${t.priority === 'High' ? 85 : 45}%` }}
                                                />
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-400 text-right">{t.priority === 'High' ? 85 : 45}%</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedTicketId(t.id);
                                                setActivePage('detail');
                                            }}
                                            className="flex items-center gap-2 text-xs font-bold text-primary-600 hover:text-primary-700"
                                        >
                                            Manage Ticket <ArrowRight size={14} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default SLAMonitoring;
