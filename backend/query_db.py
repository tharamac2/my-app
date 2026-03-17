import sqlite3
conn = sqlite3.connect('matrimony.db')
cursor = conn.cursor()
cursor.execute('SELECT id, email, full_name FROM users WHERE full_name=\'Sans edits\'')
row = cursor.fetchone()
if row:
    uid = row[0]
    print(f'User: {row}')
    print('Profile:', cursor.execute('SELECT * FROM user_profiles WHERE user_id=?', (uid,)).fetchone())
    print('Details:', cursor.execute('SELECT * FROM user_details WHERE user_id=?', (uid,)).fetchone())
    print('Family:', cursor.execute('SELECT * FROM family_details WHERE user_id=?', (uid,)).fetchone())
    print('Location:', cursor.execute('SELECT * FROM location_details WHERE user_id=?', (uid,)).fetchone())
else:
    print('Not found')
