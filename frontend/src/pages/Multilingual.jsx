import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Languages,
    Globe,
    ArrowRight,
    CheckCircle,
    RefreshCw,
    Zap,
    Info,
    ShieldCheck,
    Search,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const languageDistribution = [
    { name: 'English', value: 65, color: '#3b82f6' },
    { name: 'Spanish', value: 20, color: '#f59e0b' },
    { name: 'French', value: 10, color: '#10b981' },
    { name: 'German', value: 5, color: '#8b5cf6' }
];

const Multilingual = () => {
    const [stats, setStats] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [configOpen, setConfigOpen] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getMultilingualStats();
                setStats(data);
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

    const languages = stats.map(s => ({
        ...s,
        name: s.lang,
        performance: Math.round(95 + (s.sentiment * 10))
    }));
    return (
        <div className="p-6 space-y-6 relative h-full overflow-hidden">
            <AnimatePresence>
                {configOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setConfigOpen(false)}
                            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="fixed right-0 top-0 h-full w-[350px] bg-white dark:bg-slate-900 shadow-2xl z-[60] p-8 border-l border-slate-200 dark:border-slate-800"
                        >
                            <h3 className="text-xl font-bold mb-6">Routing Config</h3>
                            <div className="space-y-6">
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Global Rule</p>
                                    <p className="text-sm font-medium">Automatic Language-Based Routing: <span className="text-emerald-500 font-bold">ACTIVE</span></p>
                                </div>
                                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Agents</p>
                                    <div className="flex items-center justify-between text-left">
                                        <span className="text-sm">Sarah Chen</span>
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">EN, ES, FR</span>
                                    </div>
                                    <div className="flex items-center justify-between text-left">
                                        <span className="text-sm">Elena Rodriguez</span>
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">ES, PT</span>
                                    </div>
                                </div>
                                <button className="w-full mt-8 py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-xl shadow-primary-500/20">
                                    Refresh Routing Map
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-left">
                    <h1 className="text-2xl font-bold tracking-tight">Multilingual & Translation</h1>
                    <p className="text-slate-500 text-sm">Real-time AI translation and global language distribution analysis.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-xl text-xs font-bold border border-emerald-100 dark:border-emerald-900">
                    <Globe size={14} />
                    Supporting 24 Languages
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Live Translation Demo */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card overflow-hidden"
                    >
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between font-sans">
                            <h3 className="font-bold flex items-center gap-2 text-left">
                                <Languages className="text-primary-600" size={20} />
                                Live Ticket Translation
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Detection Mode:</span>
                                <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 text-[10px] font-bold rounded">AUTOMATIC</span>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            {/* Source */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span>Source Language</span>
                                    <span className="text-amber-500">Spanish (Identified)</span>
                                </div>
                                <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 h-40">
                                    <p className="text-sm italic text-slate-600 dark:text-slate-400">"No puedo restablecer mi contraseña. He intentado varias veces pero el enlace de correo electrónico no llega. ¿Pueden ayudarme hoy?"</p>
                                </div>
                            </div>

                            {/* Target */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span>Target Language</span>
                                    <span className="text-emerald-500">English</span>
                                </div>
                                <div className="p-5 bg-white dark:bg-slate-950 border border-primary-100 dark:border-primary-900/30 rounded-2xl h-40 shadow-inner relative">
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">"I cannot reset my password. I have tried several times but the email link does not arrive. Can you help me today?"</p>
                                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-500">
                                        <ShieldCheck size={14} /> 99% Translation Quality
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-950/20">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Classification Sync:</p>
                            <div className="flex gap-2">
                                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold text-slate-500">CATEGORY: AUTH</span>
                                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold text-slate-500">URGENCY: HIGH</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Avg Latency', val: '12ms', icon: RefreshCw },
                            { label: 'Auto-Translate', val: '100%', icon: CheckCircle },
                            { label: 'Manual Overrides', val: '0.4%', icon: Info },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="glass-card p-5 text-left"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <stat.icon size={16} className="text-primary-500" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Live</span>
                                </div>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter mb-1">{stat.label}</p>
                                <p className="text-xl font-bold">{stat.val}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Distribution & Config */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-6"
                    >
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Language Mix</h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={languageDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {languageDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-3">
                            {languageDistribution.slice(0, 3).map((lang, i) => (
                                <div key={i} className="flex justify-between items-center text-xs text-left">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                                        <span className="font-medium">{lang.name}</span>
                                    </div>
                                    <span className="font-bold">{lang.value}%</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="glass-card p-6 bg-gradient-to-br from-indigo-900 to-indigo-950 text-white text-left">
                        <h3 className="font-bold flex items-center gap-2 mb-4">
                            <Zap className="text-amber-400" size={18} />
                            Auto-Routing Enabled
                        </h3>
                        <p className="text-xs text-indigo-200 mb-6 leading-relaxed">Incoming Spanish and French tickets are automatically routed to Sarah Chen and Elena Rodriguez based on skill scores.</p>
                        <button
                            onClick={() => setConfigOpen(true)}
                            className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-white/10"
                        >
                            Configure Routing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Multilingual;
