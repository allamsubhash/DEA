from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time
from model import classifier

app = FastAPI(title="SmartSupport AI API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TicketRequest(BaseModel):
    text: str

class PredictionResponse(BaseModel):
    id: int
    text: str
    category: str
    confidence: float
    explanation: str
    status: str
    sentiment: str  # Added sentiment
    timestamp: float

class LoginRequest(BaseModel):
    email: str
    password: str

# Mock database for dashboard
history = [
    {"id": 1, "text": "I can't access my billing history.", "category": "Billing", "confidence": 92.5, "status": "Open", "sentiment": "Neutral", "timestamp": time.time() - 3600},
    {"id": 2, "text": "My package is delayed by 3 days.", "category": "Shipping", "confidence": 88.2, "status": "In Progress", "sentiment": "Negative", "timestamp": time.time() - 7200},
    {"id": 3, "text": "How do I change my primary email?", "category": "Account", "confidence": 95.1, "status": "Resolved", "sentiment": "Positive", "timestamp": time.time() - 10800},
]

@app.get("/")
async def root():
    return {"message": "Welcome to SmartSupport AI API - Pro Version"}

def analyze_sentiment(text: str) -> str:
    neg_words = ['broken', 'fail', 'bad', 'not working', 'slow', 'frustrated', 'terrible', 'delayed', 'error']
    pos_words = ['thanks', 'great', 'good', 'helped', 'happy', 'awesome', 'perfect']
    
    text_lower = text.lower()
    neg_count = sum(1 for word in neg_words if word in text_lower)
    pos_count = sum(1 for word in pos_words if word in text_lower)
    
    if neg_count > pos_count:
        return "Negative"
    elif pos_count > neg_count:
        return "Positive"
    return "Neutral"

@app.post("/predict", response_model=PredictionResponse)
async def predict_ticket(request: TicketRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Ticket text cannot be empty")
    
    # Simulate processing time
    time.sleep(1)
    
    result = classifier.predict(request.text)
    sentiment = analyze_sentiment(request.text)
    
    new_ticket = {
        "id": len(history) + 1,
        "text": request.text,
        "category": result["category"],
        "confidence": result["confidence"],
        "explanation": result["explanation"],
        "status": "Open",
        "sentiment": sentiment,
        "timestamp": time.time()
    }
    
    # Add to history
    history.append(new_ticket)
    
    return new_ticket

@app.get("/history")
async def get_history():
    return history[::-1]

@app.get("/stats")
async def get_stats():
    categories = {}
    for item in history:
        cat = item["category"]
        categories[cat] = categories.get(cat, 0) + 1
    
    pie_data = [{"name": name, "value": value} for name, value in categories.items()]
    
    bar_data = [
        {"day": "Mon", "tickets": 12},
        {"day": "Tue", "tickets": 19},
        {"day": "Wed", "tickets": 15},
        {"day": "Thu", "tickets": 25},
        {"day": "Fri", "tickets": 22},
        {"day": "Sat", "tickets": 10},
        {"day": "Sun", "tickets": 8},
    ]
    
    return {
        "pie_data": pie_data,
        "bar_data": bar_data,
        "total_tickets": len(history)
    }

@app.get("/insights")
async def get_insights():
    sentiments = {"Positive": 0, "Neutral": 0, "Negative": 0}
    for item in history:
        sent = item.get("sentiment", "Neutral")
        sentiments[sent] += 1
        
    sentiment_data = [{"name": k, "value": v} for k, v in sentiments.items()]
    
    return {
        "sentiment_distribution": sentiment_data,
        "top_issues": sorted(
            [{"issue": cat, "count": count} for cat, count in (await get_stats())["pie_data"]], 
            key=lambda x: x["count"], reverse=True
        )[:3],
        "system_health": "Optimal",
        "avg_sentiment_score": 0.72
    }

@app.get("/performance")
async def get_performance():
    return {
        "accuracy": 0.94,
        "precision": 0.92,
        "recall": 0.91,
        "f1": 0.915,
        "confusion_matrix": [
            {"actual": "Billing", "predicted": "Billing", "value": 45},
            {"actual": "Billing", "predicted": "Technical", "value": 2},
            {"actual": "Technical", "predicted": "Technical", "value": 52},
            {"actual": "Technical", "predicted": "Billing", "value": 3},
            {"actual": "Shipping", "predicted": "Shipping", "value": 38},
            {"actual": "Account", "predicted": "Account", "value": 41}
        ]
    }

@app.get("/sentiment")
async def get_sentiment_data():
    return {
        "overall_sentiment": 0.72,
        "sentiment_over_time": [
            {"time": "09:00", "sentiment": 0.65},
            {"time": "10:00", "sentiment": 0.72},
            {"time": "11:00", "sentiment": 0.68},
            {"time": "12:00", "sentiment": 0.75},
            {"time": "13:00", "sentiment": 0.82},
        ],
        "keywords": [
            {"text": "slow", "value": 45, "type": "negative"},
            {"text": "helpful", "value": 38, "type": "positive"},
            {"text": "broken", "value": 32, "type": "negative"},
            {"text": "thanks", "value": 30, "type": "positive"},
        ]
    }

@app.get("/sla")
async def get_sla_data():
    return {
        "compliance_rate": 94.2,
        "avg_response_time": "14m",
        "avg_resolution_time": "2h 15m",
        "breach_risk": [
            {"id": "T-123", "subject": "Billing Error", "timeLeft": "5m", "priority": "High"},
            {"id": "T-124", "subject": "Login Issue", "timeLeft": "12m", "priority": "Medium"},
        ]
    }

@app.get("/root-cause")
async def get_root_cause():
    return {
        "top_clusters": [
            {"name": "Checkout Timeout", "impact": "High", "count": 24},
            {"name": "Password Reset Loop", "impact": "Medium", "count": 18},
            {"name": "Mobile App Crash", "impact": "High", "count": 12},
        ]
    }

@app.get("/agent-performance")
async def get_agent_performance():
    return [
        {"name": "Alice Smith", "rating": 4.8, "tickets": 142, "status": "Online"},
        {"name": "Bob Johnson", "rating": 4.5, "tickets": 128, "status": "Away"},
        {"name": "Charlie Brown", "rating": 4.9, "tickets": 156, "status": "Online"},
    ]

@app.get("/topic-modeling")
async def get_topic_modeling():
    return [
        {"topic": "Account Security", "weight": 0.85, "keywords": ["password", "mfa", "login", "reset"]},
        {"topic": "App Performance", "weight": 0.72, "keywords": ["slow", "lag", "crash", "stuck"]},
        {"topic": "Billing Issues", "weight": 0.64, "keywords": ["refund", "charge", "invoice", "payment"]},
    ]

@app.get("/realtime")
async def get_realtime_data():
    # Return 5 random events
    events = [
        {"id": int(time.time() * 1000) + i, "event": "Ticket Received", "user": f"User_{i}", "time": "Just now"}
        for i in range(5)
    ]
    return events

@app.get("/datasets")
async def get_datasets():
    return [
        {"name": "training_v1", "size": "1.2GB", "status": "Ready", "rows": 45000},
        {"name": "validation_v1", "size": "240MB", "status": "Ready", "rows": 8000},
        {"name": "raw_logs_march", "size": "4.5GB", "status": "Processing", "rows": 125000},
    ]

@app.get("/pipeline-health")
async def get_pipeline_health():
    return {
        "status": "Healthy",
        "throughput": "450 msg/s",
        "latency": "12ms",
        "workers": 8,
        "error_rate": 0.02
    }

@app.get("/features")
async def get_features():
    return [
        {"name": "tfidf_vector", "importance": 0.45, "type": "Textual"},
        {"name": "sender_domain", "importance": 0.12, "type": "Metadata"},
        {"name": "ticket_length", "importance": 0.08, "type": "Numeric"},
        {"name": "past_interactions", "importance": 0.15, "type": "Numeric"},
    ]

@app.post("/chatbot")
async def chatbot_reply(request: TicketRequest):
    return {"reply": f"I've analyzed your request: '{request.text[:20]}...'. Our team is looking into it."}

@app.get("/ticket/{ticket_id}")
async def get_ticket_detail(ticket_id: int):
    # Try to find in history
    ticket = next((t for t in history if t["id"] == ticket_id), None)
    
    # If not found, create a placeholder for the demo
    if not ticket:
        ticket = {
            "id": ticket_id,
            "text": f"Dynamic Support Case #{ticket_id} regarding System Performance",
            "category": "Technical",
            "confidence": 88.0,
            "status": "Open",
            "sentiment": "Neutral",
            "timestamp": time.time() - 5000
        }
        
    return {
        "id": f"TKT-{ticket['id']}",
        "title": ticket["text"][:50] + "..." if len(ticket["text"]) > 50 else ticket["text"],
        "category": ticket["category"],
        "priority": "High" if ticket["sentiment"] in ["Negative", "Critical"] else "Medium",
        "status": ticket["status"],
        "date": time.strftime("%Y-%m-%d %H:%M", time.localtime(ticket["timestamp"])),
        "sentiment": ticket["sentiment"],
        "confidence": int(ticket["confidence"]),
        "customer": {
            "name": "Enterprise User",
            "email": "contact@bigcorp.com",
            "plan": "Elite Premier",
            "joined": "Oct 2023"
        },
        "messages": [
            { "id": 1, "sender": "customer", "text": ticket["text"], "time": "10:30 AM" },
            { "id": 2, "sender": "bot", "text": f"Analyzing patterns... I've routed this to the {ticket['category']} response team. [Ref: AI-GEN-882]", "time": "10:31 AM" },
            { "id": 3, "sender": "agent", "text": "I'm looking into your request now. Can you confirm if this is affecting all regions?", "time": "11:15 AM" }
        ]
    }

@app.post("/bulk-predict")
async def bulk_predict(requests: List[TicketRequest]):
    results = []
    for req in requests:
        if not req.text.strip():
            continue
        
        result = classifier.predict(req.text)
        sentiment = analyze_sentiment(req.text)
        
        new_ticket = {
            "id": len(history) + 1,
            "text": req.text,
            "category": result["category"],
            "confidence": result["confidence"],
            "explanation": result["explanation"],
            "status": "Open",
            "sentiment": sentiment,
            "timestamp": time.time()
        }
        history.append(new_ticket)
        results.append(new_ticket)
        
    return results

@app.get("/explain")
async def get_explanation():
    return [
        { "word": "Charged", "weight": 0.45, "type": "pos" },
        { "word": "Invoice", "weight": 0.32, "type": "pos" },
        { "word": "Twice", "weight": 0.28, "type": "pos" },
        { "word": "Same", "weight": -0.05, "type": "neg" }
    ]

@app.get("/forecast")
async def get_forecast():
    return [
        { "name": "Feb 26", "actual": 150 },
        { "name": "Feb 27", "actual": 180 },
        { "name": "Feb 28", "actual": 210 },
        { "name": "Mar 01", "actual": 240 },
        { "name": "Mar 02", "predicted": 240, "lower": 220, "upper": 260 },
        { "name": "Mar 03", "predicted": 260, "lower": 230, "upper": 290 },
        { "name": "Mar 04", "predicted": 290, "lower": 250, "upper": 330 },
        { "name": "Mar 05", "predicted": 310, "lower": 260, "upper": 360 },
    ]

@app.get("/multilingual")
async def get_multilingual_stats():
    return [
        {"lang": "English", "count": 1240, "sentiment": 0.2},
        {"lang": "Spanish", "count": 450, "sentiment": 0.1},
        {"lang": "French", "count": 210, "sentiment": -0.1},
        {"lang": "German", "count": 180, "sentiment": 0.0},
    ]

@app.get("/admin/logs")
async def get_admin_logs():
    return [
        {"id": 1, "action": "Model Retrained", "user": "Admin", "time": "2h ago", "status": "Success"},
        {"id": 2, "action": "Settings Updated", "user": "Sarah", "time": "4h ago", "status": "Success"},
        {"id": 3, "action": "User Deleted", "user": "Admin", "time": "1d ago", "status": "Warning"},
    ]

@app.post("/login")
async def login(request: LoginRequest):
    # Mock authentication
    if request.email == "admin@smartsupport.ai" and request.password == "admin":
        return {"status": "success", "token": "mock-jwt-token", "user": {"name": "Admin", "role": "admin"}}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/signup")
async def signup(request: LoginRequest):
    return {"status": "success", "message": "User created (mock)"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
