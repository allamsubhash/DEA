import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    ChevronDown,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    AlertCircle,
    Eye,
    Trash2,
    Download,
    X,
    Activity,
    ChevronRight,
    Ticket,
    User as UserIcon,
    Zap,
    Plus,
    MessageSquare,
    ArrowLeft,
    ShieldCheck,
    Send,
    User,
    Loader2,
    CreditCard,
    LogIn,
    Truck,
    RefreshCcw,
    FileText,
    Paperclip,
    Archive,
    Reply
} from 'lucide-react';

const Tickets = ({ searchTerm: globalSearch, setSearchTerm: setGlobalSearch }) => {
    // Form State
    const [description, setDescription] = useState("");
    const [issueType, setIssueType] = useState("Billing Issue");
    const [priority, setPriority] = useState("Medium");
    const [isRaising, setIsRaising] = useState(false);
    const [error, setError] = useState("");

    // Result & List State
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // AI Agents and Departments for auto-assignment
    const agents = ["Alex Rivera", "Jordan Smith", "Sam Taylor", "Casey Wong", "Taylor Reed"];
    const departments = {
        "Billing Issue": "Finance & Billing",
        "Technical Problem": "Engineering",
        "Account Access": "Security & Identity",
        "Shipping Problem": "Logistics",
        "Refund Request": "Finance & Billing",
        "Other": "General Support"
    };

    // Result & List State
    const [lastTicket, setLastTicket] = useState(null);
    const [tickets, setTickets] = useState([
        { id: 'TCKT-99120', summary: "Can't login to the console using SSO", category: 'Auth', priority: 'High', status: 'Open', date: '2h ago', agent: "Alex Rivera", department: "Security & Identity", description: "User receives a 'Token Mismatch' error when attempting to authenticate via Okta." },
        { id: 'TCKT-99121', summary: "Payment was declined twice with error 402", category: 'Billing', priority: 'High', status: 'In Progress', date: '4h ago', agent: "Sam Taylor", department: "Finance & Billing", description: "Customer tried two different credit cards, both returned 402. Bank says transaction not seen." },
        { id: 'TCKT-99122', summary: "Slow API response in US-East clusters", category: 'Technical Problem', priority: 'Medium', status: 'Open', date: '6h ago', agent: "Engineering Team", department: "Engineering", description: "P99 latency has spiked to 1200ms in us-east-1 since 04:00 UTC." },
        { id: 'TCKT-99123', summary: "New feature request: Dark mode for API docs", category: 'Other', priority: 'Low', status: 'Resolved', date: '1d ago', agent: "Casey Wong", department: "General Support", description: "User wants a darker theme for the developer portal documentation." },
        { id: 'TCKT-99124', summary: "Hardware malfuction in Node-82", category: 'Technical Problem', priority: 'High', status: 'In Progress', date: '1d ago', agent: "Taylor Reed", department: "Logistics", description: "Memory ECC errors detected on Node-82. Needs physical inspection." },
        { id: 'TCKT-99125', summary: "Invoice #8271 incorrect tax calculation", category: 'Billing', priority: 'Medium', status: 'Resolved', date: '2d ago', agent: "Alex Rivera", department: "Finance & Billing", description: "The VAT was calculated at 20% instead of the local 15% rate." },
        { id: 'TCKT-99126', summary: "Bulk API key rotation script failed", category: 'Account Access', priority: 'High', status: 'Open', date: '2d ago', agent: "Jordan Smith", department: "Security & Identity", description: "Manual intervention required for 12 accounts where rotation script timed out." },
        { id: 'TCKT-99127', summary: "Data export taking > 2 hours", category: 'Technical Problem', priority: 'Low', status: 'Resolved', date: '3d ago', agent: "Casey Wong", department: "Engineering", description: "S3 export job is stalling at 92%. Retried twice." },
        { id: 'TCKT-99128', summary: "Shipment lost in transit #TRK-102", category: 'Shipping Problem', priority: 'Medium', status: 'In Progress', date: '3d ago', agent: "Taylor Reed", department: "Logistics", description: "Courier indicates package was delivered but customer has not received it." },
        { id: 'TCKT-99129', summary: "Webhook secret mismatch on production", category: 'Account Access', priority: 'High', status: 'Open', date: '4d ago', agent: "Engineering Team", department: "Security & Identity", description: "Production webhooks are failing signature verification." },
        { id: 'TCKT-99130', summary: "API Rate limit exceeded for Premium tier", category: 'Other', priority: 'Medium', status: 'Resolved', date: '5d ago', agent: "Sam Taylor", department: "General Support", description: "Customer reached their daily limit even though they are on the unlimited plan." },
    ]);

    const [localSearch, setLocalSearch] = useState("");
    const [catFilter, setCatFilter] = useState("All");
    const [prioFilter, setPrioFilter] = useState("All");

    const generateTicketID = () => `TCKT-${Math.floor(100000 + Math.random() * 900000)}`;

    const handleRaiseTicket = () => {
        if (!description.trim()) {
            setError("Please enter a description of your issue before submitting.");
            return;
        }
        setError("");
        setIsRaising(true);
        setLastTicket(null);

        // Simulate AI Processing
        setTimeout(() => {
            const assignedAgent = agents[Math.floor(Math.random() * agents.length)];
            const assignedDept = departments[issueType] || "General Support";

            const newTicket = {
                id: generateTicketID(),
                summary: description,
                category: issueType,
                description: description,
                predictedCategory: issueType === 'Other' ? 'Technical Support' : issueType,
                confidence: 0.85 + Math.random() * 0.14,
                priority: priority,
                department: assignedDept,
                agent: assignedAgent,
                attachedFiles: attachedFiles,
                status: 'Open',
                date: 'Just now'
            };

            setIsRaising(false);
            setLastTicket(newTicket);
            setTickets(prev => [newTicket, ...prev]);
            setDescription(""); // Reset form
            setAttachedFiles([]);
        }, 2000);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setAttachedFiles(prev => [...prev, ...files.map(f => f.name)]);
    };

    const handleStatusUpdate = (id, newStatus) => {
        setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    };

    const autofill = (text, type) => {
        setDescription(text);
        setIssueType(type);
        setError("");

        // Visual feedback
        const el = document.getElementById('complaint-input');
        if (el) {
            el.focus();
            el.classList.add('ring-4', 'ring-primary-500/20');
            setTimeout(() => el.classList.remove('ring-4', 'ring-primary-500/20'), 1000);
        }
    };

    const filteredTickets = tickets.filter(t => {
        const matchesSearch = t.summary.toLowerCase().includes(localSearch.toLowerCase()) || t.id.includes(localSearch);
        const matchesCat = catFilter === 'All' || t.category === catFilter;
        const matchesPrio = prioFilter === 'All' || t.priority === prioFilter;
        return matchesSearch && matchesCat && matchesPrio;
    });

    return (
        <div className="p-8 space-y-12 max-w-6xl mx-auto">
            {/* Header section */}
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-black tracking-tight gradient-text">Submit a Support Ticket</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Enter your complaint below and our AI system will classify the issue and generate a support ticket.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Submission Form (Left Side) */}
                <div className="lg:col-span-7 space-y-8">
                    <div className="glass-card p-8 border-primary-500/10 shadow-2xl">
                        <div className="space-y-6">
                            {/* Description Field */}
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Describe Your Issue</label>
                                <textarea
                                    id="complaint-input"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Example: I was charged twice for my order and need a refund."
                                    className={`w-full min-h-[160px] p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border ${error ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} focus:border-primary-500 transition-all outline-none text-sm font-medium leading-relaxed`}
                                />
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all">
                                        <Paperclip size={14} />
                                        Attach Files
                                        <input type="file" multiple className="hidden" onChange={handleFileChange} />
                                    </label>
                                    <AnimatePresence>
                                        {attachedFiles.map((f, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="px-3 py-2 bg-primary-50 dark:bg-primary-950/30 text-primary-600 rounded-xl text-[10px] font-bold flex items-center gap-2"
                                            >
                                                <FileText size={12} />
                                                {f}
                                                <X size={12} className="cursor-pointer" onClick={() => setAttachedFiles(prev => prev.filter((_, idx) => idx !== i))} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <AnimatePresence>
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-500 text-[10px] font-black uppercase mt-2 flex items-center gap-1"
                                        >
                                            <AlertCircle size={12} /> {error}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Dropdowns Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Issue Type</label>
                                    <div className="relative">
                                        <select
                                            value={issueType}
                                            onChange={(e) => setIssueType(e.target.value)}
                                            className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs font-bold appearance-none outline-none focus:border-primary-500"
                                        >
                                            <option>Billing Issue</option>
                                            <option>Technical Problem</option>
                                            <option>Account Access</option>
                                            <option>Shipping Problem</option>
                                            <option>Refund Request</option>
                                            <option>Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Priority</label>
                                    <div className="relative">
                                        <select
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                            className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs font-bold appearance-none outline-none focus:border-primary-500"
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleRaiseTicket}
                                disabled={isRaising}
                                className="w-full py-5 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary-500/20 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
                            >
                                {isRaising ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Analyzing your complaint and generating ticket...
                                    </>
                                ) : (
                                    <>
                                        <Zap size={20} className="fill-white" />
                                        Raise Ticket
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Quick Demo Buttons */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Demo Testing Shortcuts</h3>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { label: 'Payment Issue', icon: CreditCard, text: 'I was charged twice for my subscription this month.', type: 'Billing Issue' },
                                { label: 'Login Problem', icon: LogIn, text: 'My credentials are correct but I keep getting an invalid token error.', type: 'Account Access' },
                                { label: 'Delivery Delay', icon: Truck, text: 'The hardware upgrade I ordered 2 weeks ago is still out for delivery.', type: 'Shipping Problem' },
                                { label: 'Refund Request', icon: RefreshCcw, text: 'I would like to request a refund for the unused surplus credits.', type: 'Refund Request' },
                            ].map((demo, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => autofill(demo.text, demo.type)}
                                    className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:border-primary-500 hover:text-primary-600 transition-all shadow-sm"
                                >
                                    <demo.icon size={14} />
                                    {demo.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Section (Right Side) */}
                <div className="lg:col-span-5 relative">
                    <AnimatePresence mode="wait">
                        {lastTicket ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                                className="glass-card p-8 border-emerald-500/20 bg-emerald-500/5 sticky top-8"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-emerald-600 tracking-widest uppercase">Success</p>
                                        <h3 className="text-lg font-black">{lastTicket.id} Created</h3>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Your Complaint</label>
                                        <p className="text-xs italic text-slate-600 dark:text-slate-400 leading-relaxed">"{lastTicket.summary}"</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Predicted Category</p>
                                            <p className="text-sm font-black text-primary-600">{lastTicket.predictedCategory}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-[9px] font-black uppercase tracking-widest">Open</span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AI Confidence Score</p>
                                            <p className="text-[10px] font-black text-primary-500">{(lastTicket.confidence * 100).toFixed(1)}%</p>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${lastTicket.confidence * 100}%` }}
                                                className="h-full bg-primary-600"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Priority</p>
                                            <p className="text-xs font-bold">{lastTicket.priority}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Department</p>
                                            <p className="text-xs font-bold">{lastTicket.department}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-10 opacity-30">
                                <Activity size={60} strokeWidth={1} className="mb-6 animate-pulse" />
                                <p className="text-xs font-black uppercase tracking-[0.3em]">Neural Analyzer Active</p>
                                <p className="text-[10px] font-medium mt-2">Submit a ticket to trigger AI classification</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Ticket Management Area */}
            <div className="space-y-6 pt-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Your Tickets</h2>
                        <p className="text-xs text-slate-500 font-medium">Manage and track your active support requests.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                className="pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-xs outline-none focus:border-primary-500 min-w-[240px]"
                            />
                        </div>
                        <select
                            value={catFilter}
                            onChange={(e) => setCatFilter(e.target.value)}
                            className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none"
                        >
                            <option value="All">All Categories</option>
                            <option>Billing Issue</option>
                            <option>Technical Problem</option>
                            <option>Account Access</option>
                            <option>Shipping Problem</option>
                            <option>Refund Request</option>
                        </select>
                        <select
                            value={prioFilter}
                            onChange={(e) => setPrioFilter(e.target.value)}
                            className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none"
                        >
                            <option value="All">All Priorities</option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                </div>

                <div className="glass-card overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket ID</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Summary</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px) font-black text-slate-400 uppercase tracking-widest">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                            {filteredTickets.map(t => (
                                <tr
                                    key={t.id}
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors cursor-pointer group"
                                    onClick={() => setSelectedTicket(t)}
                                >
                                    <td className="px-6 py-4 text-xs font-black text-primary-600">
                                        <div className="flex items-center gap-2">
                                            {t.id}
                                            <Eye size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium max-w-[200px] truncate">{t.summary}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 rounded text-[9px] font-black uppercase tracking-widest text-slate-500">{t.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${t.priority === 'High' ? 'text-red-500' : t.priority === 'Medium' ? 'text-amber-600' : 'text-slate-400'}`}>{t.priority}</span>
                                    </td>
                                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                        <select
                                            value={t.status}
                                            onChange={(e) => handleStatusUpdate(t.id, e.target.value)}
                                            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest outline-none border-none cursor-pointer ${t.status === 'Open' ? 'bg-amber-100 text-amber-600' : t.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}
                                        >
                                            <option>Open</option>
                                            <option>In Progress</option>
                                            <option>Resolved</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-[10px] font-bold text-slate-400">{t.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredTickets.length === 0 && (
                        <div className="py-20 text-center opacity-30">
                            <Ticket size={40} className="mx-auto mb-4" />
                            <p className="text-xs font-black uppercase tracking-widest">No matching tickets found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Ticket Detail Modal */}
            <AnimatePresence>
                {selectedTicket && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTicket(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                        >
                            <div className="p-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                                            <ShieldCheck size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black">{selectedTicket.id}</h2>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket details & neural logs</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Issue Description</label>
                                        <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-sm font-medium leading-relaxed">
                                            {selectedTicket.description || selectedTicket.summary}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                            <p className="text-xs font-bold text-primary-600">{selectedTicket.status}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Priority</p>
                                            <p className="text-xs font-bold text-red-500">{selectedTicket.priority}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Category</p>
                                            <p className="text-xs font-bold">{selectedTicket.category}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Created</p>
                                            <p className="text-xs font-bold">{selectedTicket.date}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Assigned Agent</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black uppercase">
                                                    {selectedTicket.agent ? selectedTicket.agent.split(' ').map(n => n[0]).join('') : 'AI'}
                                                </div>
                                                <p className="text-xs font-bold">{selectedTicket.agent || "Calculating..."}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Department</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black uppercase">
                                                    <Archive size={14} />
                                                </div>
                                                <p className="text-xs font-bold">{selectedTicket.department || "Universal"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedTicket.attachedFiles && selectedTicket.attachedFiles.length > 0 && (
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Attachments</label>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedTicket.attachedFiles.map((f, i) => (
                                                    <div key={i} className="px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-[10px] font-bold flex items-center gap-2">
                                                        <FileText size={12} className="text-primary-500" />
                                                        {f}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button className="flex-1 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-primary-500/20 transition-all">
                                        <Reply size={16} />
                                        Reply to Thread
                                    </button>
                                    <button className="px-6 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tickets;
