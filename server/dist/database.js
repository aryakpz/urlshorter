"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/database.ts
const sqlite3_1 = require("sqlite3");
// Import the sqlite3 package
// Initialize the SQLite database connection
const db = new sqlite3_1.Database('./database.db', (err) => {
    if (err) {
        console.error("Failed to connect to the database:", err.message);
    }
    else {
        console.log("Connected to the SQLite database.");
    }
});
// Export the db instance so it can be used in other parts of the application
exports.default = db;
          