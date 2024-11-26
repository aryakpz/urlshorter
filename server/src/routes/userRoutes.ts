import { Request, Response } from 'express';
import db from '../database';

const express = require('express');
const router = express.Router();

// create table 
router.get('/create', (req: Request, res: Response) => {
    const createQuery = `
    CREATE TABLE IF NOT EXISTS URL_TABLE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    length INTEGER NOT NULL,   
    shorturl TEXT NOT NULL UNIQUE)
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
    const getQuery = "SELECT * FROM URL_TABLE";
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

    const insertQuery = "INSERT INTO URL_TABLE (url,length,shorturl) VALUES (?,?,?,?)";
    db.run(insertQuery, [url, length, shorturl], function (err: { message: any }) {
        if (err) {
            return res.status(500).json({ message: "Error occurred" });
        }
        res.status(201).json({ message: "Data added successfully" });
    });
});

//delete the rows

// router.delete('/delete', (req: Request, res: Response) => {
//     const deleteQuery = "TRUNCATE TABLE URL_TABLE";
//     db.run(deleteQuery, [], (err: { message: any }) => {
//         if (err) {
//             return res.status(500).json({ message: "Error deleting data.", error: err.message });
//         }
//         res.status(200).json({ message: "Data deleted successfully." });
//     });
// })

//delete the row

// router.delete('/delete/:shorturl', (req:Request, res:Response) => {
//     const { shorturl } = req.params;

//     const deleteQuery = "DELETE FROM URLTABLE WHERE shorturl = ?";
//     db.run(deleteQuery, [shorturl], function (err) {
             
//         if (err) {
//             console.error("Database error:", err.message);
//             return res.status(500).json({ message: "Internal server error" });
//         }

//         if (this.changes === 0) {
//             return res.status(404).json({ message: "Short URL not found" });
//         }

//         res.status(200).json({ message: `Short URL '${shorturl}' deleted successfully.` });

//     });
// });


//update the url

// router.put('/edit/:shorturl',(req:Request,res:Response)=>{
//     console.log("Received PUT request for /api/edit/" + req.params.shorturl);
  
//     const {shorturl}=req.params;
//     const {newurl}=req.body
//     if(!newurl){
//         return res.status(400).json({message:"enter new url"})
//     }
//     const updateQuery="UPDATE URL_TABLE SET url= ? WHERE shorturl=?"
//     db.run(updateQuery,[newurl,shorturl],function(err){
//         if(err){
//             console.error("error updating database:",err.message);
//             return res.status(500).json({message :"internal server error"})
//         }
//         if(this.changes ==0){
//             return res.status(404).json({message:"url is not found"})
//         }
//         res.status(200).json({message:`url updated successfully `})
//     })
// })



// DELETE request to delete a URL based on short URL
router.delete('/delete/:shorturl', (req:Request, res:Response) => {
    const { shorturl } = req.params;
    const deleteQuery = "DELETE FROM URLTABLE WHERE shorturl = ?";
    
    db.run(deleteQuery, [shorturl], function(err) {
        if (err) {
            console.error("Error deleting URL:", err.message);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: "Short URL not found" });
        }

        res.status(200).json({ message: `URL with short URL '${shorturl}' deleted successfully` });
    });
});

// PUT request to update a URL based on short URL
router.put('/edit/:shorturl', (req:Request, res:Response) => {
    const { shorturl } = req.params;
    const { newUrl } = req.body;

    if (!newUrl) {
        return res.status(400).json({ message: "New URL is required" });
    }

    const updateQuery = "UPDATE URLTABLE SET url = ? WHERE shorturl = ?";
    db.run(updateQuery, [newUrl, shorturl], function(err) {
        if (err) {
            console.error("Error updating URL:", err.message);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: "Short URL not found" });
        }

        res.status(200).json({ message: `URL with short URL '${shorturl}' updated successfully` });
    });
});


// search with the shorturl  

router.get('/:shorturl',(req:Request,res:Response)=>{
    const {shorturl}=req.params;
    const findQuery="SELECT url FROM URLTABLE WHERE shorturl = ?";
    db.get(findQuery ,[shorturl],(err,row:{url:string} |undefined)=>{
        if(err){
            console.error("Error querying database:", err.message);
            return res.status(500).json({message:"internal server error"})
        }
        if(!row || !row.url){
            return res.status(404).json({message:"short URL root not found"})
        }
        const originalUrl =row.url;
        res.redirect(originalUrl);
    })
})


function generateUrl(length: number) {
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const short = Math.floor(Math.random() * character.length);
        result += character[short];
    }
    return result;
}
                            
export default router;

 
 