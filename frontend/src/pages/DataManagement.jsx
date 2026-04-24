import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Database,
    Upload,
    FileText,
    CheckCircle,
    X,
    Search,
    MoreVertical,
    Download,
    Filter,
    Trash2,
    Edit2,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';

const previewData = [
    { id: 1, text: "I can't access my billing dashboard...", label: 'Billing', confidence: 0.98 },
    { id: 2, text: "The app crashes on startup...", label: 'Technical', confidence: 0.95 },
    { id: 3, text: "How do I export data to CSV?", label: 'Feature Info', confidence: 0.88 },
    { id: 4, text: "My account is locked out...", label: 'Account', confidence: 0.99 },
];

const datasetList = [
    { name: 'Q1_Technical_Queries.csv', size: '24.5 MB', rows: '12,450', status: 'Ready' },
    { name: 'Billing_Issues_2025.json', size: '18.2 MB', rows: '8,900', status: 'Processing' },
    { name: 'General_Feedback.csv', size: '5.1 MB', rows: '2,100', status: 'Ready' }
];

const DataManagement = () => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "ID,Text,Label,Confidence\n"
            + previewData.map(r => `${r.id},"${r.text}",${r.label},${r.confidence}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "smart_support_dataset.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileBrowse = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Process file locally or simulate upload
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Data Management</h1>
                    <p className="text-slate-500 text-sm">Upload, label, and manage datasets for ML training.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all"
                    >
                        <Download size={16} /> Export All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upload Section */}
                <div className="lg:col-span-1 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onDragEnter={handleDrag}
                        className={`glass-card p-8 border-2 border-dashed transition-all flex flex-col items-center justify-center text-center group ${dragActive ? 'border-primary-500 bg-primary-50/10' : 'border-slate-200 dark:border-slate-800'
                            }`}
                    >
                        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                            <Upload size={32} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Upload New Dataset</h3>
                        <p className="text-sm text-slate-500 mb-6 px-4">Drag and drop your CSV or JSON files here, or click to browse files.</p>
                        <label className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-500 transition-all active:scale-95 cursor-pointer">
                            Browse Files
                            <input type="file" className="hidden" onChange={handleFileBrowse} />
                        </label>
                    </motion.div>

                    <div className="glass-card p-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Recent Uploads</h3>
                        <div className="space-y-4">
                            {datasetList.map((ds, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <FileText size={20} className="text-slate-400" />
                                        <div>
                                            <p className="text-sm font-bold truncate max-w-[120px]">{ds.name}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">{ds.size} • {ds.rows} rows</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${ds.status === 'Ready' ? 'bg-emerald-100 text-emerald-600' :
                                        ds.status === 'Processing' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {ds.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Data Preview & Labeling */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card overflow-hidden"
                    >
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <h3 className="font-bold">Dataset Preview & Labeling</h3>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="relative flex-1 md:flex-none">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Filter data..."
                                        className="pl-8 pr-4 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs w-full"
                                    />
                                </div>
                                <button className="p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
                                    <Filter size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Raw Text</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Label</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {previewData.map((row, idx) => (
                                        <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-default">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[400px]">"{row.text}"</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded text-[10px] font-bold uppercase transition-all hover:bg-primary-100">
                                                        {row.label}
                                                    </span>
                                                    <button
                                                        onClick={() => alert(`Editing metadata for ID: ${row.id}`)}
                                                        className="p-1 hover:text-primary-600 transition-colors"
                                                    >
                                                        <Edit2 size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => alert(`Verified record #${row.id}`)}
                                                        className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                                                    >
                                                        <CheckCircle size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => alert(`Moved #${row.id} to trash`)}
                                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Page 1 of 520</p>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold shadow-sm">Prev</button>
                                <button className="px-3 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold shadow-sm">Next</button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="glass-card p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold mb-1">Data Labeling AI</h3>
                                <p className="text-white/60 text-sm">Automate your dataset labeling with our active learning engine.</p>
                            </div>
                            <Database size={32} className="text-white/20" />
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    const btn = document.getElementById('auto-label-btn');
                                    btn.innerText = "Analyzing Content...";
                                    btn.disabled = true;
                                    setTimeout(() => {
                                        btn.innerText = "Labeling Complete!";
                                        setTimeout(() => {
                                            btn.innerText = "Start Auto-Labeling";
                                            btn.disabled = false;
                                        }, 2000);
                                    }, 3000);
                                }}
                                id="auto-label-btn"
                                className="px-6 py-2.5 bg-white text-indigo-600 rounded-xl text-sm font-bold shadow-xl hover:bg-white/90 transition-all active:scale-95 disabled:opacity-70"
                            >
                                Start Auto-Labeling
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DataManagement;
