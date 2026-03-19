import sqlite3
db = sqlite3.connect('matrimony.db')
cursor = db.execute("SELECT sql FROM sqlite_master WHERE name='user_activity_logs'")
print(cursor.fetchone()[0])
db.close()
