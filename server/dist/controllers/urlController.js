"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectUrl = exports.editUrl = exports.deleteUrl = exports.postUrl = exports.getUrls = void 0;
const database_1 = __importDefault(require("../database"));
const url_services_1 = require("../services/url.services");
// get all urls
const getUrls = async (req, res, next) => {
    try {
        const urls = await (0, url_services_1.getUrlsFromDb)();
        if (urls.length === 0) {
            return res.status(404).json({
                data: [],
            });
        }
        return res.status(200).json({
            data: urls,
        });
    }
    catch (error) {
        next(error);
    }
    console.log(database_1.default);
};
exports.getUrls = getUrls;
//post a new url
const postUrl = async (req, res, next) => {
    try {
        const { url, length } = req.body;
        const shorturl = (0, url_services_1.generateShortUrl)(length);
        await (0, url_services_1.addUrlToDb)(url, length, shorturl);
        res.status(201).json({
            message: "Data added successfully",
            success: true,
            data: { url, shorturl },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.postUrl = postUrl;
//delete a  url
const deleteUrl = async (req, res, next) => {
    console.log(890);
    try {
        const { shorturl } = req.params;
        const response = await (0, url_services_1.deleteFromDb)(shorturl);
        res.status(200).json({
            message: "Data deleted successfully",
            success: true,
            data: { shorturl }
        });
        console.log(789, response);
    }
    catch (error) {
        console.log(7890098765, error);
        next(error);
    }
};
exports.deleteUrl = deleteUrl;
// edit a url
const editUrl = async (req, res, next) => {
    try {
        const { shorturl } = req.params;
        const { url } = req.body;
        console.log("new", url);
        const updated = await (0, url_services_1.updateFromDb)(url, shorturl);
        res.status(200).json({
            message: "url updated successfully",
            success: true,
            data: updated
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editUrl = editUrl;
const redirectUrl = async (req, res, next) => {
    try {
        const { shorturl } = req.params;
        const original = await (0, url_services_1.findUrlFromDb)(shorturl);
        res.redirect(original);
    }
    catch (error) {
        next(error);
    }
};
exports.redirectUrl = redirectUrl;
// export const getUrls = async (req: Request, res: Response,next:NextFunction) => {
// try {
//     db.all('SELECT * FROM URLTABLE', [], (err, rows) => {
//         if (err) {
//             res.status(constants.SERVER_ERROR);
//             throw new Error("Server error")
//         }
//         res.status(200).json(rows);
//     });
// } catch (error) {
//     next(error)
// }};
// post new url 
// export const postUrl = asyncHandler(async (req: any, res: any, next: NextFunction) => {
//     try {
//         const { url, length } = req.body;
//         if (!url || typeof length !== 'number') {
//             res.status(constants.VALIDATION_ERROR)
//             throw new Error("invalid input")
//         }
//         const shorturl = generateUrl(length)
//         const insertQuery = 'INSERT INTO URLTABLE (url,length,shorturl) VALUES (?,?,?)';
//         db.run(insertQuery, [url, length, shorturl], function (err) {
//             if (err) {
//                 console.log(err.message)
//                 res.status(constants.SERVER_ERROR)
//                 throw new Error('Error occurred during database insertion');
//             }
//             res.status(201).json({ message: "Data added successfully" })
//         })
//     } catch (error) {
//         next(error)
//     }
// })
// generating the short key for each url
// const generateUrl = (length: number) => {
//     const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//         const short = Math.floor(Math.random() * character.length);
//         result += character[short];
//     }
//     return result;
// }
//delete the url from  the database
// export const deleteUrl = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { shorturl } = req.params;
//         console.log(23432, req.params)
//         const deleteQuery = "DELETE FROM URLTABLE WHERE shorturl=?";
//         db.run(deleteQuery, [shorturl], function (err) {
//             if (err) {
//                 console.error("Database error:", err.message);
//                 res.status(constants.SERVER_ERROR);
//                 throw new Error("Error during deletion")
//             }
//             res.status(200).json({ message: `Short URL '${shorturl}' deleted successfully.` });
//         });
//     } catch (error) {
//         next(error);
//     }
// })
// update the url
// export const editUrl = asyncHandler(async (req: any, res: any, next: NextFunction) => {
//     try {
//         const { shorturl } = req.params;
//         const { newurl } = req.body
//         if (!newurl) {
//             res.status(constants.VALIDATION_ERROR);
//             throw new Error("Please enter a new url")
//         }
//         const updateQuery = "UPDATE URL_TABLE SET url= ? WHERE shorturl=?"
//         db.run(updateQuery, [newurl, shorturl], function (err) {
//             if (err) {
//                 console.error("error updating database:", err.message);
//                 res.status(constants.SERVER_ERROR)
//                 throw new Error("Internal server error")
//             }
//             res.status(200).json({ message: `url updated successfully ` })
//         })
//     } catch (error) {
//         next(error)
//     }
// })
// short url redirect into the main url 
// export const redirectUrl = asyncHandler(async (req: any, res: any, next: NextFunction) => {
//     try {
//         const { shorturl } = req.params;
//         const findQuery = "SELECT url FROM URLTABLE WHERE shorturl = ?";
//         db.get(findQuery, [shorturl], (err, row: { url: string } | undefined) => {
//             if (err) {
//                 console.error("Error querying database:", err.message);
//                 res.status(constants.VALIDATION_ERROR)
//                 throw new Error("internal server error")
//             }
//             if (!row || !row.url) {
//                 res.status(constants.NOT_FOUND)
//                 throw new Error("url not found")
//             }
//             const originalUrl = row.url;
//             res.redirect(originalUrl);
//         })
//     } catch (error) {
//         next(error)
//     }
// })
// create the table 
// export const createTable =async (req: any, res: any, next: NextFunction) => {
//     try {
//         const createQuery = `
//     CREATE TABLE IF NOT EXISTS URLTABLE (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     url TEXT NOT NULL,
//     length INTEGER NOT NULL,   
//     shorturl TEXT NOT NULL UNIQUE)
//     `;
//         db.run(createQuery, (err: { message: any }) => {
//             if (err) {
//                 console.error('Error creating table: ', err.message);
//                 res.status(constants.SERVER_ERROR);
//                 throw new Error("Error occured on creating a table")
//             }
//             res.send('Table created successfully');
//         });
//     } catch (error) {
//         next(error)
//     }
// }
