import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'pets.db')

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# Initialize the database
def init_db():
    with get_connection() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS pets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                age INTEGER NOT NULL,
                owner TEXT NOT NULL,
                UNIQUE(name, type, owner)
            )
        ''')
init_db()

def get_all_pets():
    with get_connection() as conn:
        cur = conn.execute('SELECT * FROM pets')
        return [dict(row) for row in cur.fetchall()]

def get_pet_by_id(pet_id):
    with get_connection() as conn:
        cur = conn.execute('SELECT * FROM pets WHERE id = ?', (pet_id,))
        row = cur.fetchone()
        return dict(row) if row else None

def get_pets_by_name(name):
    with get_connection() as conn:
        cur = conn.execute('SELECT * FROM pets WHERE name LIKE ?', (f'%{name}%',))
        return [dict(row) for row in cur.fetchall()]

def get_pets_by_type(type_):
    with get_connection() as conn:
        cur = conn.execute('SELECT * FROM pets WHERE type = ?', (type_,))
        return [dict(row) for row in cur.fetchall()]

def get_pets_by_age_range(min_age, max_age):
    with get_connection() as conn:
        cur = conn.execute('SELECT * FROM pets WHERE age BETWEEN ? AND ?', (min_age, max_age))
        return [dict(row) for row in cur.fetchall()]

def get_pets_by_owner(owner):
    with get_connection() as conn:
        cur = conn.execute('SELECT * FROM pets WHERE owner = ?', (owner,))
        return [dict(row) for row in cur.fetchall()]

def create_pet(name, type_, age, owner):
    with get_connection() as conn:
        try:
            cur = conn.execute(
                'INSERT INTO pets (name, type, age, owner) VALUES (?, ?, ?, ?)',
                (name, type_, age, owner)
            )
            conn.commit()
            return {'id': cur.lastrowid}
        except sqlite3.IntegrityError:
            return None

def update_pet(pet_id, name, type_, age, owner):
    with get_connection() as conn:
        cur = conn.execute(
            'UPDATE pets SET name = ?, type = ?, age = ?, owner = ? WHERE id = ?',
            (name, type_, age, owner, pet_id)
        )
        conn.commit()
        return {'changes': cur.rowcount}

def delete_pet(pet_id):
    with get_connection() as conn:
        cur = conn.execute('DELETE FROM pets WHERE id = ?', (pet_id,))
        conn.commit()
        return {'changes': cur.rowcount}

def clear_all_pets():
    with get_connection() as conn:
        cur = conn.execute('DELETE FROM pets')
        conn.commit()
        return {'changes': cur.rowcount}

def reset_pets_table():
    with get_connection() as conn:
        conn.execute('DELETE FROM pets')
        conn.execute('DELETE FROM sqlite_sequence WHERE name="pets"')
        conn.commit()

# Exported functions for import *
__all__ = [
    'get_all_pets',
    'get_pet_by_id',
    'get_pets_by_name',
    'get_pets_by_type',
    'get_pets_by_age_range',
    'get_pets_by_owner',
    'create_pet',
    'update_pet',
    'delete_pet',
    'clear_all_pets',
    'reset_pets_table'
]
