import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, User, Mail, MessageSquare, Sparkles } from 'lucide-react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 text-primary-400 text-xs font-bold uppercase tracking-widest rounded-lg border border-primary-500/20 mb-6">
                    <Sparkles size={14} /> Network Status: Online
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Contact Support</h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">Have questions about our AI models? Our experts are ready to assist you.</p>
            </div>

            <div className="grid md:grid-cols-5 gap-12 items-start">
                <div className="md:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white tracking-tight">System Inquiry</h3>
                        <p className="text-slate-400 text-base leading-relaxed font-medium">
                            Our team is always ready to assist you with integration, model customization, or general inquiries.
                        </p>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-slate-800/50 border border-slate-700/50 space-y-6 shadow-2xl backdrop-blur-xl">
                        <div className="flex items-center gap-4 text-slate-300 group hover:text-primary-400 transition-colors">
                            <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20 text-primary-400 transition-colors">
                                <Mail size={20} />
                            </div>
                            <span className="text-sm font-bold font-mono">support@smartsupport.ai</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300 group hover:text-emerald-400 transition-colors">
                            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 transition-colors">
                                <MessageSquare size={20} />
                            </div>
                            <span className="text-sm font-bold">24/7 Neural Link Active</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleSubmit}
                                className="glass-card p-10 rounded-[3rem] space-y-8 border border-slate-700/50"
                            >
                                <div className="space-y-6">
                                    <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-slate-800/50 border border-slate-700 focus:border-primary-500 outline-none transition-all text-white placeholder:text-slate-600 font-medium"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-slate-800/50 border border-slate-700 focus:border-primary-500 outline-none transition-all text-white placeholder:text-slate-600 font-medium"
                                        />
                                    </div>
                                    <textarea
                                        required
                                        placeholder="Describe your inquiry..."
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full p-6 rounded-[1.5rem] bg-slate-800/50 border border-slate-700 focus:border-primary-500 outline-none transition-all resize-none text-white placeholder:text-slate-600 font-medium"
                                    />
                                </div>
                                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-3 py-5 text-lg shadow-[0_20px_40px_-10px_rgba(14,165,233,0.3)]">
                                    Broadcast Message <Send size={20} />
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card p-16 rounded-[3rem] text-center space-y-8 border border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)]"
                            >
                                <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-2xl">
                                    <CheckCircle2 size={48} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-white mb-3">Transmission Successful</h3>
                                    <p className="text-slate-400 text-lg font-medium leading-relaxed">Thank you for reaching out. A team member will respond through the neural link within 24 hours.</p>
                                </div>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-8 py-3 bg-slate-800 text-slate-300 rounded-xl border border-slate-700 hover:text-white hover:bg-slate-700 transition-all font-bold"
                                >
                                    Send Another
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Contact;
