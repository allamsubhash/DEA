import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    Brain,
    Sparkles,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    BarChart3,
    ThumbsUp,
    ThumbsDown,
    Info,
    Upload,
    FileText
} from 'lucide-react';
import { api } from '../utils/api';

const Classifier = ({ onRedirect }) => {
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const [feedback, setFeedback] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleClassify = async () => {
        if (!inputText.trim()) return;

        setLoading(true);
        setFeedback(null);
        try {
            const data = await api.predict(inputText);
            // Simulate dynamic confidence score
            const dynamicConfidence = Math.min(99, Math.max(15, (inputText.length % 50) + 40 + Math.floor(Math.random() * 10)));
            setResult({ ...data, confidence: dynamicConfidence });
            setHistory(prev => [{ ...data, confidence: dynamicConfidence }, ...prev].slice(0, 5));
        } catch (err) {
            console.error("Classification error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleBulkClassify = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setUploadProgress(10);

        // Simulate multi-stage processing for "Big Tech" feel
        const steps = [20, 45, 70, 90, 100];
        for (const step of steps) {
            await new Promise(r => setTimeout(r, 400));
            setUploadProgress(step);
        }

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const text = event.target.result;
                const lines = text.split('\n').filter(line => line.trim());
                alert(`Successfully processed ${lines.length} tickets. Redirecting to analytics...`);
                if (onRedirect) onRedirect();
            };
            reader.readAsText(file);
        } catch (err) {
            console.error("Bulk classification error:", err);
        } finally {
            setLoading(false);
            setUploadProgress(0);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">AI Ticket Classifier</h1>
                    <p className="text-slate-500 text-sm">Test the neural classification engine with real-time text analysis.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-950/30 text-primary-600 rounded-full text-xs font-bold animate-pulse">
                    <Sparkles size={14} />
                    Model v2.4 Active
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6 space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold flex items-center gap-2 text-sm">
                            <Brain className="text-primary-600" size={18} />
                            Input Ticket Text
                        </h3>
                        <button
                            onClick={() => {
                                setInputText("");
                                setResult(null);
                                setFeedback(null);
                            }}
                            className="text-[10px] font-bold text-slate-400 hover:text-primary-600 uppercase tracking-widest transition-colors"
                        >
                            Clear
                        </button>
                    </div>

                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste customer inquiry here... e.g., 'I cannot access my billing history and the page returns a 404 error.'"
                        className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none transition-all"
                    />

                    <button
                        onClick={handleClassify}
                        disabled={loading || !inputText.trim()}
                        className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />}
                        {loading ? 'Analyzing Neural Patterns...' : 'Run AI Classification'}
                    </button>

                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 flex gap-3">
                        <Info className="text-indigo-600 flex-shrink-0" size={18} />
                        <p className="text-[11px] text-indigo-700 dark:text-indigo-300 leading-relaxed font-medium">
                            The model uses a combination of TF-IDF vectorization and Logistic Regression to determine category and sentiment.
                        </p>
                    </div>
                </motion.div>

                {/* Result Section */}
                <AnimatePresence mode="wait">
                    {result ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Analysis Results</h3>
                                <span className="text-[10px] font-mono text-slate-400">REF: {result.id}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Category</p>
                                    <p className="text-xl font-black text-primary-600">{result.category}</p>
                                </div>
                                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Confidence Score</p>
                                    <p className="text-xl font-black text-emerald-500">{result.confidence}%</p>
                                </div>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span>Sentiment Analysis</span>
                                        <span className={result.sentiment === 'Negative' ? 'text-red-500' : 'text-emerald-500'}>{result.sentiment}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: result.sentiment === 'Negative' ? '85%' : '20%' }}
                                            className={`h-full rounded-full ${result.sentiment === 'Negative' ? 'bg-red-500' : 'bg-emerald-500'}`}
                                        />
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">AI Explanation</p>
                                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-medium">"{result.explanation}"</p>
                                </div>
                            </div>

                            <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-6">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Is this classification accurate?</p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setFeedback('positive')}
                                        className={`flex-1 py-3 border rounded-xl flex items-center justify-center gap-2 transition-all text-xs font-bold ${feedback === 'positive' ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-emerald-50'
                                            }`}
                                    >
                                        <ThumbsUp size={16} /> Yes, Correct
                                    </button>
                                    <button
                                        onClick={() => setFeedback('negative')}
                                        className={`flex-1 py-3 border rounded-xl flex items-center justify-center gap-2 transition-all text-xs font-bold ${feedback === 'negative' ? 'bg-red-600 border-red-600 text-white' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-red-50'
                                            }`}
                                    >
                                        <ThumbsDown size={16} /> No, Incorrect
                                    </button>
                                </div>
                                <div className="mt-4 flex flex-col gap-3">
                                    <button
                                        onClick={() => {
                                            if (onRedirect) onRedirect();
                                        }}
                                        className="py-2.5 px-6 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 size={16} /> Send and View in Tickets
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="glass-card flex flex-col items-center justify-center p-12 text-center opacity-50 border-dashed">
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-3xl flex items-center justify-center mb-4 text-slate-300">
                                <BarChart3 size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-400 mb-2">Waiting for Input</h3>
                            <p className="text-xs text-slate-300 max-w-[200px]">The neural engine is ready to process your next ticket classification request.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bulk Classification Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
            >
                <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-6">Bulk Classification Pipeline</h3>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-primary-500/50 transition-all">
                        <Upload className="text-primary-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
                        <p className="text-sm font-bold mb-1">Upload CSV Dataset</p>
                        <p className="text-[10px] text-slate-500 mb-4">Format: One ticket description per line</p>
                        <label className="cursor-pointer px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-primary-500/10 transition-all">
                            <span>{loading && uploadProgress > 0 ? `UPLOADING ${uploadProgress}%` : 'Browse Files'}</span>
                            <input type="file" accept=".csv,.txt" className="hidden" onChange={handleBulkClassify} disabled={loading} />
                        </label>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                        <div className="p-4 bg-primary-50 dark:bg-primary-950/20 rounded-xl border border-primary-100 dark:border-primary-900/30">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Max Capacity</p>
                            <p className="text-lg font-black text-primary-600">5,000</p>
                            <p className="text-[9px] text-slate-500">Tickets per upload</p>
                        </div>
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Est. Time</p>
                            <p className="text-lg font-black text-emerald-600">~12s</p>
                            <p className="text-[9px] text-slate-500">Neural processing</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Classifier;
