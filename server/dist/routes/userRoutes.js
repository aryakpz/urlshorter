"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const express = require('express');
const router = express.Router();
// create table 
router.get('/create', (req, res) => {
    const createQuery = `
    CREATE TABLE IF NOT EXISTS shorturl (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    length INTEGER NOT NULL,
    shorturl TEXT NOT NULL)
    `;
    database_1.default.run(createQuery, (err) => {
        if (err) {
            console.error('Error creating table: ', err.message);
            return res.status(500).send('Error Creating table');
        }
        res.send('Table created successfully');
    });
});
//display all the data
router.get('/display', (req, res) => {
    const getQuery = "SELECT * FROM shorturl";
    database_1.default.all(getQuery, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching data" });
        }
        res.status(200).json(rows);
    });
});
//post the url
router.post('/add', (req, res) => {
    const { url, length } = req.body;
    if (!url || typeof length !== "number") {
        return res.status(400).json({ message: "Invalid input" });
    }
    const shorturl = generateUrl(length);
    const insertQuery = "INSERT INTO shorturl (url, length,shorturl) VALUES (?, ?,?)";
    database_1.default.run(insertQuery, [url, length, shorturl], function (err) {
        if (err) {
            return res.status(500).json({ message: "Error occurred" });
        }
        res.status(201).json({ message: "Data added successfully" });
    });
});
// generate the shorter url
const generateUrl = (length) => {
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const short = Math.floor(Math.random() * character.length);
        result += character[short];
    }
    return result;
};
exports.default = router;