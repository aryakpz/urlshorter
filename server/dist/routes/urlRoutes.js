"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urlController_1 = require("../controllers/urlController");
const express = require('express');
const router = express.Router();
//get all the urls
router.get('/display', urlController_1.getUrls);
//post the url
router.post('/add', urlController_1.postUrl);
//delete the url
router.delete('/delete/:shorturl', urlController_1.deleteUrl);
//update the url
router.put('/edit/:shorturl', urlController_1.editUrl);
// redirect into the mainurl 
router.get('/:shorturl', urlController_1.redirectUrl);
exports.default = router;
