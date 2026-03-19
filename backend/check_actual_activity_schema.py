import sqlite3
db = sqlite3.connect('matrimony.db')
cursor = db.execute("SELECT sql FROM sqlite_master WHERE name='activity_logs'")
res = cursor.fetchone()
if res:
    print(res[0])
else:
    print("Table activity_logs not found")
db.close()
