import pickle
from sentence_transformers import SentenceTransformer

# Load mô hình và encoder
with open('chatbot_model.pkl', 'rb') as file:
    classifier = pickle.load(file)

with open('label_encoder.pkl', 'rb') as file:
    label_encoder = pickle.load(file)

sentence_model = SentenceTransformer('all-MiniLM-L6-v2')

# Load intents.json
import json
with open('intents.json', 'r', encoding='utf-8') as file:
    intents = json.load(file)

# Hàm trả lời
def get_response(message):
    embedding = sentence_model.encode(message)  
    pred = classifier.predict([embedding])[0]  
    intent_tag = label_encoder.inverse_transform([pred])[0]  

    # Tìm câu trả lời trong intents
    for intent in intents['intents']:
        if intent['tag'] == intent_tag:
            return intent['responses'][0]

    return "Xin lỗi, tôi không hiểu câu hỏi của bạn."
