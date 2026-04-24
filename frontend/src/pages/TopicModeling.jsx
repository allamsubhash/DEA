import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Network,
    Search,
    MessageSquare,
    TrendingUp,
    Activity,
    Layers,
    ChevronRight,
    Filter,
    Loader2
} from 'lucide-react';
import { api } from '../utils/api';

const TopicModeling = () => {
    const [topics, setTopics] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [investigating, setInvestigating] = React.useState(false);
    const [selectedTopic, setSelectedTopic] = React.useState(null);

    const handleInvestigate = () => {
        setInvestigating(true);
        setTimeout(() => setInvestigating(false), 2000);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getTopicModeling();
                // Map API data to UI format
                const mappedTopics = data.map((t, i) => ({
                    id: i + 1,
                    name: t.topic,
                    size: Math.round(t.weight * 100),
                    sentiment: i % 2 === 0 ? 'Negative' : 'Neutral', // Mock sentiment for now
                    keywords: t.keywords
                }));
                setTopics(mappedTopics);
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
        <div className="p-6 space-y-6 lg:h-full overflow-hidden relative">
            <AnimatePresence>
                {selectedTopic && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTopic(null)}
                            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-[60] p-8 border border-slate-200 dark:border-slate-800"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold">{selectedTopic.name}</h3>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Topic Analysis</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${selectedTopic.sentiment === 'Negative' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {selectedTopic.sentiment}
                                </span>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Terms</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedTopic.keywords.map((kw, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Impact Score</p>
                                        <p className="text-2xl font-bold">{selectedTopic.size}%</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Growth</p>
                                        <p className="text-2xl font-bold text-emerald-500">+12%</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedTopic(null)}
                                    className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-500 transition-all active:scale-95"
                                >
                                    Close Analysis
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Topic Modeling (LDA)</h1>
                    <p className="text-slate-500 text-sm">Discover hidden patterns and emerging themes in customer support tickets.</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                    <button className="px-4 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 shadow-sm rounded-lg text-primary-600">Bubble Map</button>
                    <button className="px-4 py-1.5 text-xs font-bold text-slate-400">List View</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Interactive Bubble Map Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-3 glass-card p-6 h-[600px] flex items-center justify-center relative overflow-hidden bg-slate-50/30 dark:bg-slate-950/20"
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        {topics.map((topic, i) => (
                            <motion.div
                                key={topic.id}
                                whileHover={{ scale: 1.1, zIndex: 10 }}
                                drag
                                dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                                onClick={() => setSelectedTopic(topic)}
                                className={`absolute rounded-[2rem] flex flex-col items-center justify-center text-center cursor-move transition-shadow hover:shadow-2xl border-2 backdrop-blur-md shadow-lg ${topic.sentiment === 'Negative' ? 'bg-red-500/20 border-red-500/50 text-slate-800 dark:text-red-100' :
                                    topic.sentiment === 'Critical' ? 'bg-amber-500/30 border-amber-500/50 text-slate-800 dark:text-amber-100' :
                                        topic.sentiment === 'Positive' ? 'bg-emerald-500/20 border-emerald-500/50 text-slate-800 dark:text-emerald-100' :
                                            'bg-blue-500/20 border-blue-500/50 text-slate-800 dark:text-blue-100'
                                    }`}
                                style={{
                                    width: Math.max(100, topic.size * 3.5),
                                    height: Math.max(100, topic.size * 3.5),
                                    left: `calc(50% + ${Math.cos(i * 1.5) * 250}px - 50px)`,
                                    top: `calc(50% + ${Math.sin(i * 1.5) * 180}px - 50px)`,
                                }}
                            >
                                <p className="text-xs font-bold px-2">{topic.name}</p>
                                <p className="text-[10px] opacity-60 font-bold">{topic.size}%</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <Layers className="text-primary-600" size={16} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Topic Cluster Map</span>
                    </div>
                </motion.div>

                {/* Sidebar Detail */}
                <div className="space-y-6 text-left">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-6"
                    >
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Topic Insights</h3>
                        <div className="space-y-4">
                            {topics.slice(0, 3).map((topic, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedTopic(topic)}
                                    className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-primary-500/30 transition-all cursor-pointer"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-sm font-bold group-hover:text-primary-600 transition-colors uppercase">{topic.name}</p>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-primary-600" />
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {topic.keywords.slice(0, 3).map((kw, j) => (
                                            <span key={j} className="text-[8px] font-bold text-slate-400 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded uppercase">{kw}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between mt-4 text-[10px] font-bold">
                                        <span className={
                                            topic.sentiment === 'Negative' ? 'text-red-500' :
                                                topic.sentiment === 'Critical' ? 'text-amber-500' : 'text-slate-400'
                                        }>{topic.sentiment} Sentiment</span>
                                        <span className="text-primary-600">{topic.size}% Volume</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="glass-card p-6 bg-gradient-to-br from-slate-900 to-primary-950 text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="text-emerald-400" size={20} />
                            <h3 className="font-bold">Emerging Theme</h3>
                        </div>
                        <p className="text-xs opacity-70 mb-4 leading-relaxed">A new cluster around "Export Latency" has grown by 40% in the last 12 hours. High correlation with "Spark Job Failure".</p>
                        <button
                            onClick={handleInvestigate}
                            disabled={investigating}
                            className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all min-h-[40px] flex items-center justify-center gap-2"
                        >
                            {investigating ? <Loader2 size={12} className="animate-spin" /> : null}
                            {investigating ? 'Investigating...' : 'Investigate Cluster'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicModeling;
