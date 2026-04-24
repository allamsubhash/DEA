import React, { useState } from 'react';
import {
    Search,
    Bell,
    Moon,
    Sun,
    Menu,
    Settings,
    User,
    LogOut,
    ChevronDown,
    Command,
    AlertTriangle
} from 'lucide-react';

const Navbar = ({ toggleSidebar, darkMode, setDarkMode, setActivePage }) => {
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            if (onSearch) onSearch(searchQuery);
            setSearchQuery('');
        }
    };

    return (
        <header className="glass-nav px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
                >
                    <Menu size={20} />
                </button>

                <div className="relative max-w-md w-full hidden md:block">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-slate-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        placeholder="Search tickets, agents, analytics... (Press Enter)"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <div className="px-1.5 py-0.5 border border-slate-200 dark:border-slate-800 rounded text-[10px] font-medium text-slate-400 bg-white dark:bg-slate-950 flex items-center gap-1">
                            <Command size={10} /> K
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all relative"
                    >
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-3 w-80 glass-card p-4 animate-fade-in z-50">
                            <h4 className="font-semibold mb-3">Notifications</h4>
                            <div className="space-y-4">
                                <div className="flex gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                                        <AlertTriangle size={14} />
                                    </div>
                                    <div>
                                        <p className="font-medium">SLA Breach Warning</p>
                                        <p className="text-slate-400 text-xs">Ticket #4502 is close to breaching SLA.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 shrink-0">
                                        <User size={14} />
                                    </div>
                                    <div>
                                        <p className="font-medium">New Agent Assigned</p>
                                        <p className="text-slate-400 text-xs">Sarah J. assigned to Billing Queue.</p>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-4 text-xs text-primary-600 font-medium py-2 hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded-lg">
                                View all notifications
                            </button>
                        </div>
                    )}
                </div>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-2 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white dark:ring-slate-900">
                            AD
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold leading-none">Admin Demo</p>
                            <p className="text-[10px] text-slate-400 mt-1">Super Admin</p>
                        </div>
                        <ChevronDown size={14} className="text-slate-400" />
                    </button>

                    {showProfile && (
                        <div className="absolute right-0 mt-3 w-56 glass-card p-2 animate-fade-in z-50">
                            <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                                <User size={16} /> My Profile
                            </button>
                            <button
                                onClick={() => { setActivePage('settings'); setShowProfile(false); }}
                                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                            >
                                <Settings size={16} /> Admin Settings
                            </button>
                            <hr className="my-2 border-slate-100 dark:border-slate-800" />
                            <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg">
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
