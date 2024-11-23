
// src/database.ts
import { Database } from 'sqlite3'; 
// Import the sqlite3 package

// Initialize the SQLite database connection
const db = new Database('./database.db', (err) => {
    if (err) {
        console.error("Failed to connect to the database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

export default db;
