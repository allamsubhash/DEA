import React from 'react';
import { motion } from 'framer-motion';
import {
    Settings,
    Users,
    FileBarChart,
    Download,
    Lock,
    Database,
    Globe,
    Bell,
    ShieldCheck,
    ChevronRight,
    UserPlus,
    Activity,
    Search,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';

const Admin = () => {
    const [logs, setLogs] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [reporting, setReporting] = React.useState(false);
    const [features, setFeatures] = React.useState([
        { id: 1, title: 'Auto-Classification Engine', desc: 'Use AI to automatically label incoming tickets.', enabled: true },
        { id: 2, title: 'Real-Time Sentiment Tracking', desc: 'Analyze emotional tone of tickets as they arrive.', enabled: true },
        { id: 3, title: 'Predictive Forecasting', desc: 'Predict future ticket volumes using historical data.', enabled: false },
        { id: 4, title: 'Smart Response Suggestions', desc: 'Suggest AI-generated replies to support agents.', enabled: true },
    ]);
    const [activeTab, setActiveTab] = React.useState('General Settings');
    const [trendFilter, setTrendFilter] = React.useState('30 Days');

    const handleGenerateReport = (type = 'Audit') => {
        setReporting(true);
        setTimeout(() => {
            setReporting(false);
            alert(`${type} Report generated successfully! (Download Simulated)`);
        }, 1500);
    };

    const adminTabs = [
        { label: 'General Settings', icon: Settings },
        { label: 'System Reports', icon: FileBarChart },
        { label: 'Model Reliability', icon: ShieldCheck },
        { label: 'Project Architecture', icon: Activity },
        { label: 'API & Integrations', icon: Database },
        { label: 'User Management', icon: Users },
        { label: 'Security & Auth', icon: Lock },
    ];

    const toggleFeature = (id) => {
        setFeatures(features.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getAdminLogs();
                setLogs(data);
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
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Administration & Governance</h1>
                    <p className="text-slate-500 text-sm">Central command for system configuration, reporting, and API health.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => handleGenerateReport('System')}
                        disabled={reporting}
                        className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-semibold shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {reporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        Download All Reports
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Navigation Tabs (Vertical) */}
                <div className="lg:col-span-1 space-y-2">
                    {adminTabs.map((tab, i) => {
                        const isActive = activeTab === tab.label;
                        return (
                            <button
                                key={i}
                                onClick={() => setActiveTab(tab.label)}
                                className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all group ${isActive ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/20' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 hover:border-primary-500/30'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <tab.icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary-600'} />
                                    <span className="text-sm font-bold">{tab.label}</span>
                                </div>
                                {isActive && <ChevronRight size={16} />}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    {activeTab === 'Model Reliability' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <div className="glass-card p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-bold">Neural Accuracy Logs</h3>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                                        Real-time Feedback Active
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { id: 1021, text: "Can't login to SSO", category: "Auth", feedback: "Correct", user: "Sarah C." },
                                        { id: 1020, text: "Delayed refund process", category: "Billing", feedback: "Incorrect (Was Technical)", user: "Michael R." },
                                        { id: 1019, text: "API 401 Unauthorized", category: "Auth", feedback: "Correct", user: "Auto-System" },
                                        { id: 1018, text: "UI Glitch on Mobile", category: "Technical", feedback: "Correct", user: "Emma W." },
                                    ].map((log, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary-600 font-bold text-xs ring-1 ring-slate-100 dark:ring-slate-700">
                                                    #{log.id}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold truncate max-w-[300px]">{log.text}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium">Class: {log.category} • Verified by {log.user}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${log.feedback.includes('Correct') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                                {log.feedback}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="glass-card p-6 bg-slate-900 text-white">
                                <h3 className="text-sm font-bold mb-4">Model Retraining Status</h3>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="flex items-center gap-4">
                                        <Activity className="text-primary-400" />
                                        <div>
                                            <p className="text-xs font-bold">In-Memory Training Buffer</p>
                                            <p className="text-[10px] opacity-60">842 new samples since last deployment</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-primary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                                        Retrain Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'System Reports' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="glass-card p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="font-bold flex items-center gap-2">
                                            <FileBarChart size={18} className="text-primary-600" />
                                            Ticket Volume Trends
                                        </h3>
                                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">Aggregated platform analytics</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {['Weekly', '30 Days', '90 Days'].map(f => (
                                            <button
                                                key={f}
                                                onClick={() => setTrendFilter(f)}
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${trendFilter === f ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100'}`}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-64 flex items-end gap-2 px-2 overflow-hidden">
                                    {Array.from({ length: 24 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${Math.random() * 80 + 20}%` }}
                                            transition={{ delay: i * 0.02 }}
                                            className="flex-1 bg-gradient-to-t from-primary-600 to-cyan-400 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity relative group"
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {Math.floor(Math.random() * 1000)}k
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4 px-2">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mon</span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tue</span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Wed</span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Thu</span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fri</span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sat</span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sun</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="glass-card p-6">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Distribution by Priority</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Critical', color: 'bg-red-500', val: 12 },
                                            { label: 'High', color: 'bg-amber-500', val: 32 },
                                            { label: 'Medium', color: 'bg-primary-500', val: 45 },
                                            { label: 'Low', color: 'bg-emerald-500', val: 11 },
                                        ].map(p => (
                                            <div key={p.label}>
                                                <div className="flex justify-between items-center mb-1 text-[10px] font-black uppercase tracking-widest">
                                                    <span>{p.label}</span>
                                                    <span>{p.val}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${p.val}%` }}
                                                        className={`h-full ${p.color}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="glass-card p-6 bg-slate-900 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl opacity-50" />
                                    <h3 className="text-xs font-black uppercase tracking-widest text-white mb-6 relative z-10">Compliance SLA Report</h3>
                                    <div className="text-center py-4 relative z-10">
                                        <p className="text-4xl font-black text-emerald-400">99.2%</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-2">Resolution within 4h window</p>
                                    </div>
                                    <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all relative z-10">
                                        Export PDF
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'Project Architecture' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="glass-card p-6">
                                <h3 className="font-bold mb-6">Project Services Registry</h3>
                                <div className="space-y-4">
                                    {[
                                        { endpoint: '/stats', method: 'GET', desc: 'Main dashboard KPI distribution' },
                                        { endpoint: '/predict', method: 'POST', desc: 'NLP-based ticket classification engine' },
                                        { endpoint: '/realtime', method: 'GET', desc: 'Active stream monitoring and ingestion' },
                                        { endpoint: '/ticket/{id}', method: 'GET', desc: 'Deep-dive conversation and metadata detail' },
                                        { endpoint: '/history', method: 'GET', desc: 'Audit trail of past AI predictions' },
                                        { endpoint: '/performance', method: 'GET', desc: 'Agent efficiency and resolution metrics' },
                                        { endpoint: '/forecast', method: 'GET', desc: 'Time-series predictive volume analytics' },
                                        { endpoint: '/root-cause', method: 'GET', desc: 'Cluster-based issue identification' },
                                    ].map((api, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                                            <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter ${api.method === 'GET' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                {api.method}
                                            </span>
                                            <div className="flex-1">
                                                <p className="text-sm font-mono font-bold text-slate-600 dark:text-slate-300">{api.endpoint}</p>
                                                <p className="text-[10px] text-slate-400 font-medium">{api.desc}</p>
                                            </div>
                                            <Activity size={16} className="text-slate-200" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'API & Integrations' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="glass-card p-6">
                                <h3 className="font-bold mb-6">Active API Connections</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { name: 'Neural-Classifier-v2', status: 'Healthy', latency: '42ms', usage: '89%' },
                                        { name: 'Sentiment-Engine-Pro', status: 'Healthy', latency: '12ms', usage: '45%' },
                                        { name: 'Salesforce-Connector', status: 'Healthy', latency: '156ms', usage: '12%' },
                                        { name: 'Zendesk-Bridge', status: 'Warning', latency: '890ms', usage: '98%' },
                                    ].map((conn, i) => (
                                        <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${conn.status === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                <div>
                                                    <p className="text-sm font-bold">{conn.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium">Latency: {conn.latency}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-primary-600">{conn.usage}</p>
                                                <p className="text-[9px] text-slate-400 uppercase font-black">Quota</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-card p-6">
                                <h3 className="font-bold mb-6">Infrastructure Auth Keys</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Production X-API-KEY', key: 'sk_live_51M...8f2a', type: 'Secret' },
                                        { label: 'Sandbox Gateway Token', key: 'pk_test_92J...1b0c', type: 'Public' },
                                    ].map((key, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl">
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{key.label}</p>
                                                <code className="text-sm font-mono text-slate-600 dark:text-slate-400">{key.key}</code>
                                            </div>
                                            <button
                                                onClick={() => alert("Key copied to clipboard")}
                                                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab !== 'General Settings' && activeTab !== 'API & Integrations' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-12 text-center"
                        >
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <Settings size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-400 mb-2">{activeTab}</h3>
                            <p className="text-xs text-slate-300">Configuration options for {activeTab} will appear here.</p>
                        </motion.div>
                    )}

                    {activeTab === 'General Settings' && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-6"
                            >
                                <h3 className="font-bold mb-6">System Feature Control</h3>
                                <div className="space-y-6">
                                    {features.map((feat) => (
                                        <div key={feat.id} className="flex items-center justify-between py-4 border-b border-slate-50 dark:border-slate-800 last:border-0">
                                            <div>
                                                <p className="text-sm font-bold">{feat.title}</p>
                                                <p className="text-xs text-slate-500">{feat.desc}</p>
                                            </div>
                                            <div
                                                onClick={() => toggleFeature(feat.id)}
                                                className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer flex items-center shrink-0 ${feat.enabled ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                                            >
                                                <div className={`absolute w-4 h-4 bg-white rounded-full transition-all shadow-md ${feat.enabled ? 'right-1' : 'left-1'}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="glass-card p-6"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold flex items-center gap-2">
                                            <Activity size={18} className="text-indigo-600" />
                                            Admin Logs
                                        </h3>
                                        <button className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-primary-600 hover:bg-primary-50 transition-all">
                                            <Search size={18} />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {logs.map((log) => (
                                            <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'Success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                    <div>
                                                        <p className="text-sm font-bold">{log.action}</p>
                                                        <p className="text-[10px] text-slate-400 font-medium">By {log.user} • {log.time}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${log.status === 'Success' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                                    {log.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="glass-card p-6 bg-slate-900 text-white"
                                >
                                    <h3 className="font-bold flex items-center gap-2 mb-6">
                                        <ShieldCheck size={18} className="text-emerald-400" />
                                        Data Governance
                                    </h3>
                                    <div className="space-y-4 mb-8">
                                        <p className="text-xs opacity-60">Compliance Status: <span className="text-emerald-400 font-bold">SOC2 / GDPR</span></p>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[100%] rounded-full" />
                                        </div>
                                        <p className="text-[10px] opacity-40 leading-relaxed">All data in transit is encrypted using TLS 1.3. PII masking is active for the Ticket Classification pipeline.</p>
                                    </div>
                                    <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/10">
                                        View Audit Logs
                                    </button>
                                </motion.div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
