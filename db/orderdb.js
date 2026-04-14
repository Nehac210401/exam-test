import Database from 'better-sqlite3';

const db = new Database('airbean.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
    id  TEXT PRIMARY KEY,
    user_id TEXT NULL,
    total_amount  INTEGER NOT NULL,
    shipping_address TEXT NOT NULL,
    delivery_time  TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id));
    
    CREATE TABLE IF NOT EXISTS order_items(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id    TEXT NOT NULL,
    menu_id     INTEGER NOT NULL,
    title       TEXT NOT NULL,
    quantity    INTEGER NOT NULL,
    price       INTEGER NOT NULL,
    FOREIGN KEY (order_id)  REFERENCES orders(id),
    FOREIGN KEY (menu_id)   REFERENCES menu_items(id));
    `)
    export default db;
