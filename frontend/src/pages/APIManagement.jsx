import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database,
    ExternalLink,
    Terminal,
    Zap,
    Play,
    Code,
    ShieldCheck,
    Cpu,
    Copy,
    CheckCircle2,
    Activity,
    Lock,
    Loader2,
    Search,
    Globe,
    Layers
} from 'lucide-react';

const endpoints = [
    {
        id: 'predict',
        method: 'POST',
        path: '/v1/predict/classify',
        name: 'Ticket Classification',
        desc: 'Core neural engine for intent detection and primary classification.',
        payload: '{ "text": "I can\'t access my dashboard" }',
        response: '{ "id": 4502, "category": "Technical", "confidence": 0.98, "sentiment": "Negative" }'
    },
    {
        id: 'bulk-predict',
        method: 'POST',
        path: '/v1/batch/process',
        name: 'Bulk Processing',
        desc: 'Asynchronous batch analyzer for high-volume ticket streams.',
        payload: '{ "texts": ["..."] }',
        response: '{ "batch_id": "b_789", "processed": 100 }'
    },
    {
        id: 'stats',
        method: 'GET',
        path: '/v1/analytics/stats',
        name: 'Analytics Data',
        desc: 'Real-time performance metrics and distribution telemetry.',
        payload: '-',
        response: '{ "total": 12450, "accuracy": 0.94 }'
    },
    {
        id: 'chatbot',
        method: 'POST',
        path: '/v1/ai/query',
        name: 'AI Agent Query',
        desc: 'Interactive RAG-based support intelligence gateway.',
        payload: '{ "text": "What is the average response time?" }',
        response: '{ "reply": "The average response time is 1.4 hours." }'
    },
    {
        id: 'users',
        method: 'GET',
        path: '/v2/agents/profiles',
        name: 'Agent Registry',
        desc: 'Retrieve metadata and workload balance for assigned agents.',
        payload: '-',
        response: '{ "agents": [{ "id": 1, "name": "Casey Wong", "active": true }] }'
    },
    {
        id: 'settings',
        method: 'PUT',
        path: '/v1/config/thresholds',
        name: 'System Config',
        desc: 'Dynamic adjustment of AI classification confidence floors.',
        payload: '{ "confidence_threshold": 0.85 }',
        response: '{ "status": "updated", "timestamp": "2024-03-05T..." }'
    }
];

const APIManagement = () => {
    const [selectedId, setSelectedId] = useState(endpoints[0].id);
    const [viewMode, setViewMode] = useState('explorer'); // 'explorer' or 'registry'
    const [copied, setCopied] = useState(false);
    const [testing, setTesting] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [toggles, setToggles] = useState({
        webhooks: true,
        caching: true,
        rateLimiting: false,
        logging: true
    });

    const handleToggle = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const activeEp = endpoints.find(e => e.id === selectedId);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTest = () => {
        setTesting(true);
        setTestResult(null);
        setTimeout(() => {
            setTesting(false);
            setTestResult(JSON.parse(activeEp.response));
        }, 1200);
    };

    const filteredEndpoints = endpoints.filter(ep =>
        ep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ep.path.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight gradient-text">Neural API Console</h1>
                    <p className="text-slate-500 text-sm font-medium">Enterprise backbone monitoring <span className="text-primary-500 font-bold">12 Active Gateways</span> globally.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-sm">
                        <button
                            onClick={() => setViewMode('explorer')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'explorer' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <Zap size={14} /> Explorer
                        </button>
                        <button
                            onClick={() => setViewMode('registry')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'registry' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <Layers size={14} /> Full Registry
                        </button>
                    </div>
                    <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors">
                        <ExternalLink size={14} /> API Docs
                    </button>
                </div>
            </div>

            {/* Global Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Uptime', value: '99.99%', icon: ShieldCheck, color: 'text-emerald-500' },
                    { label: 'Latency', value: '38ms', icon: Activity, color: 'text-blue-500' },
                    { label: 'Requests', value: '1.2M/hr', icon: Globe, color: 'text-indigo-500' },
                    { label: 'Security', value: 'AES-256', icon: Lock, color: 'text-amber-500' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-4 flex items-center gap-4 border-slate-100 dark:border-slate-800">
                        <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-950/50 ${stat.color}`}>
                            <stat.icon size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-lg font-black">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {viewMode === 'explorer' ? (
                    <motion.div
                        key="explorer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                    >
                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-4">
                            <div className="glass-card p-4 h-full">
                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Search endpoints..."
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs font-medium focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2 overflow-y-auto max-h-[440px] pr-2 custom-scrollbar">
                                    {filteredEndpoints.map(ep => (
                                        <button
                                            key={ep.id}
                                            onClick={() => setSelectedId(ep.id)}
                                            className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all group border ${selectedId === ep.id
                                                ? 'bg-primary-600 border-primary-500 text-white shadow-xl shadow-primary-500/30'
                                                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-primary-500/50'
                                                }`}
                                        >
                                            <div className="text-left">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${selectedId === ep.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                                        {ep.method}
                                                    </span>
                                                    <p className="text-xs font-bold tracking-tight">{ep.name}</p>
                                                </div>
                                                <p className={`text-[9px] font-mono ${selectedId === ep.id ? 'text-white/70' : 'text-slate-400'}`}>{ep.path}</p>
                                            </div>
                                            <Zap size={14} className={selectedId === ep.id ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Explorer */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="glass-card p-8 min-h-[500px] flex flex-col">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-2xl font-bold">{activeEp.name}</h2>
                                            <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                                <span className="text-[10px] font-black text-primary-500">{activeEp.method}</span>
                                                <span className="text-[10px] font-mono font-bold text-slate-500">{activeEp.path}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 leading-relaxed">{activeEp.desc}</p>
                                    </div>
                                    <button
                                        onClick={handleTest}
                                        disabled={testing}
                                        className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-500 transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2"
                                    >
                                        {testing ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} fill="currentColor" />}
                                        {testing ? 'Processing...' : 'Execute Request'}
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                                    {/* Request Payload */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                <Terminal size={12} /> Request Intent
                                            </h4>
                                            <button
                                                onClick={() => handleCopy(activeEp.payload)}
                                                className="text-[10px] font-bold text-primary-600 hover:underline flex items-center gap-1"
                                            >
                                                {copied ? <CheckCircle2 size={10} /> : <Copy size={10} />}
                                                {copied ? 'Copied' : 'Copy Payload'}
                                            </button>
                                        </div>
                                        <div className="bg-slate-950 rounded-2xl p-6 font-mono text-[11px] text-blue-300 overflow-x-auto h-full min-h-[160px] border border-white/5">
                                            <pre>{JSON.stringify(JSON.parse(activeEp.payload === '-' ? '{}' : activeEp.payload), null, 2)}</pre>
                                        </div>
                                    </div>

                                    {/* Response Body */}
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Code size={12} /> Response Trace
                                        </h4>
                                        <div className="bg-[#0b0f1a] rounded-[1.5rem] p-6 font-mono text-[11px] text-emerald-400 overflow-x-auto h-full min-h-[160px] border border-white/5 relative group">
                                            <div className="absolute top-4 right-4 text-[8px] font-black uppercase text-slate-700">application/json</div>
                                            <AnimatePresence mode="wait">
                                                {testResult ? (
                                                    <motion.pre
                                                        key="result"
                                                        initial={{ opacity: 0, scale: 0.98 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                    >
                                                        {JSON.stringify(testResult, null, 2)}
                                                    </motion.pre>
                                                ) : (
                                                    <motion.div
                                                        key="placeholder"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="text-slate-800 italic flex flex-col items-center justify-center h-full gap-4 opacity-50"
                                                    >
                                                        <Database size={32} />
                                                        <p className="tracking-widest uppercase text-[8px] font-black text-center">Ready for Burst Telemetry</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="registry"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        className="glass-card overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
                            <div>
                                <h3 className="text-lg font-bold">API Catalog</h3>
                                <p className="text-xs text-slate-500">Complete service map of the Neural Support Infrastructure.</p>
                            </div>
                            <div className="w-64 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Filter services..."
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-primary-500/20"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 dark:bg-slate-900/10 border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Name</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {filteredEndpoints.map(ep => (
                                        <tr key={ep.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-black ${ep.method === 'POST' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                                        {ep.method}
                                                    </span>
                                                    <code className="text-[10px] font-mono text-slate-400">{ep.path}</code>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-bold">{ep.name}</div>
                                                    <div className="text-[10px] text-slate-500">{ep.desc}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => { setSelectedId(ep.id); setViewMode('explorer'); }}
                                                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-600 hover:text-white rounded-lg text-[10px] font-bold transition-all"
                                                >
                                                    Open Explorer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Governance Section */}
            <div className="glass-card p-8 border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="font-bold flex items-center gap-2 mb-1">
                            <ShieldCheck size={18} className="text-emerald-500" />
                            Infrastructure Governance
                        </h3>
                        <p className="text-xs text-slate-400">Control edge gateway security and performance middleware.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { id: 'webhooks', label: 'Webhooks', desc: 'Push ticket events' },
                        { id: 'caching', label: 'Caching', desc: 'Edge CDN layer' },
                        { id: 'rateLimiting', label: 'Rate Limit', desc: 'DDoS protection' },
                        { id: 'logging', label: 'Logging', desc: 'Audit compliance' }
                    ].map(opt => (
                        <div key={opt.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold mb-0.5">{opt.label}</p>
                                <p className="text-[10px] text-slate-500">{opt.desc}</p>
                            </div>
                            <button
                                onClick={() => handleToggle(opt.id)}
                                className={`w-8 h-4 rounded-full p-0.5 transition-colors relative flex items-center ${toggles[opt.id] ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                            >
                                <motion.div
                                    animate={{ x: toggles[opt.id] ? 16 : 0 }}
                                    className="w-3 h-3 bg-white rounded-full shadow-sm"
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default APIManagement;
