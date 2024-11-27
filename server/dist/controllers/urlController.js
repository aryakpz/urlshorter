"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable = exports.redirectUrl = exports.editUrl = exports.deleteUrl = exports.postUrl = exports.getUrls = void 0;
const constants_1 = require("../constants");
const database_1 = __importDefault(require("../database"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// get all urls
exports.getUrls = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        database_1.default.all('SELECT * FROM URLTABLE', [], (err, rows) => {
            if (err) {
                res.status(constants_1.constants.SERVER_ERROR);
                throw new Error("Server error");
            }
            res.status(200).json(rows);
        });
    }
    catch (error) {
        next(error);
    }
}));
// post new url 
exports.postUrl = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, length } = req.body;
        if (!url || typeof length !== 'number') {
            res.status(constants_1.constants.VALIDATION_ERROR);
            throw new Error("invalid input");
        }
        const shorturl = generateUrl(length);
        const insertQuery = 'INSERT INTO URLTABLE (url,length,shorturl) VALUES (?,?,?)';
        database_1.default.run(insertQuery, [url, length, shorturl], function (err) {
            if (err) {
                console.log(err.message);
                res.status(constants_1.constants.SERVER_ERROR);
                throw new Error('Error occurred during database insertion');
            }
            res.status(201).json({ message: "Data added successfully" });
        });
    }
    catch (error) {
        next(error);
    }
}));
// generating the short key for each url
const generateUrl = (length) => {
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const short = Math.floor(Math.random() * character.length);
        result += character[short];
    }
    return result;
};
//delete the url from  the database
exports.deleteUrl = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shorturl } = req.params;
        console.log(23432, req.params);
        const deleteQuery = "DELETE FROM URLTABLE WHERE shorturl=?";
        database_1.default.run(deleteQuery, [shorturl], function (err) {
            if (err) {
                console.error("Database error:", err.message);
                res.status(constants_1.constants.SERVER_ERROR);
                throw new Error("Error during deletion");
            }
            res.status(200).json({ message: `Short URL '${shorturl}' deleted successfully.` });
        });
    }
    catch (error) {
        next(error);
    }
}));
// update the url
exports.editUrl = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shorturl } = req.params;
        const { newurl } = req.body;
        if (!newurl) {
            res.status(constants_1.constants.VALIDATION_ERROR);
            throw new Error("Please enter a new url");
        }
        const updateQuery = "UPDATE URL_TABLE SET url= ? WHERE shorturl=?";
        database_1.default.run(updateQuery, [newurl, shorturl], function (err) {
            if (err) {
                console.error("error updating database:", err.message);
                res.status(constants_1.constants.SERVER_ERROR);
                throw new Error("Internal server error");
            }
            res.status(200).json({ message: `url updated successfully ` });
        });
    }
    catch (error) {
        next(error);
    }
}));
// short url redirect into the main url 
exports.redirectUrl = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shorturl } = req.params;
        const findQuery = "SELECT url FROM URLTABLE WHERE shorturl = ?";
        database_1.default.get(findQuery, [shorturl], (err, row) => {
            if (err) {
                console.error("Error querying database:", err.message);
                res.status(constants_1.constants.VALIDATION_ERROR);
                throw new Error("internal server error");
            }
            if (!row || !row.url) {
                res.status(constants_1.constants.NOT_FOUND);
                throw new Error("url not found");
            }
            const originalUrl = row.url;
            res.redirect(originalUrl);
        });
    }
    catch (error) {
        next(error);
    }
}));
// create the table 
exports.createTable = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
                res.status(constants_1.constants.SERVER_ERROR);
                throw new Error("Error occured on creating a table");
            }
            res.send('Table created successfully');
        });
    }
    catch (error) {
        next(error);
    }
}));
