"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urlController_1 = require("../controllers/urlController");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const url_schema_1 = require("../schemas/url.schema");
const express = require('express');
const router = express.Router();
//get all the urls
router.get('/display', urlController_1.getUrls);
//post the url
router.post('/add', (0, validationMiddleware_1.validationMiddleware)(url_schema_1.urlSchema), urlController_1.postUrl);
//delete the url
router.delete('/delete/:shorturl', urlController_1.deleteUrl);
//update the url
router.put('/edit/:shorturl', (0, validationMiddleware_1.validationMiddleware)(url_schema_1.editSchema), urlController_1.editUrl);
// redirect into the mainurl 
router.get('/:shorturl', urlController_1.redirectUrl);
exports.default = router;
