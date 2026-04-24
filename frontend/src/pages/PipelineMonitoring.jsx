import React from 'react';
import { motion } from 'framer-motion';
import {
    Waves,
    Database,
    Cpu,
    Zap,
    Activity,
    Clock,
    Server,
    ChevronRight,
    ShieldCheck,
    AlertTriangle,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';

const PipelineMonitoring = () => {
    const [health, setHealth] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getPipelineHealth();
                setHealth(data);
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

    const pipelineSteps = [
        { id: 'kafka', label: 'Kafka Ingest', icon: Waves, status: health.status, throughput: health.throughput, latency: health.latency },
        { id: 'spark', label: 'Spark Stream', icon: Cpu, status: health.status, throughput: health.throughput, latency: health.latency },
        { id: 'ml', label: 'ML Analytics', icon: Zap, status: health.error_rate > 0.05 ? 'Busy' : 'Healthy', throughput: health.throughput, latency: health.latency },
        { id: 'db', label: 'S3 / NoSQL', icon: Database, status: 'Healthy', throughput: health.throughput, latency: health.latency },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Pipeline Monitoring</h1>
                    <p className="text-slate-500 text-sm">Real-time health and throughput tracking for data pipelines.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-900">
                        <Activity size={14} className="animate-pulse" />
                        Live Ingestion
                    </div>
                </div>
            </div>

            <div className="glass-card p-12 overflow-hidden bg-slate-50/30 dark:bg-slate-900/20 relative">
                {/* Animated Background Flow */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                        <motion.path
                            d="M0,100 Q400,50 800,100 T1600,100"
                            fill="none"
                            stroke="url(#grad)"
                            strokeWidth="4"
                            initial={{ strokeDasharray: "10 10", strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: -100 }}
                            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                        />
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                    {pipelineSteps.map((step, idx) => (
                        <React.Fragment key={step.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center group"
                            >
                                <div className={`w-28 h-28 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-2xl transition-all group-hover:scale-110 ${step.status === 'Busy' ? 'bg-amber-500 text-white shadow-amber-500/30' :
                                    'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-primary-600'
                                    }`}>
                                    <step.icon size={36} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{step.label}</span>
                                </div>
                                <div className="mt-4 text-center">
                                    <p className={`text-[10px] font-bold uppercase ${step.status === 'Healthy' ? 'text-emerald-500' : 'text-amber-500'
                                        }`}>{step.status}</p>
                                </div>
                            </motion.div>
                            {idx < pipelineSteps.length - 1 && (
                                <div className="hidden lg:flex items-center gap-2">
                                    {[1, 2, 3].map(i => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full bg-primary-400"
                                            animate={{
                                                x: [0, 40, 0],
                                                opacity: [0.3, 1, 0.3]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 1,
                                                delay: i * 0.2
                                            }}
                                        />
                                    ))}
                                    <ChevronRight className="text-slate-300" size={24} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pipelineSteps.map((step, idx) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + (idx * 0.05) }}
                        className="glass-card p-5"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{step.label}</h4>
                            <div className={`w-2 h-2 rounded-full ${step.status === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Throughput</p>
                                <p className="text-sm font-bold">{step.throughput}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Latency</p>
                                <p className="text-sm font-bold">{step.latency}</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <p className="text-[10px] font-bold text-emerald-500">99.9% Uptime</p>
                            <Activity size={12} className="text-slate-300" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Server className="text-primary-600" size={20} />
                        Infrastructure Health
                    </h3>
                    <div className="space-y-4">
                        {['Kafka Clusters', 'Spark Workers', 'ML Serving Layer'].map((svc, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                <span className="text-sm font-medium">{svc}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-emerald-500">RUNNING</span>
                                    <ShieldCheck size={16} className="text-emerald-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6 bg-amber-50/50 dark:bg-amber-950/10 border-amber-100 dark:border-amber-900/30">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-amber-600">
                        <AlertTriangle size={20} />
                        Active Pipeline Warnings
                    </h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/30 rounded-xl">
                            <p className="text-xs font-bold text-amber-600 mb-1">High Latency in ML Stage</p>
                            <p className="text-[10px] text-slate-500">The classification engine is experiencing higher than usual processing times (115ms vs 45ms).</p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/30 rounded-xl opacity-60">
                            <p className="text-xs font-bold text-slate-500 mb-1">Kafka Partition Rebalance</p>
                            <p className="text-[10px] text-slate-400">Scheduled maintenance in 2 hours for Topic: "incoming-tickets".</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PipelineMonitoring;
