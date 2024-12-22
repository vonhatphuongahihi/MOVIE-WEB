import json
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
import pickle

# Load dataset intents.json
with open('intents.json', 'r', encoding='utf-8') as file:
    intents = json.load(file)


# Khởi tạo Sentence Transformer model
sentence_model = SentenceTransformer('all-MiniLM-L6-v2')

# Chuẩn bị dữ liệu
X = []
y = []

for intent in intents['intents']:
    for pattern in intent['patterns']:
        embedding = sentence_model.encode(pattern)  # Tạo embedding từ câu
        X.append(embedding)
        y.append(intent['tag'])

# Encode labels thành số
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)

# Tách dữ liệu train và test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Huấn luyện mô hình phân loại (SVM)
classifier = SVC(kernel='linear', probability=True)
classifier.fit(X_train, y_train)

# Lưu mô hình và encoder
with open('chatbot_model.pkl', 'wb') as file:
    pickle.dump(classifier, file)

with open('label_encoder.pkl', 'wb') as file:
    pickle.dump(label_encoder, file)

# Lưu Sentence Transformer model
sentence_model.save("sentence_model")
