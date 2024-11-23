"use strict";
// import express from 'express';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// app.use(express.json()); 
// app.get("/api",(req,res)=>{
//     res.json({"users" : ["one","two","three"]})
// })
// // Start the server
// app.listen(5000, () => {
//     console.log('The application is listening on port 5000!');
// });
// const express = require("express");
// const cors = require("cors");
// const db =require("./database")
// const app = express();
// const PORT = 5000;
// // Middleware
// app.use(cors());
// app.use(express.json()); // Parse JSON requests
// // Fetch Data Endpoint
// app.get("/api", (req, res) => {
//     const query = "SELECT * FROM data";
//     db.all(query, [], (err, rows) => {
//         if (err) {
//             res.status(500).json({ message: "Error fetching data", error: err });
//         } else {
//             res.status(200).json(rows);
//         }
//     });
// });
// // Add Data Endpoint
// app.post("/api/add", (req, res) => {
//     const { url, length } = req.body;
//     if (!url || typeof length !== "number") {
//         return res.status(400).json({ message: "Invalid data format" });
//     }
//     const query = "INSERT INTO data (url, length) VALUES (?, ?)";
//     db.run(query, [url, length], function (err) {
//         if (err) {
//             res.status(500).json({ message: "Error adding data", error: err });
//         } else {
//             res.status(201).json({ message: "Data added successfully", id: this.lastID });
//         }
//     });
// });
// // Start the Server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
// import  express  from "express";
// const app=express()
// app.use(express.json())
// app.use('/api',require("./routes/userRoutes"))
// const PORT = process.env.PORT || 5001;  // Change the port number
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
// app.listen(5000,()=>{
//     console.log("The Appliaction is listerning on the port number 5000")
// })
// src/index.ts
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', userRoutes_1.default);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
