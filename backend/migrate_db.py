import pymysql
import re
from app.core.config import settings

# Parse database URL: mysql+pymysql://user:pass@host[:port]/db
db_uri = settings.DATABASE_URI
match = re.match(r"mysql\+pymysql://([^:]+):([^@]+)@([^/]+)/(.+)", db_uri)
if not match:
    # Try alternate without password
    match = re.match(r"mysql\+pymysql://([^@]+)@([^/]+)/(.+)", db_uri)
    if not match:
        raise ValueError(f"Could not parse DATABASE_URI: {db_uri}")
    user, host_port, db_name = match.groups()
    password = ""
else:
    user, password, host_port, db_name = match.groups()

if ":" in host_port:
    host, port = host_port.split(":")
    port = int(port)
else:
    host = host_port
    port = 3306

print(f"Connecting to {host}:{port} as {user}...")

conn = pymysql.connect(
    host=host,
    port=port,
    user=user,
    password=password,
    database=db_name
)

try:
    with conn.cursor() as cursor:
        # Check if last_login exists in users
        cursor.execute("SHOW COLUMNS FROM users LIKE 'last_login'")
        if not cursor.fetchone():
            print("Adding last_login to users table...")
            cursor.execute("ALTER TABLE users ADD COLUMN last_login DATETIME")
        
        # Check and create UserActivityLog table
        cursor.execute("SHOW TABLES LIKE 'user_activity_logs'")
        if not cursor.fetchone():
            print("Creating user_activity_logs table...")
            cursor.execute("""
                CREATE TABLE user_activity_logs (
                    id INTEGER AUTO_INCREMENT PRIMARY KEY,
                    user_id VARCHAR(255),
                    activity_type VARCHAR(50),
                    description TEXT,
                    device VARCHAR(100),
                    ip_address VARCHAR(45),
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )
            """)

        # Check and create Admin table
        cursor.execute("SHOW TABLES LIKE 'admins'")
        if not cursor.fetchone():
            print("Creating admins table...")
            cursor.execute("""
                CREATE TABLE admins (
                    id INTEGER AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    full_name VARCHAR(255),
                    role VARCHAR(50) DEFAULT 'admin',
                    is_active BOOLEAN DEFAULT TRUE,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)
        
    conn.commit()
    print("Migration completed successfully.")
except Exception as e:
    print(f"Error: {e}")
finally:
    conn.close()
