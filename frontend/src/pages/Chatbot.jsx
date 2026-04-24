import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    Bot,
    User,
    Sparkles,
    PlusCircle,
    Image as ImageIcon,
    Paperclip,
    TrendingUp,
    MessageSquare,
    HelpCircle,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', text: "Hello! I'm your Smart Support AI Assistant. How can I help you manage your tickets or analyze data today?" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput("");
        setIsTyping(true);

        try {
            const data = await api.chatbotReply(currentInput);
            const botMsg = {
                id: Date.now() + 1,
                role: 'bot',
                text: data.reply
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (err) {
            console.error(err);
            const errorMsg = {
                id: Date.now() + 1,
                role: 'bot',
                text: "I'm sorry, I'm having trouble connecting to the brain. Please try again later."
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 h-[calc(100vh-100px)] flex flex-col"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">AI Chatbot</h1>
                    <p className="text-slate-500 text-sm">Interactive AI assistant for ticket triage and data insights.</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-all">
                        <HelpCircle size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 glass-card flex flex-col overflow-hidden relative border-none shadow-2xl">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[120px] pointer-events-none" />

                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === 'bot' ? 'bg-primary-600 text-white' : 'bg-slate-900 text-white dark:bg-slate-800'
                                    }`}>
                                    {msg.role === 'bot' ? <Bot size={20} /> : <User size={20} />}
                                </div>
                                <div className={`p-4 rounded-3xl text-sm leading-relaxed ${msg.role === 'bot' ? 'bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800' : 'bg-primary-600 text-white'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <AnimatePresence>
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex gap-4"
                            >
                                <div className="w-10 h-10 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-lg">
                                    <Bot size={20} />
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl flex items-center gap-1 shadow-sm border border-slate-100 dark:border-slate-800">
                                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Suggestions */}
                <div className="px-6 py-4 flex gap-2 overflow-x-auto scrollbar-none border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
                    {[
                        "Analyze current ticket volume",
                        "Show top 3 issues today",
                        "Draft response for TKT-4502",
                        "Explain model low confidence"
                    ].map((s, i) => (
                        <button
                            key={i}
                            onClick={() => setInput(s)}
                            className="px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold hover:border-primary-500 transition-all whitespace-nowrap shadow-sm active:scale-95"
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            className="w-full pl-6 pr-16 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                            <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                                <Paperclip size={20} />
                            </button>
                            <button
                                onClick={handleSend}
                                className="p-2.5 bg-primary-600 text-white rounded-2xl shadow-lg shadow-primary-500/20 hover:bg-primary-500 transition-all active:scale-90"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Chatbot;
