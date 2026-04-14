import Database from "better-sqlite3";
import user from "./user.js";
import {v4 as uuidv4} from 'uuid';

const db = new Database('airbean.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS users(
    id      TEXT PRIMARY KEY,
    name   TEXT NOT NULL,
    email    TEXT NOT NULL,
    teleph     INTEGER NOT NULL,
    created_at  TEXT DEFAULT (dateTime('now'))
    )`);

    const count = db.prepare('SELECT COUNT(*) as count FROM users').get();

    if (count.count === 0) {
        const insert = db.prepare('INSERT INTO users(id, name, email, teleph) VALUES (?, ?, ?,?)' );
        user.forEach (person => insert.run(uuidv4(), person.name, person.email, person.teleph));
        console.log('User seeed successfully');
    }
export default db;