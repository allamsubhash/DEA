import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Waves,
    Play,
    Pause,
    Settings,
    Info,
    Zap,
    Activity,
    History,
    Terminal,
    Server,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';

const RealTimeStream = ({ onTicketClick }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [stream, setStream] = useState([
        { id: 9912, text: "Can't login to the console...", category: 'Auth', sentiment: 'Neutral', time: 'Just now' },
        { id: 9911, text: "Payment was declined twice.", category: 'Billing', sentiment: 'Negative', time: '1s ago' },
        { id: 9910, text: "Slow API response in US-East.", category: 'Technical', sentiment: 'Critical', time: '3s ago' },
    ]);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(async () => {
            try {
                const data = await api.getRealtime();
                // Map API data to UI format
                const newTickets = data.map(t => ({
                    id: t.id,
                    text: t.event + " - " + t.user,
                    category: ['Auth', 'Billing', 'Technical', 'General'][Math.floor(Math.random() * 4)],
                    sentiment: ['Neutral', 'Negative', 'Positive'][Math.floor(Math.random() * 3)],
                    time: t.time
                }));
                setStream((prev) => [...newTickets, ...prev].slice(0, 15));
            } catch (err) {
                console.error(err);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-6 max-h-screen overflow-hidden"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Real-Time Ticket Stream</h1>
                    <p className="text-slate-500 text-sm">Live ingestion and classification pipeline for incoming support volume.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`p-2 rounded-lg transition-all ${isPlaying ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}
                        >
                            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest">{isPlaying ? 'Streaming' : 'Paused'}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Live Stream List */}
                <div className="lg:col-span-3 space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] pr-2 scrollbar-none">
                    <AnimatePresence initial={false}>
                        {stream.map((ticket, idx) => (
                            <motion.div
                                key={`${ticket.id}-${idx}`}
                                initial={{ opacity: 0, x: -50, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => onTicketClick && onTicketClick(ticket)}
                                className="glass-card p-5 flex items-center justify-between group hover:shadow-xl transition-all cursor-pointer"
                            >
                                <div className="flex gap-4 items-center">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${ticket.sentiment === 'Critical' ? 'bg-red-50 text-red-500' :
                                        ticket.sentiment === 'Negative' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'
                                        }`}>
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight mb-1">{ticket.text}</p>
                                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            <span className="text-primary-600">TKT-{ticket.id}</span>
                                            <span>•</span>
                                            <span>{ticket.time}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-500 uppercase">
                                            {ticket.category}
                                        </span>
                                    </div>
                                    <div className={`px-2 py-0.5 rounded text-[8px] font-bold ring-1 ${ticket.sentiment === 'Critical' ? 'bg-red-50 text-red-600 ring-red-100' : 'bg-slate-50 text-slate-600 ring-slate-100'
                                        }`}>
                                        {ticket.sentiment}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Stream Metadata */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-6"
                    >
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Activity size={14} className="text-primary-600" />
                            Ingest Metrics
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs text-slate-500 mb-1 font-bold">Velocity (Tickets/hr)</p>
                                <p className="text-2xl font-bold">1,242 <span className="text-[10px] text-emerald-500">+12%</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1 font-bold">Avg Inference Time</p>
                                <p className="text-2xl font-bold">45ms <span className="text-[10px] text-slate-400 font-medium">FAST</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1 font-bold">Kafka Lag</p>
                                <p className="text-2xl font-bold">0.02s</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="glass-card p-6 bg-slate-900 text-white font-mono text-[10px]">
                        <div className="flex items-center gap-2 mb-4 text-slate-400">
                            <Terminal size={14} />
                            <span>PIPELINE_LOGS.EXE</span>
                        </div>
                        <div className="space-y-1.5 opacity-80">
                            <p className="text-emerald-400">[STREAM] Connected to incoming-tickets</p>
                            <p>[WORKER] Batch processing 12 msgs...</p>
                            <p>[MODEL] Predict for TKT-9912: Billing (0.98)</p>
                            <p>[CACHE] Entry saved for key: user_4502</p>
                            <p className="text-blue-400">[WEBSOCKET] Pushing update to frontend...</p>
                            <p className="animate-pulse">_</p>
                        </div>
                    </div>

                    <div className="glass-card p-4 flex items-center gap-4">
                        <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <Server className="text-slate-400" size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Stream Source</p>
                            <p className="text-xs font-bold">Primary Cluster (US-East)</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RealTimeStream;
