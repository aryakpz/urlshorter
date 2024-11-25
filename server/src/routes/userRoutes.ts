import { Request, Response } from 'express';
import db from '../database';

const express = require('express');
const router = express.Router();

// create table 
router.get('/create', (req: Request, res: Response) => {
    const createQuery = `
    CREATE TABLE IF NOT EXISTS shorturl (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    length INTEGER NOT NULL,
    shorturl TEXT NOT NULL)
    `;
    db.run(createQuery, (err: { message: any }) => {
        if (err) {
            console.error('Error creating table: ', err.message);
            return res.status(500).send('Error Creating table');
        }
        res.send('Table created successfully');
    });
});

//display all the data
router.get('/display', (req: Request, res: Response) => {
    const getQuery = "SELECT * FROM shorturl";
    db.all(getQuery, [], (err: { message: any }, rows: any) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching data" });
        }
        res.status(200).json(rows);
    });
});

//post the url
router.post('/add', (req: Request, res: Response) => {
    const { url, length } = req.body;

    if (!url || typeof length !== "number") {
        return res.status(400).json({ message: "Invalid input" });
    }
     
    const shorturl = generateUrl(length)

    const insertQuery = "INSERT INTO shorturl (url, length,shorturl) VALUES (?, ?,?)";
    db.run(insertQuery, [url, length, shorturl], function (err: { message: any }) {
        if (err) {
            return res.status(500).json({ message: "Error occurred" });
        }
        res.status(201).json({ message: "Data added successfully" });
    });
});

//delete the rows

router.delete('/dele', (req: Request, res: Response) => {
    const deleteQuery = "TRUN FROM shorturl";
    db.run(deleteQuery, [], (err: { message: any }) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting data.", error: err.message });
        }
        res.status(200).json({ message: "Data deleted successfully." });
    });
})


const generateUrl = (length: number) => {
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const short = Math.floor(Math.random() * character.length)
        result += character[short]
    }
    return result;
}

export default router;
  