import pymysql

def ensure_db():
    conn = pymysql.connect(host='localhost', user='root', password='')
    try:
        with conn.cursor() as cursor:
            cursor.execute("CREATE DATABASE IF NOT EXISTS ratan_matrimony")
        conn.commit()
        print("Database 'ratan_matrimony' checked/created.")
    finally:
        conn.close()

if __name__ == "__main__":
    ensure_db()
