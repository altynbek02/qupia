import db
import random

quote = db.quotes().lower()

set_quote = set(quote)
list_of_letters = [ i for i in set_quote if i.isalpha()]
hint_indexes = random.sample(range(1, 30), len(list_of_letters))

dicts = {}
for i in range(len(list_of_letters)):
    dicts[list_of_letters[i]] = hint_indexes[i]


letter_count = 0
for i in quote:
    if i.isalpha():
        letter_count += 1

cipher_percent = int(letter_count * round(random.uniform(0.5, 0.7), 1))

indices = random.sample(range(len(quote)), cipher_percent)

result = ""
for i, ch in enumerate(quote):
    if i in indices and ch.isalpha():
        result += "*"
    else:
        result += ch

print(result)

hints = []
for i in quote:
    if i in dicts.keys():
        hints.append(dicts[i])
    else:
        hints.append(i)
    
print(hints)

print(quote)