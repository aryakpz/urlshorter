
import db from "../database";
import { Request,Response } from "express";


// create the table 
export const getUrl=(req: Request, res: Response) => {
    const createQuery = `
    CREATE TABLE IF NOT EXISTS URLTABLE (
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
}

//  get all the urls in the database
export const getUrls=(req: Request, res: Response) => {
    console.log("display")
    const getQuery = "SELECT * FROM URLTABLE";
    db.all(getQuery, [], (err: { message: any }, rows: any) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching data" });
        }
        res.status(200).json(rows);
    });
}


// post new url into the database
export const postUrl= (req: Request, res: Response) => {
    const { url, length } = req.body;

    if (!url || typeof length !== "number") {
        return res.status(400).json({ message: "Invalid input" });
    }

    const shorturl = generateUrl(length)

    const insertQuery = "INSERT INTO URLTABLE (url,length,shorturl) VALUES (?,?,?)";
    db.run(insertQuery, [url, length, shorturl], function (err: { message: any }) {
        if (err) {
            return res.status(500).json({ message: "Error occurred" });
        }
        res.status(201).json({ message: "Data added successfully" });
    });
}



// generating the short key for each url
function generateUrl(length: number) {
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const short = Math.floor(Math.random() * character.length);
        result += character[short];
    }
    return result;
}
    
//delete the url from  the database
export const deleteUrl=(req:Request, res:Response) => {
    const { shorturl } = req.params;
    console.log(23432,req.params)

    const deleteQuery = "DELETE FROM URLTABLE WHERE shorturl=?";
    db.run(deleteQuery, [shorturl], function (err) {
             
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: "url not found" });
        }

        res.status(200).json({ message: `Short URL '${shorturl}' deleted successfully.` });

    });
}

// update the url
export const editUrl=(req:Request,res:Response)=>{

    const {shorturl}=req.params;
    const {newurl}=req.body
    if(!newurl){
        return res.status(400).json({message:"enter new url"})
    }
    const updateQuery="UPDATE URL_TABLE SET url= ? WHERE shorturl=?"
    db.run(updateQuery,[newurl,shorturl],function(err){
        if(err){
            console.error("error updating database:",err.message);
            return res.status(500).json({message :"internal server error"})
        }
        if(this.changes ==0){
            return res.status(404).json({message:"url is not found"})
        }
        res.status(200).json({message:`url updated successfully `})
    })
}

// short url redirect into the main url 
export const redirectUrl=(req:Request,res:Response)=>{
    const {shorturl}=req.params;
    const findQuery="SELECT url FROM URLTABLE WHERE shorturl = ?";
    db.get(findQuery ,[shorturl],(err,row:{url:string} |undefined)=>{
        if(err){
            console.error("Error querying database:", err.message);
            return res.status(500).json({message:"internal server error"})
        }
        if(!row || !row.url){
            return res.status(404).json({message:" root not found"})
        }
        const originalUrl =row.url;
        res.redirect(originalUrl);
    })
}

