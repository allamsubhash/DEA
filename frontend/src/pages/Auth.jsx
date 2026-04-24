import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, User, Github, Chrome, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const Auth = () => {
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const endpoint = mode === 'login' ? '/login' : '/signup';
            const response = await axios.post(`${API_BASE}${endpoint}`, formData);

            if (response.data.status === 'success') {
                setIsSuccess(true);
                if (mode === 'login') {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="max-w-md mx-auto px-6 py-20 text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-card p-12 rounded-[3rem] border border-emerald-500/30 bg-emerald-500/5 shadow-2xl"
                >
                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4">
                        {mode === 'login' ? 'Welcome Back!' : 'Account Created!'}
                    </h2>
                    <p className="text-slate-400 mb-10 leading-relaxed font-medium">
                        {mode === 'login'
                            ? "Authentication successful. You're being redirected to the neural command center."
                            : "Your neural profile has been initialized. You can now proceed to log in."}
                    </p>
                    <button
                        onClick={() => { setIsSuccess(false); setMode('login'); }}
                        className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-2"
                    >
                        Proceed <ArrowRight size={20} />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[700px]">
            <div className="grid lg:grid-cols-2 gap-16 w-full items-center">
                <div className="hidden lg:block space-y-8">
                    <h1 className="text-5xl font-black text-white leading-tight">
                        Access the <span className="gradient-text">Future</span> of Customer Support.
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Join thousands of companies using SmartSupport AI to automate their workflows and delight their customers.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 border border-primary-500/30 font-bold text-xs">1</div>
                            <span className="font-semibold text-lg">Instant Ticket Classification</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 border border-primary-500/30 font-bold text-xs">2</div>
                            <span className="font-semibold text-lg">Real-time Sentiment Analysis</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 border border-primary-500/30 font-bold text-xs">3</div>
                            <span className="font-semibold text-lg">Predictive Customer Insights</span>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="glass-card p-10 rounded-[3rem] border border-slate-700/50 shadow-2xl relative overflow-hidden backdrop-blur-3xl">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl"></div>

                        <div className="flex gap-4 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 mb-10">
                            <button
                                onClick={() => { setMode('login'); setError(''); }}
                                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-black transition-all ${mode === 'login' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <LogIn size={18} /> LOGIN
                            </button>
                            <button
                                onClick={() => { setMode('signup'); setError(''); }}
                                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-black transition-all ${mode === 'signup' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                <UserPlus size={18} /> SIGNUP
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {mode === 'signup' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="relative group"
                                    >
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 outline-none focus:border-primary-500 text-white transition-all font-medium"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    placeholder="Neural Link (Email)"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 outline-none focus:border-primary-500 text-white transition-all font-medium"
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                                <input
                                    type="password"
                                    required
                                    placeholder="Passkey"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 outline-none focus:border-primary-500 text-white transition-all font-medium"
                                />
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-xl"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-black shadow-[0_20px_40px_-10px_rgba(14,165,233,0.3)] disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={24} /> : (mode === 'login' ? 'ESTABLISH LINK' : 'INITIALIZE PROFILE')}
                                {!isLoading && <ArrowRight size={20} />}
                            </button>
                        </form>

                        <div className="mt-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-slate-800"></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Or Continue With</span>
                                <div className="h-px flex-1 bg-slate-800"></div>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex-1 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-white transition-all">
                                    <Github size={20} />
                                </button>
                                <button className="flex-1 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-white transition-all">
                                    <Chrome size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-sm text-slate-500">
                        {mode === 'login' ? "Don't have an access key?" : "Already have an account?"}
                        <button
                            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                            className="ml-2 text-primary-400 font-bold hover:underline"
                        >
                            {mode === 'login' ? 'Register Now' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
