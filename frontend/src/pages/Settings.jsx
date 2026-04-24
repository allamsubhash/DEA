import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Moon, Shield, Save, LogOut, CheckCircle2 } from 'lucide-react';

const Settings = () => {
    const [preferences, setPreferences] = useState({
        darkMode: true,
        notifications: true,
        emailReports: false,
        autoAssign: true,
        compactGrid: false
    });

    const sections = [
        { id: 'profile', name: 'Neural Profile', icon: <User size={20} /> },
        { id: 'app', name: 'App Preferences', icon: <Moon size={20} /> },
        { id: 'alerts', name: 'Alert Settings', icon: <Bell size={20} /> },
        { id: 'security', name: 'Security Protocol', icon: <Shield size={20} /> },
    ];

    const [activeSection, setActiveSection] = useState('profile');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-4">
                    <SettingsIcon className="text-primary-600" /> System Settings
                </h1>
                <p className="text-slate-500 text-sm">Manage your account and application preferences.</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-12 text-left">
                {/* Sidebar Navigation */}
                <div className="space-y-2">
                    {sections.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSection(s.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeSection === s.id
                                ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/20'
                                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            {s.icon} {s.name}
                        </button>
                    ))}
                    <div className="pt-10">
                        <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 font-bold text-sm transition-all border border-transparent hover:border-red-500/30">
                            <LogOut size={20} /> TERMINATE LINK
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-card p-10 rounded-[3rem] border border-slate-700/50"
                        >
                            {activeSection === 'profile' && (
                                <div className="space-y-10">
                                    <div className="flex items-center gap-8 pb-10 border-b border-slate-100 dark:border-slate-800">
                                        <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black shadow-2xl">
                                            JS
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-2xl font-bold mb-1">James Software</h3>
                                            <p className="text-primary-400 font-mono text-xs uppercase tracking-widest">Neural ID: 8829-XJ2</p>
                                            <button className="mt-4 text-xs font-bold text-slate-500 hover:text-white underline transition-colors">Change Avatar</button>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8 text-left">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Display Name</label>
                                            <input type="text" defaultValue="James Software" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary-500 transition-all font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Neural Link (Email)</label>
                                            <input type="email" defaultValue="james@smartsupport.ai" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none focus:border-primary-500 transition-all font-bold" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'app' && (
                                <div className="space-y-8 text-left">
                                    <div className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                        <div>
                                            <h4 className="text-lg font-bold mb-1">Persistent Dark Mode</h4>
                                            <p className="text-slate-500 text-sm">Keep the interface in a high-contrast dark state.</p>
                                        </div>
                                        <div
                                            onClick={() => setPreferences({ ...preferences, darkMode: !preferences.darkMode })}
                                            className={`w-14 h-8 rounded-full p-1 cursor-pointer flex items-center transition-colors ${preferences.darkMode ? 'bg-primary-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'}`}
                                        >
                                            <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-lg"></motion.div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                        <div>
                                            <h4 className="text-lg font-bold mb-1">Compact Grid View</h4>
                                            <p className="text-slate-500 text-sm">Minimize UI density on dashboard charts.</p>
                                        </div>
                                        <div
                                            onClick={() => setPreferences({ ...preferences, compactGrid: !preferences.compactGrid })}
                                            className={`w-14 h-8 rounded-full p-1 cursor-pointer flex items-center transition-colors ${preferences.compactGrid ? 'bg-primary-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'}`}
                                        >
                                            <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-lg"></motion.div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'alerts' && (
                                <div className="space-y-8 text-left">
                                    <div className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                        <div>
                                            <h4 className="text-lg font-bold mb-1">Push Notifications</h4>
                                            <p className="text-slate-500 text-sm">Alert me on new SLA breaches instantly.</p>
                                        </div>
                                        <div
                                            onClick={() => setPreferences({ ...preferences, notifications: !preferences.notifications })}
                                            className={`w-14 h-8 rounded-full p-1 cursor-pointer flex items-center transition-colors ${preferences.notifications ? 'bg-primary-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'}`}
                                        >
                                            <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-lg"></motion.div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                        <div>
                                            <h4 className="text-lg font-bold mb-1">Weekly Email Reports</h4>
                                            <p className="text-slate-500 text-sm">Send a weekly digest of my performance.</p>
                                        </div>
                                        <div
                                            onClick={() => setPreferences({ ...preferences, emailReports: !preferences.emailReports })}
                                            className={`w-14 h-8 rounded-full p-1 cursor-pointer flex items-center transition-colors ${preferences.emailReports ? 'bg-primary-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'}`}
                                        >
                                            <motion.div layout className="w-6 h-6 bg-white rounded-full shadow-lg"></motion.div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'security' && (
                                <div className="space-y-8 text-left">
                                    <div className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 flex gap-6 items-center">
                                        <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 border border-amber-500/20">
                                            <Shield size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">Two-Factor Authentication (2FA)</h4>
                                            <p className="text-slate-500 text-xs mb-4">Protect your neural link with an extra layer of security using an authenticator app.</p>
                                            <button className="px-5 py-2.5 bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 rounded-xl text-sm font-bold transition-all">Enable 2FA</button>
                                        </div>
                                    </div>
                                    <div className="pt-4 space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Update Access Key (Password)</label>
                                        <input type="password" placeholder="••••••••••••" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none focus:border-amber-500 transition-all font-bold" />
                                    </div>
                                </div>
                            )}

                            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={saved}
                                    className={`py-4 px-10 rounded-2xl flex items-center justify-center gap-3 font-black tracking-widest text-sm shadow-[0_20px_40px_-10px_rgba(14,165,233,0.3)] min-w-[200px] transition-all active:scale-95 ${saved ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-primary-600 text-white hover:bg-primary-500'}`}
                                >
                                    {saved ? <CheckCircle2 size={20} className="animate-in zoom-in duration-300" /> : <Save size={20} />}
                                    {saved ? 'SAVED SUCCESSFULLY' : 'SAVE UPDATES'}
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {activeSection !== 'security' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 flex gap-6 items-center text-left"
                        >
                            <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 border border-amber-500/20">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1 font-sans">Account Security Level: Medium</h4>
                                <p className="text-slate-500 text-xs">Consider enabling Two-Factor Authentication (2FA) for better neural protection.</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
