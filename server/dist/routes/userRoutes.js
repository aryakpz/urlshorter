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
    CREATE TABLE IF NOT EXISTS URLTABLE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    length INTEGER NOT NULL,   
    shorturl TEXT NOT NULL UNIQUE)
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
    console.log("display");
    const getQuery = "SELECT * FROM URLTABLE";
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
    const insertQuery = "INSERT INTO URLTABLE (url,length,shorturl) VALUES (?,?,?)";
    database_1.default.run(insertQuery, [url, length, shorturl], function (err) {
        if (err) {
            return res.status(500).json({ message: "Error occurred" });
        }
        res.status(201).json({ message: "Data added successfully" });
    });
});
//delete the rows
// router.delete('/delete', (req: Request, res: Response) => {
//     const deleteQuery = "TRUNCATE TABLE URLTABLE";
//     db.run(deleteQuery, [], (err: { message: any }) => {
//         if (err) {
//             return res.status(500).json({ message: "Error deleting data.", error: err.message });
//         }
//         res.status(200).json({ message: "Data deleted successfully." });
//     });
// })
//delete the row
router.delete('/delete/:shorturl', (req, res) => {
    const { shorturl } = req.params;
    console.log(23432, req.params);
    const deleteQuery = "DELETE FROM URLTABLE WHERE shorturl=?";
    database_1.default.run(deleteQuery, [shorturl], function (err) {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "url not found" });
        }
        res.status(200).json({ message: `Short URL '${shorturl}' deleted successfully.` });
    });
});
//update the url
router.put('/edit/:shorturl', (req, res) => {
    const { shorturl } = req.params;
    const { newurl } = req.body;
    if (!newurl) {
        return res.status(400).json({ message: "enter new url" });
    }
    const updateQuery = "UPDATE URL_TABLE SET url= ? WHERE shorturl=?";
    database_1.default.run(updateQuery, [newurl, shorturl], function (err) {
        if (err) {
            console.error("error updating database:", err.message);
            return res.status(500).json({ message: "internal server error" });
        }
        if (this.changes == 0) {
            return res.status(404).json({ message: "url is not found" });
        }
        res.status(200).json({ message: `url updated successfully ` });
    });
});
// redirect into the mainurl 
router.get('/:shorturl', (req, res) => {
    const { shorturl } = req.params;
    const findQuery = "SELECT url FROM URLTABLE WHERE shorturl = ?";
    database_1.default.get(findQuery, [shorturl], (err, row) => {
        if (err) {
            console.error("Error querying database:", err.message);
            return res.status(500).json({ message: "internal server error" });
        }
        if (!row || !row.url) {
            return res.status(404).json({ message: " root not found" });
        }
        const originalUrl = row.url;
        res.redirect(originalUrl);
    });
});
function generateUrl(length) {
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const short = Math.floor(Math.random() * character.length);
        result += character[short];
    }
    return result;
}
exports.default = router;
