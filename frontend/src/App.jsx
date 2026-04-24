import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import TicketDetail from './pages/TicketDetail';
import SentimentAnalysis from './pages/SentimentAnalysis';
import TicketAnalytics from './pages/TicketAnalytics';
import SLAMonitoring from './pages/SLAMonitoring';
import RootCauseAnalysis from './pages/RootCauseAnalysis';
import ModelManagement from './pages/ModelManagement';
import DataManagement from './pages/DataManagement';
import PipelineMonitoring from './pages/PipelineMonitoring';
import FeatureEngineering from './pages/FeatureEngineering';
import Explainability from './pages/Explainability';
import Settings from './pages/Settings';
import TopicModeling from './pages/TopicModeling';
import RealTimeStream from './pages/RealTimeStream';
import AgentPerformance from './pages/AgentPerformance';
import Multilingual from './pages/Multilingual';
import Chatbot from './pages/Chatbot';
import Admin from './pages/Admin';
import APIManagement from './pages/APIManagement';

// Lazy load or import pages (placeholder components for now)
const PagePlaceholder = ({ name }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="p-6"
  >
    <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[60vh] text-center border-dashed border-2">
      <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
        {name} Page
      </h2>
      <p className="text-slate-500 max-w-md">
        This page is currently under development as part of Phase 1-4 of the Smart Support AI implementation.
      </p>
      <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-lg">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        ))}
      </div>
    </div>
  </motion.div>
);

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  const handleTicketClick = (ticket) => {
    setSelectedTicketId(ticket.id);
    setActivePage('detail');
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleGlobalSearch = (term) => {
    setGlobalSearchTerm(term);
    if (activePage !== 'tickets' && term.trim()) {
      setActivePage('tickets');
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard setActivePage={setActivePage} setStatusFilter={setStatusFilter} />;
      case 'tickets': return <Tickets
        searchTerm={globalSearchTerm}
        setSearchTerm={setGlobalSearchTerm}
        onTicketClick={handleTicketClick}
        setActivePage={setActivePage}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />;
      case 'detail': return <TicketDetail
        onBack={() => setActivePage('tickets')}
        ticketId={selectedTicketId}
        setActivePage={setActivePage}
      />;
      case 'sentiment': return <SentimentAnalysis setActivePage={setActivePage} />;
      case 'analytics': return <TicketAnalytics setActivePage={setActivePage} />;
      case 'rootcause': return <RootCauseAnalysis setActivePage={setActivePage} />;
      case 'sla': return <SLAMonitoring setActivePage={setActivePage} setSelectedTicketId={setSelectedTicketId} />;
      case 'models': return <ModelManagement setActivePage={setActivePage} />;
      case 'data': return <DataManagement setActivePage={setActivePage} />;
      case 'pipeline': return <PipelineMonitoring setActivePage={setActivePage} />;
      case 'stream': return <RealTimeStream setActivePage={setActivePage} onTicketClick={handleTicketClick} />;
      case 'features': return <FeatureEngineering setActivePage={setActivePage} />;
      case 'explainability': return <Explainability setActivePage={setActivePage} />;
      case 'forecasting': return <Explainability setActivePage={setActivePage} />;
      case 'topics': return <TopicModeling setActivePage={setActivePage} />;
      case 'performance': return <AgentPerformance setActivePage={setActivePage} />;
      case 'multilingual': return <Multilingual setActivePage={setActivePage} />;
      case 'chatbot': return <Chatbot setActivePage={setActivePage} />;
      case 'reports': return <Admin setActivePage={setActivePage} />;
      case 'admin': return <Admin setActivePage={setActivePage} />;
      case 'api': return <APIManagement setActivePage={setActivePage} />;
      case 'settings': return <Settings setActivePage={setActivePage} />;
      default: return <PagePlaceholder name="Dashboard" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={collapsed}
      />
      <div className={`transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar
          toggleSidebar={() => setCollapsed(!collapsed)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setActivePage={setActivePage}
          onSearch={handleGlobalSearch}
        />

        <main className="max-w-[1600px] mx-auto min-h-[calc(100vh-80px)] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -10, filter: 'blur(5px)' }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
