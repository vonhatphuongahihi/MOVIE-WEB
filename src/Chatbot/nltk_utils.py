import numpy as np
from underthesea import word_tokenize

def tokenize(sentence):
    """
    Phân tách câu thành mảng các từ/tokens
    """
    return word_tokenize(sentence, format="text").split()

def stem(word):
    """
    Stemming: tìm dạng gốc của từ
    """
    # Sử dụng underthesea để stemming
    return word  # Chỉ đơn giản trả về từ, không cần stemming nếu không có phương pháp khác

def bag_of_words(tokenized_sentence, words):
    """
    Trả về mảng bag of words:
    1 cho mỗi từ đã biết có trong câu, 0 nếu không có
    """
    # Khởi tạo bag với 0 cho mỗi từ
    bag = np.zeros(len(words), dtype=np.float32)
    for idx, w in enumerate(words):
        if w in tokenized_sentence: 
            bag[idx] = 1

    return bag
