import sqlite3
db = sqlite3.connect('matrimony.db')
cursor = db.execute('SELECT email FROM users')
print(cursor.fetchall())
db.close()
