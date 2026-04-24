import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Send,
    MoreVertical,
    User,
    Bot,
    Smile,
    Clock,
    Tag,
    Shield,
    AlertCircle,
    Paperclip,
    CheckCircle2,
    Lock,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';

const TicketDetail = ({ onBack, ticketId = 'TKT-4502' }) => {
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('public'); // public or internal

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getTicketDetail(ticketId);
                setTicket(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [ticketId]);

    if (loading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden">
            {/* Main Conversation Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-bold truncate max-w-[400px]">{ticket.title}</h1>
                                <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 text-[10px] font-bold uppercase">{ticket.id}</span>
                            </div>
                            <p className="text-xs text-slate-500">Opened by {ticket.customer.name} • {ticket.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                            <Shield size={20} className="text-slate-400 font-bold" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                            <MoreVertical size={20} className="text-slate-500" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30">
                    {ticket.messages.map((msg, idx) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: msg.sender === 'customer' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex gap-3 ${msg.sender === 'customer' ? '' : 'flex-row-reverse'}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'customer' ? 'bg-slate-200 dark:bg-slate-800' :
                                msg.sender === 'bot' ? 'bg-primary-600 text-white' : 'bg-indigo-600 text-white'
                                }`}>
                                {msg.sender === 'customer' ? <User size={18} /> :
                                    msg.sender === 'bot' ? <Bot size={18} /> : <Shield size={18} />}
                            </div>
                            <div className={`flex flex-col max-w-[70%] ${msg.sender === 'customer' ? '' : 'items-end'}`}>
                                <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.sender === 'customer' ? 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-tl-none' :
                                    msg.sender === 'bot' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tr-none italic' :
                                        'bg-primary-600 text-white rounded-tr-none'
                                    }`}>
                                    {msg.text}
                                </div>
                                <span className="text-[10px] text-slate-400 mt-1 font-medium">{msg.time}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                    <div className="flex gap-4 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                        <button
                            onClick={() => setActiveTab('public')}
                            className={`text-sm font-semibold pb-1 border-b-2 transition-all ${activeTab === 'public' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-400'
                                }`}
                        >
                            Public Reply
                        </button>
                        <button
                            onClick={() => setActiveTab('internal')}
                            className={`text-sm font-semibold pb-1 border-b-2 transition-all flex items-center gap-1.5 ${activeTab === 'internal' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-400'
                                }`}
                        >
                            <Lock size={12} /> Internal Note
                        </button>
                    </div>

                    <div className={`relative rounded-2xl border transition-all ${activeTab === 'internal' ? 'border-amber-200 bg-amber-50/30 dark:bg-amber-950/10 dark:border-amber-900/30' : 'border-slate-200 dark:border-slate-800'
                        }`}>
                        <textarea
                            placeholder={activeTab === 'internal' ? 'Add internal note...' : 'Type your message here...'}
                            className="w-full p-4 bg-transparent focus:outline-none min-h-[100px] resize-none text-sm"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="flex items-center justify-between p-3 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                                    <Paperclip size={18} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                                    <Smile size={18} />
                                </button>
                            </div>
                            <button className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg ${activeTab === 'internal' ? 'bg-amber-500 text-white shadow-amber-500/20 hover:bg-amber-400' : 'bg-primary-600 text-white shadow-primary-500/20 hover:bg-primary-500'
                                }`}>
                                {activeTab === 'internal' ? 'Add Note' : 'Send Message'}
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Metrics */}
            <div className="w-80 h-full bg-slate-50 dark:bg-slate-900/50 p-6 space-y-6 overflow-y-auto hidden xl:block custom-scrollbar border-l border-slate-200 dark:border-slate-800">
                <section>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">AI Intelligence</h3>
                    <div className="glass-card p-5 space-y-5 bg-white dark:bg-slate-900">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500 font-medium">Category</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${ticket.category === 'Billing' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                {ticket.category}
                            </span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-slate-400 uppercase tracking-tighter">Confidence</span>
                                <span className="text-primary-600 font-mono">{ticket.confidence}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${ticket.confidence}%` }}
                                    className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full"
                                />
                            </div>
                        </div>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-slate-500">Sentiment</span>
                                <div className={`flex items-center gap-1.5 font-bold text-xs capitalize ${ticket.sentiment === 'Negative' ? 'text-red-500' : 'text-emerald-500'
                                    }`}>
                                    <Smile size={14} /> {ticket.sentiment}
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-relaxed italic">"Detected frustration in the first sentence. Immediate resolution recommended."</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Ticket Metadata</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                            <span className="text-xs text-slate-500">Priority</span>
                            <span className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded uppercase">{ticket.priority}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                            <span className="text-xs text-slate-500">SLA Status</span>
                            <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs">
                                <Clock size={12} /> 04:22:15
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Customer Profile</h3>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/20">
                            {ticket.customer.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-bold leading-none">{ticket.customer.name}</p>
                            <p className="text-[10px] text-slate-400 mt-1 font-medium">{ticket.customer.email}</p>
                        </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3 shadow-sm">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-slate-500">
                                <Tag size={12} /> Plan
                            </div>
                            <span className="font-bold text-primary-600">{ticket.customer.plan}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-slate-500">
                                <CheckCircle2 size={12} /> Status
                            </div>
                            <span className="text-emerald-500 font-bold text-[10px]">VERIFIED</span>
                        </div>
                        <div className="h-px bg-slate-50 dark:bg-slate-800 my-1" />
                        <button className="text-[10px] font-bold text-slate-400 hover:text-primary-600 w-full text-center group">
                            View Customer History
                        </button>
                    </div>
                </section>

                <div className="pt-4">
                    <button className="w-full py-3 px-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                        <ArrowLeft size={14} /> Reassign Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketDetail;
