import sqlite3
db = sqlite3.connect('matrimony.db')
cursor = db.execute("SELECT sql FROM sqlite_master WHERE name='users'")
print(cursor.fetchone()[0])
db.close()
