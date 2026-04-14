import Database from "better-sqlite3";
import menu from "./menu.js";

const db = new Database('airbean.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS menu_items(
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    title   TEXT NOT NULL,
    desp    TEXT NOT NULL,
    price   INTEGER NOT NULL,
    created_at  TEXT DEFAULT (dateTime('now'))
    )`);

    const count = db.prepare('SELECT COUNT(*) as count FROM menu_items').get();

    if (count.count === 0) {
        const insert = db.prepare('INSERT INTO menu_items(title, desp, price) VALUES (?, ?,?)' );
        menu.forEach(item => insert.run(item.title, item.desp, item.price));
        console.log('Menu seeed successfully');
    }
export default db;
