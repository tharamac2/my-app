import sqlite3
db = sqlite3.connect('matrimony.db')
tables = [row[0] for row in db.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
for t in tables:
    print(f"Table: {t}")
    cursor = db.execute(f"SELECT sql FROM sqlite_master WHERE name='{t}'")
    print(cursor.fetchone()[0])
    print("-" * 20)
db.close()
