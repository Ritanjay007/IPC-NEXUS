from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import pandas as pd
from sentence_transformers import SentenceTransformer, util

print("Starting Flask application...")

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# MongoDB Atlas connection string
MONGODB_URI = "mongodb+srv://ipc_nexus:ipc_nexus123@ipc-nexus.fu0mt.mongodb.net/?retryWrites=true&w=majority&appName=ipc-nexus"

print("Connecting to MongoDB Atlas...")
try:
    client = MongoClient(MONGODB_URI)
    db = client.ipc_nexus  # This will create/use the ipc_nexus database
    print("Successfully connected to MongoDB Atlas!")
except Exception as e:
    print(f"Error connecting to MongoDB: {str(e)}")
    raise e

print("Loading dataset...")
# Load dataset
df = pd.read_csv("ipc_sections_updated.csv")

print("Initializing Sentence-BERT model...")
# Train Sentence-BERT model
model = SentenceTransformer("paraphrase-MiniLM-L6-v2")
embeddings = model.encode(df["Description"].tolist(), convert_to_tensor=True)

def get_relevant_sections(query, df, model, embeddings, top_n=5):
    """Finds the top-N most relevant sections based on a search query."""
    if not query.strip():
        return df.head(top_n)[["Section", "Offense", "Punishment"]].to_dict(orient="records")
    
    query_embedding = model.encode(query, convert_to_tensor=True)
    similarity_scores = util.pytorch_cos_sim(query_embedding, embeddings).squeeze()
    
    top_indices = similarity_scores.argsort(descending=True)[:top_n]
    results = df.iloc[top_indices][["Section", "Offense", "Punishment"]].copy()
    results = results[~results["Offense"].str.startswith("IPC Section")]

    return results.to_dict(orient="records")

@app.route("/search", methods=["POST"])
def search_sections():
    data = request.json
    query = data.get("query", "")
    
    results = get_relevant_sections(query, df, model, embeddings)
    return jsonify(results)

@app.route('/api/complaints', methods=['POST'])
def register_complaint():
    try:
        data = request.json
        complaint_data = {
            'name': data['name'],
            'email': data['email'],
            'phone': data['phone'],
            'incident_date': datetime.strptime(data['incidentDate'], '%Y-%m-%d'),
            'location': data['location'],
            'description': data['description'],
            'timestamp': datetime.now(),
            'status': 'Pending'
        }
        
        result = db.complaints.insert_one(complaint_data)
        
        if result.inserted_id:
            return jsonify({'message': 'Complaint registered successfully'}), 201
        else:
            return jsonify({'error': 'Failed to register complaint'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/complaints', methods=['GET'])
def get_complaints():
    try:
        complaints = list(db.complaints.find({}, {'_id': 0}).sort('timestamp', -1))
        return jsonify(complaints)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Backend is running!'}), 200

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(debug=True, port=5000)
