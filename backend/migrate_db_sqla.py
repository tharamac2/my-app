from sqlalchemy import create_engine, text
from app.core.config import settings

engine = create_engine(settings.DATABASE_URI)

with engine.connect() as conn:
    # Add last_login to users
    try:
        conn.execute(text("ALTER TABLE users ADD COLUMN last_login DATETIME"))
        conn.commit()
        print("Added last_login column.")
    except Exception as e:
        if "Duplicate column" in str(e):
            print("Column last_login already exists.")
        else:
            print(f"Error adding last_login: {e}")

    # Create user_activity_logs if not exists
    try:
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS user_activity_logs (
                id INTEGER AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(255),
                activity_type VARCHAR(50),
                description TEXT,
                device VARCHAR(100),
                ip_address VARCHAR(45),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """))
        conn.commit()
        print("Ensured user_activity_logs table exists.")
    except Exception as e:
        print(f"Error creating user_activity_logs: {e}")

    # Create admins if not exists
    try:
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS admins (
                id INTEGER AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                full_name VARCHAR(255),
                role VARCHAR(50) DEFAULT 'admin',
                is_active BOOLEAN DEFAULT TRUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """))
        conn.commit()
        print("Ensured admins table exists.")
    except Exception as e:
        print(f"Error creating admins: {e}")

print("Migration completed.")
