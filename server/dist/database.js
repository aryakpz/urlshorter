"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/database.ts
const sqlite3_1 = require("sqlite3");
const db = new sqlite3_1.Database('./database.db', (err) => {
    if (err) {
        console.error("Failed to connect to the database:", err.message);
    }
    else {
        console.log("Connected to the SQLite database.");
    }
});
exports.default = db;
