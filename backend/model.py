import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import pickle
import os

# Training data
DATA = [
    ("How do I reset my password?", "Account"),
    ("My account is locked and I cannot login.", "Account"),
    ("I want to update my profile information.", "Account"),
    ("Can I change my email address?", "Account"),
    ("I need to enable two-factor authentication.", "Account"),
    ("My account was suspended for no reason.", "Account"),
    ("The website is not loading for me.", "Technical"),
    ("I am getting a 404 error on the dashboard.", "Technical"),
    ("The mobile app keeps crashing when I open it.", "Technical"),
    ("How do I integrate the API into my project?", "Technical"),
    ("I found a bug in the classification logic.", "Technical"),
    ("The server is returning a 500 error consistently.", "Technical"),
    ("I was overcharged for my last subscription.", "Billing"),
    ("How can I cancel my premium plan?", "Billing"),
    ("I need a refund for the duplicate transaction.", "Billing"),
    ("Where can I find my invoice for this month?", "Billing"),
    ("My credit card was declined during checkout.", "Billing"),
    ("Can I switch from monthly to annual billing?", "Billing"),
    ("My package has not arrived yet.", "Shipping"),
    ("I received a damaged item in my order.", "Shipping"),
    ("Can I change the delivery address for my order?", "Shipping"),
    ("How do I track my shipment?", "Shipping"),
    ("The tracking number provided is invalid.", "Shipping"),
    ("I want to return a product I purchased.", "Shipping"),
    ("What are your business hours?", "General"),
    ("I have a suggestion for a new feature.", "General"),
    ("How can I talk to a live agent?", "General"),
    ("Thank you for your help!", "General"),
    ("Who is the CEO of this company?", "General"),
    ("Are there any job openings available?", "General")
]

class TicketClassifier:
    def __init__(self):
        self.model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
        self.pipeline = None
        self._train_initial_model()

    def _train_initial_model(self):
        df = pd.DataFrame(DATA, columns=["text", "category"])
        self.pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(stop_words='english', lowercase=True)),
            ('clf', LogisticRegression(C=1.0, solver='lbfgs'))
        ])
        self.pipeline.fit(df['text'], df['category'])
        
    def predict(self, text: str):
        probs = self.pipeline.predict_proba([text])[0]
        prediction = self.pipeline.predict([text])[0]
        confidence = float(np.max(probs))
        
        # Mapping categories to explanations
        explanations = {
            "Account": "Ticket is related to user account management, login issues, or profile updates.",
            "Technical": "Ticket concerns technical glitches, software bugs, or API integration issues.",
            "Billing": "Ticket involves invoices, payments, refunds, or subscription management.",
            "Shipping": "Ticket is about delivery status, tracking, or physical product issues.",
            "General": "Ticket contains general inquiries, feedback, or miscellaneous requests."
        }
        
        return {
            "category": prediction,
            "confidence": round(confidence * 100, 2),
            "explanation": explanations.get(prediction, "Categorized based on keywords and patterns in the text.")
        }

classifier = TicketClassifier()
