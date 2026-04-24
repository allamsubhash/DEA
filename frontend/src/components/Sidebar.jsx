import React from 'react';
import {
  LayoutDashboard,
  Ticket,
  Search,
  Brain,
  Smile,
  BarChart3,
  AlertTriangle,
  Users,
  Settings,
  Database,
  Waves,
  Zap,
  Cpu,
  LineChart,
  Network,
  Globe,
  MessageSquare,
  FileText,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Fingerprint,
  Terminal
} from 'lucide-react';

const Sidebar = ({ activePage, setActivePage, collapsed }) => {
  const menuGroups = [
    {
      label: 'Core',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'tickets', label: 'Tickets', icon: Ticket },
        { id: 'detail', label: 'Ticket Detail', icon: Search, hidden: true },
      ]
    },
    {
      label: 'AI & Analytics',
      items: [
        { id: 'sentiment', icon: Smile, label: 'Sentiment' },
        { id: 'analytics', label: 'Ticket Analytics', icon: BarChart3 },
        { id: 'rootcause', label: 'Root Cause', icon: Fingerprint },
        { id: 'topics', label: 'Topics', icon: Network },
      ]
    },
    {
      label: 'AI Analysis',
      items: [
        { id: 'explainability', label: 'Explainability', icon: Zap },
        { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
      ]
    },
    {
      label: 'Monitoring',
      items: [
        { id: 'sla', label: 'SLA Monitoring', icon: AlertTriangle },
        { id: 'pipeline', label: 'Pipeline', icon: Waves },
        { id: 'stream', label: 'Real-time Feed', icon: Zap },
      ]
    },
    {
      label: 'Management',
      items: [
        { id: 'performance', label: 'Agent Perf', icon: Users },
        { id: 'models', label: 'ML Models', icon: Cpu },
        { id: 'data', label: 'Data Mgmt', icon: Database },
        { id: 'features', label: 'Feature Eng', icon: Settings },
      ]
    },
    {
      label: 'Governance',
      items: [
        { id: 'multilingual', label: 'Multilingual', icon: Globe },
        { id: 'chatbot', label: 'AI Chatbot', icon: MessageSquare },
        { id: 'api', label: 'API & Integrations', icon: Terminal },
      ]
    },
    {
      label: 'Administration',
      items: [
        { id: 'admin', label: 'Admin & Reports', icon: ShieldCheck },
      ]
    }
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-40 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center gap-3 px-6 h-20 border-b border-slate-200 dark:border-slate-800 overflow-hidden whitespace-nowrap">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary-500/20">
          <Brain size={24} />
        </div>
        {!collapsed && (
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 leading-none">
            SmartSupport
          </span>
        )}
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-80px)] custom-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            {!collapsed && (
              <h3 className="px-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                {group.label}
              </h3>
            )}
            <nav className="space-y-1">
              {group.items.filter(item => !item.hidden).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`sidebar-item w-full group ${activePage === item.id ? 'sidebar-item-active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
                  title={collapsed ? item.label : ''}
                >
                  <item.icon size={20} className={`${activePage === item.id ? 'text-primary-600' : 'text-slate-500 group-hover:text-primary-500'}`} />
                  {!collapsed && (
                    <span className="flex-1 text-left">{item.label}</span>
                  )}
                  {!collapsed && activePage === item.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
