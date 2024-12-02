import {deleteUrl, editUrl, getUrls, redirectUrl, postUrl} from '../controllers/urlController';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { editSchema, urlSchema } from '../schemas/url.schema';

const express = require('express');
const router = express.Router();

//get all the urls
router.get('/display',getUrls);

//post the url
router.post('/add',validationMiddleware(urlSchema),postUrl);

//delete the url
router.delete('/delete/:shorturl', deleteUrl);

//update the url
router.put('/edit/:shorturl',validationMiddleware(editSchema),editUrl)

// redirect into the mainurl 
router.get('/:shorturl',redirectUrl)

export default router;