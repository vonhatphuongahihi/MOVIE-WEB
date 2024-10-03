import json

with open('intents.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

patterns = []
for intent in data['intents']:
    patterns.extend(intent['patterns'])

print(patterns)

with open('data.txt', 'w', encoding='utf-8') as file:
    for pattern in patterns:
        file.write(pattern + '\n')



