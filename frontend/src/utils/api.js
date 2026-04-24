const API_BASE_URL = 'http://localhost:8000';

export const api = {
    async getStats() {
        const res = await fetch(`${API_BASE_URL}/stats`);
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
    },

    async getInsights() {
        const res = await fetch(`${API_BASE_URL}/insights`);
        if (!res.ok) throw new Error('Failed to fetch insights');
        return res.json();
    },

    async getHistory() {
        const res = await fetch(`${API_BASE_URL}/history`);
        if (!res.ok) throw new Error('Failed to fetch history');
        return res.json();
    },

    async getPerformance() {
        const res = await fetch(`${API_BASE_URL}/performance`);
        if (!res.ok) throw new Error('Failed to fetch performance');
        return res.json();
    },

    async predict(text) {
        const res = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error('Prediction failed');
        return res.json();
    },

    async login(email, password) {
        const res = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    },

    async getSentiment() {
        const res = await fetch(`${API_BASE_URL}/sentiment`);
        if (!res.ok) throw new Error('Failed to fetch sentiment');
        return res.json();
    },

    async getSLA() {
        const res = await fetch(`${API_BASE_URL}/sla`);
        if (!res.ok) throw new Error('Failed to fetch SLA');
        return res.json();
    },

    async getRootCause() {
        const res = await fetch(`${API_BASE_URL}/root-cause`);
        if (!res.ok) throw new Error('Failed to fetch root cause');
        return res.json();
    },

    async getAgentPerformance() {
        const res = await fetch(`${API_BASE_URL}/agent-performance`);
        if (!res.ok) throw new Error('Failed to fetch agent performance');
        return res.json();
    },

    async getTopicModeling() {
        const res = await fetch(`${API_BASE_URL}/topic-modeling`);
        if (!res.ok) throw new Error('Failed to fetch topic modeling');
        return res.json();
    },

    async getRealtime() {
        const res = await fetch(`${API_BASE_URL}/realtime`);
        if (!res.ok) throw new Error('Failed to fetch realtime data');
        return res.json();
    },

    async getDatasets() {
        const res = await fetch(`${API_BASE_URL}/datasets`);
        if (!res.ok) throw new Error('Failed to fetch datasets');
        return res.json();
    },

    async getPipelineHealth() {
        const res = await fetch(`${API_BASE_URL}/pipeline-health`);
        if (!res.ok) throw new Error('Failed to fetch pipeline health');
        return res.json();
    },

    async getFeatures() {
        const res = await fetch(`${API_BASE_URL}/features`);
        if (!res.ok) throw new Error('Failed to fetch features');
        return res.json();
    },

    async chatbotReply(text) {
        const res = await fetch(`${API_BASE_URL}/chatbot`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error('Chatbot failed');
        return res.json();
    },

    async getTicketDetail(id) {
        const res = await fetch(`${API_BASE_URL}/ticket/${id}`);
        if (!res.ok) throw new Error('Failed to fetch ticket detail');
        return res.json();
    },

    async getExplanation() {
        const res = await fetch(`${API_BASE_URL}/explain`);
        if (!res.ok) throw new Error('Failed to fetch explanation');
        return res.json();
    },

    async getForecast() {
        const res = await fetch(`${API_BASE_URL}/forecast`);
        if (!res.ok) throw new Error('Failed to fetch forecast');
        return res.json();
    },

    async getMultilingualStats() {
        const res = await fetch(`${API_BASE_URL}/multilingual`);
        if (!res.ok) throw new Error('Failed to fetch multilingual stats');
        return res.json();
    },

    async getAdminLogs() {
        const res = await fetch(`${API_BASE_URL}/admin/logs`);
        if (!res.ok) throw new Error('Failed to fetch admin logs');
        return res.json();
    }
};
