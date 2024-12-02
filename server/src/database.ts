// src/database.ts
import { Database } from 'sqlite3'; 

const db = new Database('./database.db', (err) => {
    if (err) {
        console.error("Failed to connect to the database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

export default db;
